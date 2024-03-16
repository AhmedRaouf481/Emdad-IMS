"use client"

import { Avatar, Box, Button, Card, CardContent, CardHeader, Grid, Stack, Typography } from "@mui/material";
import CardView from "./product/_components/CardView";
import { BiDollar } from "react-icons/bi";
import Header from "@/components/layout/Header";

export default function Home() {
    const data = [
        {
            title: "Total Products",
            value: "129"
        },
        {
            title: "All Orders",
            value: "30"
        },
        {
            title: "Revenue",
            value: "50,000"
        },
    ]
    return (
        <>
            <Header title="Dashboard" />
            <Stack mt={1} spacing={2} direction={"row"}>
                {data?.map((record: any, index: number) => {
                    return (
                        <Card
                            sx={{
                                backgroundColor: "#EEEFFF",
                                boxShadow: "none",
                                borderRadius: "15px",
                                height: "100%",
                                minWidth: "30%"
                            }}
                        >
                            <CardHeader
                                // avatar={
                                //     <Avatar
                                //         aria-label="recipe"
                                //     >
                                //         <BiDollar />
                                //     </Avatar>
                                // }
                                title={record.title}
                            />
                            <CardContent
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        // alignItems: "center",
                                    }}
                                >
                                    <Typography variant="h4" color="text.secondary">
                                        {record.value}
                                    </Typography>

                                </Box>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>
        </>
    );
}
