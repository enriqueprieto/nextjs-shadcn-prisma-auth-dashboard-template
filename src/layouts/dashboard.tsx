import { AppSidebar } from "@/components/appsidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface LayoutProps {
    children?: ReactNode;
}
const DashboardLayout = ({children}: LayoutProps) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 py-2">
                    <SidebarTrigger />
                </header>

                <main className="px-4 py-2">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default DashboardLayout;