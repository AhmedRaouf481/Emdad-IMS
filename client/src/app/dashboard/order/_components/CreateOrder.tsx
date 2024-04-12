"use client"

import { Accordion, Box, Button, FormHelperText, IconButton, LinearProgress, Stack, TextField } from "@mui/material";
import { Field, FieldArray, FieldProps, Formik, getIn, useFormikContext } from "formik";
import InputField from "@/components/InputField";
import * as Yup from "yup"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/core/api/api";
import colors from "@/styles/colors";
import Header from "@/components/layout/Header";
import SelectField from "@/components/SelectField";
import CreateClient from "./CreateClient";
import CustomizedDialog from "@/components/CustomizedDialog";
import { Clear } from "@mui/icons-material";
import { ProductState } from "@/core/redux/slice/products-slice";
import { useAppSelector } from "@/core/redux/hooks";
import { ClientState } from "@/core/redux/slice/clients-slice";


interface ProductValues {
    product?: { code: string, id: string }
    qty?: number
}

interface IOrderData {
    purchasingNum: string
    client?: { label: string, id: string }
    products: ProductValues[]
}

const orderSchema = new Yup.ObjectSchema({
    purchasingNum: Yup.string().required("Purchasing Number is required"),

    client: Yup.object().required("Client is required"),
    products: Yup.array().of(
        Yup.object().shape({
            product: Yup.object().required("Product code is required"),
            qty: Yup.number().required("Quantity is required").min(1, "Quantity must be greater than or equal to 1"),
        }).required("Products is required")
    )
})


export default function CreateOrder({ setFieldValue, formRef, data }: { setFieldValue?: any, formRef?: React.MutableRefObject<any>, data?: string[] }) {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    const productState: ProductState = useAppSelector(
        (state: any) => state.product
    );

    const clientState: ClientState = useAppSelector(
        (state: any) => state.client
    );


    const [clientOpen, setClientOpen] = useState(false);
    const productData = productState.products ?? []
    let clientData = clientState.clients ?? []

    const [clients, setClients] = useState<any>(clientData)
    useEffect(() => {
        api.get('/client')
            .then((res) => {
                console.log(res)
                setClients(res.data)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [clientOpen])



    const handleFormSubmit = (values: IOrderData) => {
        // console.log(values)
        const { client, products, ...restValues } = values
        const data = {
            ...restValues,
            clientId: client?.id,
            products,
        }
        setLoading(true)
        api.post('/order', data)
            .then((res) => {
                console.log(res)
                setError("")
                setLoading(false)
                window.location.reload()

            })
            .catch((err) => {
                console.log(err)
                setError(err?.response?.data?.message ?? "Something went wrong")
                setLoading(false)
            })
    }

    const calcProductsIntialValues = () => {
        let products: ProductValues[] = [{ product: undefined, qty: 0 }]
        if (data) {

            products = productData.filter(product => data.includes(product.id as string))
            console.log(products);
        }

        return products.map((product: any) => ({ product: { code: product.code, id: product.id }, qty: 0 }))

    }
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
                        client: undefined,
                        products: calcProductsIntialValues()
                    }}
                    validationSchema={orderSchema}
                    onSubmit={(values) => handleFormSubmit(values)}
                    innerRef={formRef}
                >
                    {({
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => {
                        return (

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
                                    {/* <AccordionGroup /> */}
                                    <FieldArray name="products">
                                        {({ push, remove }) => (
                                            <div>
                                                {values.products.map((p, index) => {
                                                    const qty = `products[${index}].qty`;
                                                    const touchedQty = getIn(touched, qty);
                                                    const errorQty = getIn(errors, qty);

                                                    const product = `products[${index}].product`;
                                                    const touchedProduct = getIn(touched, product);
                                                    const errorProduct = getIn(errors, product);

                                                    return (
                                                        <Stack key={index} direction={"row"} gap={2} sx={{
                                                            width: "100%"
                                                        }}>
                                                            <SelectField
                                                                title="Product"
                                                                options={productData?.map((v: any) => ({ code: v.code, id: v.id })) ?? []}
                                                                getOptionLabel={(option) => option.code}
                                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                                renderOption={(props, option) => {
                                                                    return (
                                                                        <Box component='li' {...props} key={option.id}>{option.code}</Box>
                                                                    );
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField {...params} name={product} placeholder="Product" error={errorProduct}
                                                                        helperText={touchedProduct && errorProduct
                                                                            ? errorProduct
                                                                            : ""} />
                                                                )}
                                                                value={p.product}
                                                                onChange={(e, value) => {
                                                                    const event = { ...e, target: { ...e.target, name: product, value: value } };
                                                                    handleChange(event);
                                                                }}
                                                            />
                                                            <InputField
                                                                title="Quantity"
                                                                variant="outlined"
                                                                name={qty}
                                                                value={p.qty}
                                                                required
                                                                type="number"
                                                                InputProps={{
                                                                    inputProps: { min: 0 }
                                                                }}
                                                                helperText={
                                                                    touchedQty && errorQty
                                                                        ? errorQty
                                                                        : ""
                                                                }
                                                                error={Boolean(touchedQty && errorQty)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                            <Box sx={{
                                                                display: 'flex',
                                                                alignItems: 'end'
                                                            }}>

                                                                <IconButton
                                                                    sx={{
                                                                        pb: 2
                                                                    }}

                                                                    onClick={() => remove(index)}>
                                                                    <Clear />
                                                                </IconButton>
                                                            </Box>

                                                        </Stack>
                                                    );
                                                })}

                                                <Button
                                                    type="button"
                                                    variant="outlined"
                                                    onClick={() =>
                                                        push({ product: undefined, qty: 0 })
                                                    }
                                                >
                                                    Add
                                                </Button>
                                            </div>
                                        )}
                                    </FieldArray>

                                    <Stack direction={{ md: "row", sm: "column" }} gap={1} width={"100%"} alignItems={"end"}>

                                        <SelectField
                                            id="select-client"
                                            title="Client"
                                            options={clients?.map((v: any) => ({ label: v.name, id: v.id }))}
                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                            renderOption={(props, option) => {
                                                return (
                                                    <Box component='li' {...props} key={option.id}>{option.label}</Box>
                                                );
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} name="client"
                                                    helperText={
                                                        errors.client && touched.client ? errors.client : ""
                                                    }
                                                    error={errors.client && touched.client ? true : false} />
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
                                            sx={{ width: { md: "30%", sm: "100%", xs: "100%" }, height: "2.5rem", mb: errors.client && touched.client ? 3 : 0 }}
                                            onClick={() => { setClientOpen(true) }}
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
                        )
                    }}

                </Formik>
                <LinearProgress sx={{ display: loading ? "block" : "none" }} />
            </Box >
            <CustomizedDialog open={clientOpen} setOpen={setClientOpen} maxWidth={"xs"}>
                <CreateClient setOpen={setClientOpen} />
            </CustomizedDialog>
        </>
    );
}
