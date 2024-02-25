"use client"
import Navbar from "@/components/layout/Navbar"
import colors from "@/styles/colors"
import { ThemeProvider } from "@emotion/react"
import { Box, createTheme } from "@mui/material"

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
export default function LogainLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <ThemeProvider theme={theme}>

                <Navbar />
                <Box sx={{
                    bgcolor: colors.primaryColor,
                    width: "100%",
                    height: "80vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    {children}
                </Box>
            </ThemeProvider>
        </>
    )
}