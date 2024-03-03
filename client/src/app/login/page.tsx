"use client"
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup"
import InputField from "@/components/InputField";
import colors from "@/styles/colors";
import { useEffect, useState } from "react";
import api from "@/core/api/api";
import { redirect } from "next/navigation";

interface LoginData {
    username: string
    password: string
}

const loginSchema = new Yup.ObjectSchema({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
})

export default function Login() {
    const [data, setData] = useState<LoginData>()
    useEffect(() => {
        api.post('/user/login', data)
            .then((res) => {
                console.log(res)
                localStorage.setItem("token", res.data.token)
                redirect('/dashboard')
            })
            .catch((err) => {
                console.log(err)
            })
    }, [data])
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
                    onSubmit={(values) => { setData(values); console.log(values) }}
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
                        </Box>
                    )}

                </Formik>
            </Box>
        </Stack>
    )
}