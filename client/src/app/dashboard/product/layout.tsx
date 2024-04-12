"use client"
import Header from "@/components/layout/Header"
import Navbar from "@/components/layout/Navbar"
import colors from "@/styles/colors"
import { ThemeProvider } from "@emotion/react"
import { Box, Button, Input, createTheme } from "@mui/material"
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useRef, useState } from "react"
import api from "@/core/api/api"
import { TableProvider } from "@/components/TableView/context"

const theme = createTheme({
    palette: {
        primary: {
            main: colors.orange
        },
        secondary: {
            main: colors.purple
        },
    }
})
export default function ItemLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const fileInputRef: any = useRef(null);

    const handleUpload = async (e: any) => {
        const file = fileInputRef.current.files[0];
        if (!file) {
            console.error('No file selected');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('excelFile', file);
            await api.post('http://your-nest-backend-url/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleUpload}
                    />
                </div>
                <Header title="Products" button={{
                    name: "Import", props: {
                        variant: "outlined",
                        color: "secondary",
                        startIcon: <UploadFileIcon />,
                        size: "large",
                        onClick: handleClick
                    }
                }}
                />

                <TableProvider>
                    {children}
                </TableProvider>
            </ThemeProvider>
        </>
    )
}