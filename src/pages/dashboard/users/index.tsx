import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { LoaderCircle, RefreshCw } from "lucide-react";

import DashboardLayout from "@/layouts/dashboard";

import { UserModel } from "@/models/user/types";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table"; 
import { UserTableActionsCell } from "@/components/users/table-cell";
import { UserForm } from "@/components/users/form";
import { 
    Dialog, DialogClose, DialogContent, 
    DialogFooter, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { 
    AlertDialog, AlertDialogTitle, AlertDialogAction, 
    AlertDialogCancel, AlertDialogContent, AlertDialogDescription, 
    AlertDialogFooter, AlertDialogHeader 
} from "@/components/ui/alert-dialog";
import { UserFilter } from "@/components/users/filter";
import { getStaticPropsWithIntl } from "@/lib/getStaticPropsWithIntl";
import { useTranslations } from "next-intl";
import Head from "next/head";


export const getStaticProps = getStaticPropsWithIntl();

const UsersPage = () => {
    const t = useTranslations();

    const [data, setData] = useState<ColumnDef<UserModel>[]>([]);
    const [userSelected, setUserSelected] = useState<UserModel | null>(null);
    const [openUserFormDialog, setOpenUserFormDialog] = useState(false);
    const [userFormLoading, setUserFormLoading] = useState(false);

    const [filterValues, setFilterValues] = useState<any>({
        email: null,
        name: null,
        role: null
    });
    const [loadingUserDelete, setLoadingUserDelete] = useState(false);
    const [openUserDeleteDialog, setOpenUserDeleteDialog] = useState(false);

    const { toast } = useToast();
    const [loading, setLoading] = useState(true);

    const fetchUsers = async (params: any = null) => {
        try {
            const filteredParams = Object.fromEntries(
                Object.entries(params || {}).filter(([_, value]) => value != null && value !== "")
            ) as any;    
            const queryString = new URLSearchParams(filteredParams || {}).toString();
            const url = `/api/users${queryString ? `?${queryString}` : ""}`;
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(t("Dashboard.User.message_error_fetch"));
            }
            const responseData = await res.json() as UserModel[] || [];
            
            setFilterValues(params);
            setData(responseData.map(item => item as ColumnDef<UserModel>));
        } catch (err: any) {
            toast({
                title: t("common.toast_title_error"),
                description: err.message,
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    }
    const getColumns = () => {
        return [
            { 
                header: t("common.name_label"), 
                accessorKey: "name" 
            },
            { 
                header: t("common.email_label"), 
                accessorKey: "email" 
            },
            { 
                header: t("common.role_label"), 
                accessorKey: "role" 
            },
            { 
                id: "actions",
                cell: (props: any) => <UserTableActionsCell 
                    {...props}
                    onActionClick={handleActionOnClick.bind(this)}
                />,
            }
        ];
    }

    const handleCreateClick = () => {
        setOpenUserFormDialog(true);
        setUserSelected(null);
    }
    const handleActionOnClick = (action: string, userData: UserModel) => {
        const actionsMap: any = {
            delete: handleDeleteActionClick
        };

        const actionFn = actionsMap[action];
        if (!actionFn) return;

        actionFn(userData);
    }

    const handleDeleteActionClick = (userData: UserModel) => {
        setUserSelected(userData);
        handleDeleteActionDialogChangeOpen(true);
    };
    const handleDeleteActionDialogChangeOpen = (open: boolean) => {
        setOpenUserDeleteDialog(open);
    }
    const handleDeleteActionDialogConfirmClick = async () => {
        if (!userSelected) return;

        setLoadingUserDelete(true);

        try {
            const response = await fetch(`/api/users/${userSelected?.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw errorData.error || t("Dashboard.User.message_error_delete");
            }


            toast({
                title: t('common.toast_title_success'),
                description: t('Dashboard.User.message_success_delete'),
                className: "bg-green-500 border-green-700",
                duration: 1500
            });

            setUserSelected(null);
            handleDeleteActionDialogChangeOpen(false);
            fetchUsers();
        } catch (error: any) {
            console.error("Error deleting user:", error);
            toast({
                title: t('common.toast_title_error'),
                description: error,
                className: "bg-red-500 border-red-700",
                variant: 'destructive',
                duration: 2000
            });
        }

        setLoadingUserDelete(false);
    }
    
    const handleRowClick = (row: any) => {
        setOpenUserFormDialog(true);
        setUserSelected(row.original as UserModel);
    }
    const handleUserFormDilaogOpenChange = (open: boolean) => {
        setOpenUserFormDialog(open);

        if (!open) {
            setUserSelected(null);
        }
    }
    const handleFormSubmit = async (values: any)=> {
        try {
            setUserFormLoading(true);
            const url = `/api/users/${values.id}`;

            const response = await fetch(url, {
                method: values?.id === 'create' ? 'POST' : 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Dashboard.User.message_error_save');
            }
            let users = [...data];
            const userValues = await response.json() as UserModel;

            if (values.id === 'create') {
                users.push(userValues as ColumnDef<UserModel>);
            } else {
                users = users.map(item => {
                    if(item.id === userValues.id) {
                        return userValues as ColumnDef<UserModel>;
                    }

                    return item;
                });
            }

            setData(users);
            toast({
                title: t("common.toast_title_success"),
                description: t("Dasboard.User.message_success_save"),
                className: "bg-green-500 border-green-700",
                duration: 1500
            });

            handleUserFormDilaogOpenChange(false);
        } catch (error: any) {
            toast({
                title: t('common.toast_title_error'),
                description: t(error.message),
                className: "bg-red-500 border-red-700",
                variant: 'destructive'
            });
        }

        setUserFormLoading(false);
    }

    useEffect(() => {
        fetchUsers();
    }, []);


    return (
        <DashboardLayout>
            <Head>
                <title>{t('Dashboard.User.title')}</title>
            </Head>
            
            <div>
                <div className="flex justify-between items-center">
                    <h2 className="text-5xl font-medium">{t('Dashboard.User.title')}</h2>

                    <Button type="button" onClick={handleCreateClick}>
                        {t('Dashboard.User.button_label_create')}
                    </Button>
                </div>

                {loading && (
                    <p>{t('common.loading')}</p>
                )}

                {!loading && (
                    <div className="mt-4">
                        <div className="flex justify-end my-4">
                            <Button 
                                type="button" 
                                onClick={fetchUsers.bind(this, filterValues)} 
                                size="sm" 
                                variant="outline"
                                className="mr-2"
                            >
                                <RefreshCw />

                                {t('common.refresh')}
                            </Button>

                            <UserFilter 
                                onFilterSubmit={fetchUsers}
                                filterProps={{
                                    initialValues: filterValues
                                }}
                            />
                        </div>

                        <DataTable 
                            data={data} 
                            columns={getColumns()} 
                            onRowClick={handleRowClick}
                        />
                    </div>
                )}


                <div>
                    <Dialog 
                        open={openUserFormDialog} 
                        onOpenChange={handleUserFormDilaogOpenChange}
                    >
                        <DialogContent className="bg-white">
                            <DialogHeader className="text-left">
                                <DialogTitle>
                                    {t(userSelected ? 'Dashboard.User.dialog_edit_title' : 'Dashboard.User.dialog_create_title')}
                                </DialogTitle>
                            </DialogHeader>

                            <UserForm 
                                user={userSelected} 
                                className="py-4"
                                onSubmit={handleFormSubmit.bind(this)} 
                            />

                            <DialogFooter className="pt-2">
                                <DialogClose asChild>
                                    <Button variant="outline">{t('common.cancel_label')}</Button>
                                </DialogClose>

                                <Button 
                                    type="submit" 
                                    form="user__form"
                                    disabled={userFormLoading}
                                >
                                    {userFormLoading && (
                                        <LoaderCircle className="mr-2"/>
                                    )}

                                    {t(
                                        userSelected
                                            ? userFormLoading ? 'common.saving_label' : 'common.dialog_save_button_label'
                                            : userFormLoading ? 'common.creating_label': "Dashboard.User.dialog_create_title"
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    
                    <AlertDialog 
                        open={openUserDeleteDialog} 
                        onOpenChange={handleDeleteActionDialogChangeOpen}
                    >
                        <AlertDialogContent className="bg-white">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-red-500 font-bold">
                                    {t('Dashboard.User.alert_delete_title')}
                                </AlertDialogTitle>

                                <AlertDialogDescription>
                                    {t('Dashboard.User.alert_delete_description')}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    {t('common.alert_cancel_button_label')}
                                </AlertDialogCancel>

                                <AlertDialogAction 
                                    className="bg-red-500" 
                                    onClick={handleDeleteActionDialogConfirmClick}
                                    disabled={loadingUserDelete}
                                >
                                    {loadingUserDelete && (
                                        <LoaderCircle className="mr-2"/>
                                    )}

                                    {t('common.alert_confirm_button_label')}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default UsersPage;