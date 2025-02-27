import { AppSidebar } from "@/components/appsidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { getStaticPropsWithIntl } from "@/lib/getStaticPropsWithIntl";
import { ReactNode } from "react";

interface LayoutProps {
    children?: ReactNode;
}

export const getStaticProps = getStaticPropsWithIntl();

export default function AppLayout({children}: LayoutProps) {
    return (
        <div className="app-layout">
            {children}
        </div>
    );
}