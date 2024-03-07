"use client"

import { Box, Button, FormHelperText, Stack, TextField } from "@mui/material";
import { Formik } from "formik";
import InputField from "@/components/InputField";
import * as Yup from "yup"
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/core/api/api";
import colors from "@/styles/colors";
import Header from "@/components/layout/Header";
import SelectField from "@/components/SelectField";
import { useGetAllClientsQuery, useGetAllProductsQuery } from "@/core/redux/slice/api";
import CreateClient from "./CreateClient";
import CustomizedDialog from "@/components/CustomizedDialog";


interface IOrderData {
    purchasingNum: string
    qty: string
}

const orderSchema = new Yup.ObjectSchema({
    purchasingNum: Yup.string().required("Purchasing Number is required"),
    qty: Yup.string().required("Quantity is required"),
    client: Yup.object(),
    products: Yup.array().required("Products is required")
})

export default function CreateOrder() {
    const [error, setError] = useState("")
    const router = useRouter()

    const [open, setOpen] = useState(false);
    const productData = useGetAllProductsQuery({}).data
    let clientData = useGetAllClientsQuery({}).data

    const handleFormSubmit = (values: IOrderData) => {
        api.post('/user/login', values)
            .then((res) => {
                console.log(res)
                localStorage.setItem("token", res.data.token)
                router.push('/dashboard')
            })
            .catch((err) => {
                console.log(err)
                setError(err?.response?.data?.message ?? "Something went wrong")
            })
    }

    clientData = clientData?.map((v) => ({ label: v.name, id: v.code }))


    return (
        <>
            <Header title="Order" />
            <Box sx={{
                color: colors.black,
                pt: 2,
                mr: 2
            }}>
                <Formik
                    initialValues={{
                        purchasingNum: "",
                        qty: "",
                        client: "",
                        products: []
                    }}
                    validationSchema={orderSchema}
                    onSubmit={(values) => { console.log(values) }}
                >
                    {({
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => (
                        <Box component="form" onSubmit={handleSubmit}>
                            <Stack direction={"column"} gap={2}>
                                <InputField
                                    required
                                    title="Purchasing Number*"
                                    variant="outlined"
                                    name="purchasingNum"
                                    value={values.purchasingNum}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter purchasing number"
                                    helperText={
                                        errors.purchasingNum && touched.purchasingNum ? errors.purchasingNum : ""
                                    }
                                    error={errors.purchasingNum && touched.purchasingNum ? true : false}
                                />
                                <InputField
                                    title="Quantity*"
                                    required
                                    name="qty"
                                    value={values.qty}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter order quantity"
                                    type="number"
                                    helperText={
                                        errors.qty && touched.qty ? errors.qty : ""
                                    }
                                    error={errors.qty && touched.qty ? true : false}
                                />

                                <SelectField
                                    multiple
                                    limitTags={2}
                                    id="multiple-limit-tags"
                                    title="Product"
                                    options={productData ?? []}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.code}
                                    renderInput={(params) => (
                                        <TextField {...params} name="products" placeholder="Product" />
                                    )}
                                    value={values.products}
                                    onChange={(e, value) => {
                                        const event = { ...e, target: { ...e.target, name: "products", value: value } };
                                        handleChange(event);
                                    }}
                                />
                                <Stack direction={{ md: "row", sm: "column" }} gap={1} width={"100%"} alignItems={"end"}>

                                    <SelectField
                                        id="select-client"
                                        title="Client"
                                        options={clientData ?? []}
                                        renderInput={(params) => (
                                            <TextField {...params} name="client" />
                                        )}
                                        value={values.client}
                                        onChange={(e, value) => {
                                            const event = { ...e, target: { ...e.target, name: "client", value: value } };
                                            handleChange(event);
                                        }}
                                    />
                                    <Button
                                        color="secondary"
                                        variant="outlined"
                                        disableElevation
                                        sx={{ width: { md: "30%", sm: "100%", xs: "100%" }, height: "2.5rem" }}
                                        onClick={() => { setOpen(true) }}
                                    >
                                        Add client
                                    </Button>
                                </Stack>
                                <Button
                                    color="secondary"
                                    fullWidth
                                    variant="contained"
                                    disableElevation
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Stack>
                            <FormHelperText sx={{ color: "error.main", mt: 1, fontSize: "1rem" }}>
                                {error}
                            </FormHelperText>

                        </Box>
                    )}

                </Formik>
            </Box>
            <CustomizedDialog open={open} setOpen={setOpen}>
                <CreateClient />
            </CustomizedDialog>
        </>
    );
}
