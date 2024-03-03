"use client"

import InputField from "@/components/InputField";
import { Box, Button, Stack } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup"

const productSchema = new Yup.ObjectSchema({
    code: Yup.string().required("Code is required"),
    name: Yup.string().required("Name is required"),
    color: Yup.string().required("Color is required"),
    size: Yup.string().required("Size is required"),
    material: Yup.string().required("Material is required"),
    description: Yup.string(),
    price: Yup.number().required("Price is required"),
    qty: Yup.number().required("Quantity is required"),
    minValue: Yup.number(),
})

const productIntialValues = {
    code: "",
    name: "",
    color: "",
    size: "",
    material: "",
    description: "",
    price: undefined,
    qty: undefined,
    minValue: undefined,

}
export default function AddProduct() {
    return (
        <>

            <Formik
                initialValues={productIntialValues}
                validationSchema={productSchema}
                onSubmit={(values) => console.log(values)}
            >
                {({
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", width: "100%", alignProducts: "center" }}>
                        <Box sx={{ width: "50vw" }}>
                            <Stack direction={"column"} gap={2}>
                                <InputField
                                    required
                                    fullWidth
                                    title="Code*"
                                    variant="outlined"
                                    name="code"
                                    value={values.code}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={
                                        errors.code && touched.code ? errors.code : ""
                                    }
                                    error={errors.code && touched.code ? true : false}
                                />
                                <InputField
                                    title="Product Name*"
                                    required
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={
                                        errors.name && touched.name ? errors.name : ""
                                    }
                                    error={errors.name && touched.name ? true : false}
                                />
                                <InputField
                                    title="Price*"
                                    required
                                    name="price"
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="number"
                                    helperText={
                                        errors.price && touched.price ? errors.price : ""
                                    }
                                    error={errors.price && touched.price ? true : false}
                                />
                                <InputField
                                    title="Quantity*"
                                    required
                                    name="qty"
                                    value={values.qty}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="number"
                                    helperText={
                                        errors.qty && touched.qty ? errors.qty : ""
                                    }
                                    error={errors.qty && touched.qty ? true : false}
                                />
                                <InputField
                                    required
                                    title="Size*"
                                    variant="outlined"
                                    name="size"
                                    value={values.size}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={
                                        errors.size && touched.size ? errors.size : ""
                                    }
                                    error={errors.size && touched.size ? true : false}
                                />
                                <Button
                                    color="secondary"

                                    variant="contained"
                                    disableElevation

                                >
                                    Submit
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                )}

            </Formik>
        </>
    );
}
