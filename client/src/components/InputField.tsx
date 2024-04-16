import { Stack, TextField, TextFieldProps, Typography } from "@mui/material"


export interface inputFieldProps extends Omit<TextFieldProps, ""> {
    title: string
}

export default function InputField(props: inputFieldProps) {
    return (
        <Stack
            direction="column"
            spacing={1}
            sx={{ width: "100%" }}>
            <Typography sx={{

                fontSize: {
                    xs: "small",
                    md: "medium",
                },
            }}>
                {props.title}
            </Typography>
            <TextField {...props}
                fullWidth
                size="small"
                sx={{
                    m: 1,
                    pb: 1,

                }} />

        </Stack>
    )
}

