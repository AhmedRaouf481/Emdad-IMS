import { Box, Button, FormHelperText, Stack } from "@mui/material";
import { Formik } from "formik";
import InputField from "@/components/InputField";
import * as Yup from "yup"
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/core/api/api";
import colors from "@/styles/colors";
import Header from "@/components/layout/Header";


interface IClientData {
    name: string
    code: string
}

const clientSchema = new Yup.ObjectSchema({
    name: Yup.string().required("Name is required"),
    code: Yup.string().required("Code is required"),
    address: Yup.string().required("Address is required"),
})

export default function CreateClient() {
    const [error, setError] = useState("")
    const router = useRouter()


    const handleFormSubmit = (values: IClientData) => {
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


    return (
        <>
            <Header title="Add Client" />
            <Box sx={{
                color: colors.black,
                pt: 2,
                mr: 2
            }}>
                <Formik
                    initialValues={{
                        name: "",
                        code: "",
                        address: "",
                    }}
                    validationSchema={clientSchema}
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
                            <Stack direction={"column"} gap={1}>
                                <InputField
                                    required
                                    title="Name*"
                                    variant="outlined"
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
                                    title="Code*"
                                    required
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
                                    title="Address*"
                                    required
                                    name="address"
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={
                                        errors.address && touched.address ? errors.address : ""
                                    }
                                    error={errors.address && touched.address ? true : false}
                                />
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
        </>
    );
}
