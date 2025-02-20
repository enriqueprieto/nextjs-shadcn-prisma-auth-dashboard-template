import { ReactNode } from "react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Home, UsersRound } from "lucide-react";
import Link from "next/link";

interface ComponentProps {
    children?: ReactNode;
}

function getInitials(name: string): string {
    if (!name) return "";
  
    const parts = name.trim().split(/\s+/); // Divide por espaços múltiplos
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase(); // Primeira letra do primeiro e do segundo nome
    }
    
    return parts[0].slice(0, 2).toUpperCase(); // Duas primeiras letras do primeiro nome
  }
export const AppSidebar = ({ children }: ComponentProps) => {
    const router = useRouter();
    const { data } = useSession();

    const handleLogout = async () => {
        await signOut()
        router.push("/auth/login"); // Redireciona para a página de login
    };
    return (
        <Sidebar>
            <SidebarHeader>
                {(data?.user) && (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="hover:bg-neutral-300 py-2 px-4 rounded-md">
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarFallback>{getInitials(data.user.name || '')}</AvatarFallback>
                                </Avatar>

                                <div className="font-medium dark:text-white">
                                    <div>{data.user.name}</div>
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>Sign out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/dashboard" className="flex align-items-center text-sm">
                                    <Home />
                                    <span className="ml-2 leading-[24px]">Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem >
                            <SidebarMenuButton asChild>
                                <Link href="/dashboard/users" className="flex align-items-center text-sm">
                                    <UsersRound />
                                    <span className="ml-2 leading-[24px]">Users</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                {children}
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}