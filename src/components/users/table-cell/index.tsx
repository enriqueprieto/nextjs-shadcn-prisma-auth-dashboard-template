import { MoreHorizontal, Trash } from "lucide-react"

import { UserModel } from "@/models/user/types";

import { Button } from "@/components/ui/button"
import { 
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
    DropdownMenuLabel, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"


interface UserTableActionsCellProps {
    [key: string]: any;
    onActionClick?: (action: string, userData: UserModel) => void;
}

export const UserTableActionsCell = (props: UserTableActionsCellProps = {}) => {
    const {
        row = {} as any,
        onActionClick = null
    } = props;
    const { original: userData } = row;

    const handleActionClick = (action: string) => {
        if (!onActionClick) return;

        onActionClick(action, userData);
    }

    return (
        <div onClick={(event) => event.stopPropagation()}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>

                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuItem className="text-red-500" onClick={handleActionClick.bind(this, 'delete')}>
                        <Trash />

                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}