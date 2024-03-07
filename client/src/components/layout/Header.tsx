import colors from "@/styles/colors";
import { Search } from "@mui/icons-material";
import { Box, Button, ButtonProps, Divider, Stack, TextField, Typography } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
interface HeaderProp {
    title: string;
    button?: {
        name: string;
        props: ButtonProps
    }
}

export default function Header({
    title,
    button
}: HeaderProp) {
    return (
        <>
            <Stack mt={2} mr={4} direction={"row"} sx={{ justifyContent: "space-between" }}>
                <Box>

                    <Typography variant="h3" fontSize={{ lg: '3rem', md: "3rem", sm: "2rem", xs: "2rem" }}>
                        {title}
                    </Typography>
                    <Box
                        sx={{
                            height: "2px",

                            width: "3rem",
                            backgroundColor: colors.orange,
                        }}
                    ></Box>                </Box>

                {button ?
                    <Box display={"flex"} alignItems={"center"}>
                        <Button
                            {...button.props}
                        >
                            {button.name}
                        </Button>
                    </Box>
                    : null}
            </Stack>
        </>
    )
}