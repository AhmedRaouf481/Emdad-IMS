"use client"

import InputField from "@/components/InputField";
import Header from "@/components/layout/Header";
import colors from "@/styles/colors";
import { InfoOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Stack, Typography } from "@mui/material";
import { BiPackage } from "react-icons/bi";

export default function Item() {
    const data: any[] = [
        {
            name: "Cup",
            qty: 1000,
        },
        {
            name: "Cup",
            qty: 1000,
        },
        {
            name: "Cup",
            qty: 1000,
        },
        {
            name: "Cup",
            qty: 1000,
        },
    ]
    return (
        <>

            <Box sx={{ overflowY: "auto", mt: 2, mr: 2 }}>
                <Grid container spacing={2}>
                    {data.map((item: any, index: number) => (
                        <Grid key={index} item lg={3} md={3} sm={6} xs={12} minWidth={350}>
                            <Card
                                sx={{
                                    backgroundColor: colors.secondaryColor,
                                    boxShadow: "none",
                                    borderRadius: "10px",
                                }}
                            >
                                <CardHeader
                                    title={item.name}
                                    subheader={<>{"Quantity:" + item.qty}</>}
                                    action={
                                        <IconButton
                                            onClick={() => { }}
                                            aria-label="settings"
                                        >
                                            <InfoOutlined />
                                        </IconButton>
                                    }
                                />
                                <CardMedia
                                    component="img"
                                    height="120"
                                    sx={{ objectFit: 'contain' }}
                                    image="/assets/box.png"
                                    alt="Paella dish"
                                />
                                <CardContent>
                                    <Typography variant="body2">
                                        Color: Red
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

            </Box>
        </>
    );
}
