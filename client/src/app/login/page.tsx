"use client"
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup"
import InputField from "@/components/InputField";
import colors from "@/styles/colors";

const loginSchema = new Yup.ObjectSchema({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required")
})

export default function Login() {
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
                        email: "",
                        password: ""

                    }}
                    validationSchema={loginSchema}
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
                        <Box component="form" onSubmit={handleSubmit}>
                            <Stack direction={"column"} gap={2}>
                                <InputField
                                    required
                                    title="Email*"
                                    variant="outlined"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="example@gmail.com"
                                    helperText={
                                        errors.email && touched.email ? errors.email : ""
                                    }
                                    error={errors.email && touched.email ? true : false}
                                />
                                <InputField
                                    title="Password*"
                                    required
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter your password"
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