"use client"

import { Product } from "@/core/redux/slice/products-slice";
import colors from "@/styles/colors";
import { ExpandMore } from "@mui/icons-material";
// import TextField from "@/components/TextField";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup"

const productSchema = new Yup.ObjectSchema({
    name: Yup.string().required("Name is required"),
    code: Yup.string().required("Code is required"),
    price: Yup.number().required("Price is required"),
    qty: Yup.number().required("Quantity is required"),
    pkgCapacity: Yup.number().required("Package capacity is required"),
    color: Yup.string(),
    size: Yup.string(),
    material: Yup.string(),
    description: Yup.string(),
    dimension: Yup.string(),
    minValue: Yup.number(),
    weight: Yup.number(),
})

const productIntialValues = {
    code: "",
    name: "",
    color: "",
    size: "",
    material: "",
    description: "",
    pkgCapacity: "",
    weight: "",
    dimension: "",
    price: "",
    qty: "",
    minValue: "",

}
export default function ProductForm({ formIntialValues, handleSubmit }: { formIntialValues?: Product, handleSubmit: (values: any) => void }) {
    const [expanded, setExpanded] = useState<boolean>(false);

    const handleAccordionChange = () => {
        setExpanded(!expanded);
    };

    const convertNullToUndefined = (values: any) => {
        Object.keys(values).forEach(key => {
            if (values[key] === null) {
                values[key] = "";
            }
        })
        return values;
    }
    if (formIntialValues) {
        formIntialValues = convertNullToUndefined(formIntialValues)
    }
    return (
        <>

            <Formik
                initialValues={formIntialValues ?? productIntialValues}
                validationSchema={productSchema}
                onSubmit={(values) => {
                    console.log("clicked")
                    return handleSubmit(values)
                }}
            >
                {({
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isValid
                }) => {
                    return (
                        <Box component="form" onSubmit={handleSubmit} sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            alignProducts: "center",
                            // px: 3,
                        }}>
                            <Box >
                                <Grid container spacing={2} >
                                    <Grid md={12} xs={12}>
                                        <TextField
                                            placeholder="Product Name"
                                            InputProps={{ sx: { fontSize: "1.5rem" } }}
                                            variant="standard"
                                            required
                                            fullWidth
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={
                                                errors.name && touched.name ? errors.name : ""
                                            }
                                            error={errors.name && touched.name ? true : false}
                                        />
                                    </Grid>
                                    <Grid md={4} xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Code"
                                            variant="outlined"
                                            name="code"
                                            size="small"
                                            value={values.code}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={
                                                errors.code && touched.code ? errors.code : ""
                                            }
                                            error={errors.code && touched.code ? true : false}
                                        />
                                    </Grid>
                                    <Grid md={4} xs={6}>
                                        <TextField
                                            label="Quantity"
                                            required
                                            fullWidth
                                            size="small"
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
                                    </Grid>
                                    <Grid md={4} xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Package capacity"
                                            variant="outlined"
                                            size="small"
                                            name="pkgCapacity"
                                            type="number"
                                            value={values.pkgCapacity}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={
                                                errors.pkgCapacity && touched.pkgCapacity ? errors.pkgCapacity : ""
                                            }
                                            error={errors.pkgCapacity && touched.pkgCapacity ? true : false}
                                        />
                                    </Grid>
                                    <Grid md={4} xs={6}>
                                        <TextField
                                            label="Price"
                                            required
                                            fullWidth
                                            size="small"
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
                                    </Grid>
                                </Grid>
                                <Accordion expanded={!isValid || expanded} onChange={() => handleAccordionChange()} elevation={0} sx={{ my: 2 }} >
                                    <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 0 }}>
                                        <Typography variant="h6" fontWeight={400}>
                                            More Info
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ px: 0 }}>

                                        <Grid container spacing={2} >
                                            <Grid md={12} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Description"
                                                    variant="outlined"
                                                    size="small"
                                                    name="description"
                                                    value={values.description}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    helperText={
                                                        errors.description && touched.description ? errors.description : ""
                                                    }
                                                    error={errors.description && touched.description ? true : false}
                                                />
                                            </Grid >
                                            <Grid md={4} xs={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Color"
                                                    variant="outlined"
                                                    size="small"
                                                    name="color"
                                                    value={values.color}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    helperText={
                                                        errors.color && touched.color ? errors.color : ""
                                                    }
                                                    error={errors.color && touched.color ? true : false}
                                                />
                                            </Grid>
                                            <Grid md={4} xs={6}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    label="Size"
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
                                            </Grid>
                                            <Grid md={4} xs={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Material"
                                                    variant="outlined"
                                                    size="small"
                                                    name="material"
                                                    value={values.material}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    helperText={
                                                        errors.material && touched.material ? errors.material : ""
                                                    }
                                                    error={errors.material && touched.material ? true : false}
                                                />
                                            </Grid>
                                            <Grid md={4} xs={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Minimum Value"
                                                    variant="outlined"
                                                    name="minValue"
                                                    size="small"
                                                    type="number"
                                                    value={values.minValue}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    helperText={
                                                        errors.minValue && touched.minValue ? errors.minValue : ""
                                                    }
                                                    error={errors.minValue && touched.minValue ? true : false}
                                                />
                                            </Grid>
                                            <Grid md={4} xs={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Dimension"
                                                    size="small"
                                                    variant="outlined"
                                                    name="dimension"
                                                    value={values.dimension}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    helperText={
                                                        errors.dimension && touched.dimension ? errors.dimension : ""
                                                    }
                                                    error={errors.dimension && touched.dimension ? true : false}
                                                />
                                            </Grid>
                                            <Grid md={4} xs={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Weight"
                                                    variant="outlined"
                                                    size="small"
                                                    name="weight"
                                                    type="number"
                                                    value={values.weight}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    helperText={
                                                        errors.weight && touched.weight ? errors.weight : ""
                                                    }
                                                    error={errors.weight && touched.weight ? true : false}
                                                />
                                            </Grid>

                                        </Grid >
                                    </AccordionDetails>
                                </Accordion>

                            </Box >
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "end",
                                    py: 2
                                }}>

                                <Button
                                    color="secondary"
                                    variant="contained"
                                    disableElevation
                                    size="large"
                                    type="submit"

                                >
                                    Submit
                                </Button>
                            </Box>
                        </Box >
                    )
                }
                }

            </Formik >
        </>
    );
}
