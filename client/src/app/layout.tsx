import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Box } from "@mui/material";
import { SidebarProvider } from "@/components/layout/sidebar/SidebarContext";
import Sidebar from "@/components/layout/sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emdad",
  description: "Emdad Inventory managemnt system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <div className="layout">
            <Sidebar />
            <main className="layout__main-content">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
