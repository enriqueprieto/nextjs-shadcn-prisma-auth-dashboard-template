import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { LoaderCircle } from "lucide-react";

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



const UsersPage = () => {
    const [data, setData] = useState<ColumnDef<UserModel>[]>([]);
    const [userSelected, setUserSelected] = useState<UserModel | null>(null);
    const [openUserFormDialog, setOpenUserFormDialog] = useState(false);
    const [userFormLoading, setUserFormLoading] = useState(false);

    const [loadingUserDelete, setLoadingUserDelete] = useState(false);
    const [openUserDeleteDialog, setOpenUserDeleteDialog] = useState(false);

    const { toast } = useToast();
    const [loading, setLoading] = useState(true);

    const getColumns = () => {
        return [
            { 
                header: "Name", 
                accessorKey: "name" 
            },
            { header: "Email", accessorKey: "email" },
            { header: "Role", accessorKey: "role" },
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
                throw new Error(errorData.error || "Error deleting user");
            }


            toast({
                title: 'Everything went ok!',
                description: 'User delete success.',
                className: "bg-green-500 border-green-700",
                duration: 1500
            });

            setUserSelected(null);
            handleDeleteActionDialogChangeOpen(false);
            fetchUsers();
        } catch (error: any) {
            console.error("Error deleting user:", error);
            toast({
                title: 'Something went wrong',
                description: error.message,
                className: "bg-red-500 border-red-700",
                variant: 'destructive'
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
                throw new Error('Failed trying save the changes on server.');
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
                title: 'Everything went ok!',
                description: 'User save success.',
                className: "bg-green-500 border-green-700",
                duration: 1500
            });

            handleUserFormDilaogOpenChange(false);
        } catch (error: any) {
            toast({
                title: 'Something went wrong',
                description: error.message,
                className: "bg-red-500 border-red-700",
                variant: 'destructive'
            });
        }

        setUserFormLoading(false);
    }

    async function fetchUsers() {
    try {
        const res = await fetch("/api/users");
        if (!res.ok) {
            throw new Error("Failed to fetch users");
        }
        const responseData = await res.json() as UserModel[] || [];

        setData(responseData.map(item => item as ColumnDef<UserModel>));
    } catch (err: any) {
        toast({
            title: "Something went wrong",
            description: err.message,
            variant: 'destructive'
        });
    } finally {
        setLoading(false);
    }
    }

    useEffect(() => {
        fetchUsers();
    }, []);


    return (
        <DashboardLayout>
            <div>
                <div className="flex justify-between items-center">
                    <h2 className="text-5xl font-medium">Users</h2>

                    <Button type="button" onClick={handleCreateClick}>
                        New User
                    </Button>
                </div>

                {loading && (
                    <p>Loading...</p>
                )}

                {!loading && (
                    <div className="mt-4">
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
                                <DialogTitle>{userSelected ? 'Edit User' : 'Create User'}</DialogTitle>
                            </DialogHeader>

                            <UserForm 
                                user={userSelected} 
                                className="py-4"
                                onSubmit={handleFormSubmit.bind(this)} 
                            />

                            <DialogFooter className="pt-2">
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>

                                <Button 
                                    type="submit" 
                                    form="user__form"
                                    disabled={userFormLoading}
                                >
                                    {userFormLoading && (
                                        <LoaderCircle className="mr-2"/>
                                    )}

                                    {
                                        userSelected
                                            ? userFormLoading ? 'Saving...' : 'Save changes'
                                            : userFormLoading ? 'Creating...': "Create user"
                                    }
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
                                <AlertDialogTitle className="text-red-500 font-bold">Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete user data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>No, thanks</AlertDialogCancel>

                                <AlertDialogAction 
                                    className="bg-red-500" 
                                    onClick={handleDeleteActionDialogConfirmClick}
                                    disabled={loadingUserDelete}
                                >
                                    {loadingUserDelete && (
                                        <LoaderCircle className="mr-2"/>
                                    )}

                                    Continue
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