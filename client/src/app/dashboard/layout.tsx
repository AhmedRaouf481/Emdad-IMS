import { SidebarProvider } from "@/components/layout/sidebar/SidebarContext";
import Sidebar from "@/components/layout/sidebar/Sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <div className="layout">
                <Sidebar />
                <main className="layout__main-content">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}
