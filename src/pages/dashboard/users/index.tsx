import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import DashboardLayout from "@/layouts/dashboard";
import { DataTable } from "@/components/ui/data-table"; 
import { UserTableActionsCell } from "@/components/users/table-cell";
import { useToast } from "@/hooks/use-toast";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}
  
const columns = [
    { 
        header: "Name", 
        accessorKey: "name" 
    },
    { header: "Email", accessorKey: "email" },
    { header: "Role", accessorKey: "role" },
    { 
        id: "actions",
        cell: UserTableActionsCell,
    }
];

const UsersPage = () => {
    const [data, setData] = useState<ColumnDef<User>[]>([]);
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);
    const handleRowClick = (row: any) => {
        console.log('UsersPage handleRowClick row ==========>', row);
        console.log('UsersPage handleRowClick row.original ==========>', row.original);
    }

    useEffect(() => {
        async function fetchUsers() {
        try {
            const res = await fetch("/api/users");
            if (!res.ok) {
                throw new Error("Failed to fetch users");
            }
            const responseData = await res.json() as User[] || [];

            setData(responseData.map(item => item as ColumnDef<User>));
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
        fetchUsers();
    }, []);
    return (
        <DashboardLayout>
            <div>
                <h2 className="text-5xl font-medium">Users</h2>

                {loading && (
                    <p>Loading...</p>
                )}

                {!loading && (
                    <div className="mt-4">
                        <DataTable 
                            data={data} 
                            columns={columns} 
                            onRowClick={handleRowClick}
                        />
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

export default UsersPage;