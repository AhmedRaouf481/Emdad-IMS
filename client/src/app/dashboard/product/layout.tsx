"use client"
import Header from "@/components/layout/Header"
import Navbar from "@/components/layout/Navbar"
import colors from "@/styles/colors"
import { ThemeProvider } from "@emotion/react"
import { Box, createTheme } from "@mui/material"
import UploadFileIcon from '@mui/icons-material/UploadFile';

const theme = createTheme({
    palette: {
        primary: {
            main: colors.secondaryColor
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

    return (
        <>
            <ThemeProvider theme={theme}>

                <Header title="Products" button={{
                    name: "Import", props: {
                        variant: "outlined",
                        color: "secondary",
                        startIcon: <UploadFileIcon />,
                        size: "large"
                    }
                }}
                />

                {children}
            </ThemeProvider>
        </>
    )
}