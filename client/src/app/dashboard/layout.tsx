import { SidebarProvider } from "@/components/layout/sidebar/SidebarContext";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { AlertProvider } from "@/components/Alert/AlertContext";
import GlobalAlert from "@/components/Alert/GlobalAlert";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AlertProvider>
            <div className="layout">
                <Sidebar />
                <main className="layout__main-content">
                    {children}
                </main>
            </div>
            <GlobalAlert/>
            </AlertProvider>
        </SidebarProvider>
    );
}
