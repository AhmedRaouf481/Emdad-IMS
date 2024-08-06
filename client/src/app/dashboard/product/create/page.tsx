"use client"

import { Box, IconButton, Typography } from "@mui/material"
import ProductForm from "../_components/ProductForm"
import { ArrowBackIos } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import api from "@/core/api/api"


export default function CreateProduct() {
    const router = useRouter()
    const handleSubmit = (values: any) => {
        console.log(values);
        const { qty, pkgCapacity, minValue, weight, price, ...restValues } = values
        api.post("product", {
            ...restValues,
            qty: qty ? +qty : undefined,
            pkgCapacity: pkgCapacity ? +pkgCapacity : undefined,
            minValue: minValue ? +minValue : undefined,
            weight: weight ? +weight : undefined,
            price: price ? +price : undefined,
        })
            .then((res) => {
                console.log(res);
                router.push("/dashboard/product")
            })
            .catch((err) => {
                console.log(err);

            })
    }
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    pt: 4,
                    // gap: 2
                }}
            >
                <IconButton onClick={() => router.replace("/dashboard/product")} >
                    <ArrowBackIos fontSize="inherit" />
                </IconButton>
                <Typography variant="subtitle2">
                    All Products
                </Typography>
            </Box>
            <Box pr={4}>

                <ProductForm handleSubmit={handleSubmit} />
            </Box>
        </>
    )
}
