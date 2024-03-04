import colors from "@/styles/colors"
import { Box } from "@mui/material"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from "next/image";
import Link from "next/link";


export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{
                bgcolor: colors.primaryColor,
                borderBottom: `2px solid ${colors.secondaryColor}`,
                color: colors.black
            }}>
                <Toolbar>
                    <Link style={{ display: "flex", alignItems: "center" }} href={"/dashboard"}>
                        <Image
                            width={80}
                            height={80}
                            className="sidebar__logo"
                            src="/logo.png"
                            alt="logo"
                        />
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1, pl: 1, fontWeight: 600 }}>
                            Emdad
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
