"use client"

import { Accordion, Box, Button, FormHelperText, IconButton, Stack, TextField } from "@mui/material";
import { Field, FieldArray, FieldProps, Formik, getIn, useFormikContext } from "formik";
import InputField from "@/components/InputField";
import * as Yup from "yup"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/core/api/api";
import colors from "@/styles/colors";
import Header from "@/components/layout/Header";
import SelectField from "@/components/SelectField";
import { useGetAllClientsQuery, useGetAllProductsQuery } from "@/core/redux/slice/api";
import CreateClient from "./CreateClient";
import CustomizedDialog from "@/components/CustomizedDialog";
import AccordionGroup from "@/components/AccordionGroup";
import { Clear } from "@mui/icons-material";


interface ProductValues {
    code: string
    qty: number
}

interface IOrderData {
    purchasingNum: string
    client?: { label: string, id: string }
    products: ProductValues[]
}

const orderSchema = new Yup.ObjectSchema({
    purchasingNum: Yup.string().required("Purchasing Number is required"),

    client: Yup.object(),
    products: Yup.array().of(
        Yup.object().shape({
            code: Yup.string().required("Product code is required"),
            qty: Yup.string().required("Quantity is required"),
        }).required("Products is required")
    )
})

const UpdateData = ({ data = null }: { data: any }) => {
    const { setFieldValue } = useFormikContext()
    useEffect(() => {
        console.log("555555555");
        setFieldValue("products", data)
    }, [data])
    return null
}

export default function CreateOrder({ setFieldValue, formRef, data }: { setFieldValue?: any, formRef?: React.MutableRefObject<any>, data?: any }) {
    const [error, setError] = useState("")
    const router = useRouter()


    const [clientOpen, setClientOpen] = useState(false);
    const productData = useGetAllProductsQuery({}).data ?? []
    let clientData = useGetAllClientsQuery({}).data
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
        // const { client, products, ...restValues } = values
        // const data = {
        //     ...restValues,
        //     clientId: client?.id,
        //     productsIds: products.map(product => product.id),
        // }
        // api.post('/order', data)
        //     .then((res) => {
        //         console.log(res)
        //         setError("")

        //     })
        //     .catch((err) => {
        //         console.log(err)
        //         setError(err?.response?.data?.message ?? "Something went wrong")
        //     })
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
                        products: [{
                            code: "",
                            qty: 0,
                        }]
                    }}
                    validationSchema={orderSchema}
                    onSubmit={(values) => { console.log(values); return handleFormSubmit(values) }}
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

                                                    const code = `products[${index}].code`;
                                                    const touchedCode = getIn(touched, code);
                                                    const errorCode = getIn(errors, code);

                                                    return (
                                                        <Stack key={index} direction={"row"} gap={2} sx={{
                                                            width: "100%"
                                                        }}>
                                                            <SelectField
                                                                title="Product"
                                                                options={productData ?? []}
                                                                getOptionLabel={(option) => option?.code}
                                                                renderInput={(params) => (
                                                                    <TextField {...params} name={code} placeholder="Product" />
                                                                )}
                                                                value={p.code}
                                                                onChange={(e, value) => {
                                                                    const event = { ...e, target: { ...e.target, name: code, value: value } };
                                                                    handleChange(event);
                                                                }} />

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
                                                        push({ code: "", qty: 0 })
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
                                            options={clients?.map((v: any) => ({ label: v.name, id: v.id })) ?? []}
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
            </Box >
            <CustomizedDialog open={clientOpen} setOpen={setClientOpen} maxWidth={"xs"}>
                <CreateClient setOpen={setClientOpen} />
            </CustomizedDialog>
        </>
    );
}
