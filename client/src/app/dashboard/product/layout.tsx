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

export default function ItemLayout({
    children,
}: {
    children: React.ReactNode
}) {


    return (
        <>

            <Header title="Products" />

            <TableProvider>
                {children}
            </TableProvider>
        </>
    )
}