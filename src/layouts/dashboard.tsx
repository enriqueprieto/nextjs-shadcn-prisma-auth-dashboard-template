import { AppSidebar } from "@/components/appsidebar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";
interface LayoutProps {
    children?: ReactNode;
}

const DashboardLayout = ({children}: LayoutProps) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            
            <SidebarInset>
                <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 py-2 justify-between">
                    <SidebarTrigger />
                    
                    <LanguageSwitcher />
                </header>

                <main className="px-4 py-2">
                    {children}
                </main>

                <Toaster />
            </SidebarInset>
        </SidebarProvider>
    );
}

export default DashboardLayout;