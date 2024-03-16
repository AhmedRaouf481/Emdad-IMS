"use client"

import { Box, Button, FormHelperText, Stack, TextField } from "@mui/material";
import { Formik, useFormikContext } from "formik";
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


interface IOrderData {
    purchasingNum: string
    qty: string
    client?: { label: string, id: string }
    products: any[]
}

const orderSchema = new Yup.ObjectSchema({
    purchasingNum: Yup.string().required("Purchasing Number is required"),
    qty: Yup.string().required("Quantity is required"),
    client: Yup.object(),
    products: Yup.array().required("Products is required")
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
    const productData = useGetAllProductsQuery({}).data
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
        const { client, products, ...restValues } = values
        const data = {
            ...restValues,
            clientId: client?.id,
            productsIds: products.map(product => product.id),
        }
        api.post('/order', data)
            .then((res) => {
                console.log(res)
                setError("")

            })
            .catch((err) => {
                console.log(err)
                setError(err?.response?.data?.message ?? "Something went wrong")
            })
    }


    // console.log(data);
    console.log(productData);


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
                        client: undefined,
                        products: [productData?.find((product: any) => product.code === data.code)]
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
                                        getOptionLabel={(option) => option?.code}
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
            <CustomizedDialog open={clientOpen} setOpen={setClientOpen}>
                <CreateClient setOpen={setClientOpen} />
            </CustomizedDialog>
        </>
    );
}
