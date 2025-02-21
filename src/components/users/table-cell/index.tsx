import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash } from "lucide-react"

interface UserTableActionsCellProps {
    [key: string]: any;
}

export const UserTableActionsCell = (props: UserTableActionsCellProps = {}) => {
    const { original: userData } = props?.row || {} as any;

    const handleUserDelete = async () => {
        try {
            const response = await fetch(`/api/users/${userData.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error deleting user");
            }
    
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>

                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem className="text-red-500" onClick={handleUserDelete}>
                    <Trash />
                    <span>Remove</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}