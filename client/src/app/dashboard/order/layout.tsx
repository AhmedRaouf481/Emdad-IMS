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
export default function OrderLayout({
    children,
}: {
    children: React.ReactNode
}) {


    return (
        <>
            <ThemeProvider theme={theme}>

                <Header title="Orders"
                />

                <TableProvider>
                    {children}
                </TableProvider>
            </ThemeProvider>
        </>
    )
}