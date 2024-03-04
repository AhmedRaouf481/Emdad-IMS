"use client"
import { Box, Button, Divider, FormHelperText, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup"
import InputField from "@/components/InputField";
import colors from "@/styles/colors";
import { useEffect, useState } from "react";
import api from "@/core/api/api";
import { redirect, useRouter } from "next/navigation";

interface ILoginData {
    username: string
    password: string
}

const loginSchema = new Yup.ObjectSchema({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
})

export default function Login() {
    const [error, setError] = useState("")
    const router = useRouter()
    const handleFormSubmit = (values: ILoginData) => {
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
        <Stack direction="column" gap={2} width={{ lg: "35vw", md: "50vw", sm: "50vw" }} fontFamily={"inherit"}>
            <Box>

                <Typography variant="h2" sx={{ fontSize: { s: "1rem" } }}>Login</Typography>
                <Typography variant="subtitle2">Hi, welcome back 👋</Typography>
            </Box>
            <Divider />
            <Box sx={{
                color: colors.black,
                pt: 2,
            }}>
                <Formik
                    initialValues={{
                        username: "",
                        password: ""
                    }}
                    validationSchema={loginSchema}
                    onSubmit={(values) => { handleFormSubmit(values); console.log(values) }}
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
                                    title="Username*"
                                    variant="outlined"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="example"
                                    helperText={
                                        errors.username && touched.username ? errors.username : ""
                                    }
                                    error={errors.username && touched.username ? true : false}
                                />
                                <InputField
                                    title="Password*"
                                    required
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter your password"
                                    type="password"
                                    helperText={
                                        errors.password && touched.password ? errors.password : ""
                                    }
                                    error={errors.password && touched.password ? true : false}
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
        </Stack>
    )
}