"use client"
import api from "@/core/api/api";
import colors from "@/styles/colors";
import { AddBox, AddCircleOutline, AddRounded, AddTaskRounded, UploadFile } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function HeaderButtons() {
    const router = useRouter()
    const fileInputRef: any = useRef(null);

    const handleUpload = async (e: any) => {
        const file = fileInputRef.current.files[0];
        if (!file) {
            console.error('No file selected');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('excelFile', file);
            await api.post('http://your-nest-backend-url/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };
    return (
        <>
            <Box sx={{
                position: 'absolute',
                right: "2rem",
                top: "1rem"
            }}>
                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleUpload}
                    />
                </div>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                    <Button
                        variant="outlined"
                        color="success"
                        startIcon={<AddCircleOutline color="success" />}
                        // sx={{ color: colors.black }}
                        size="large"
                        disableElevation
                        onClick={() => router.replace("/dashboard/product/create")}
                    >
                        Create
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<UploadFile />}
                        size="large"
                        disableElevation
                        onClick={handleClick}
                    >
                        Import
                    </Button>
                </Box>
            </Box>

        </>
    )
}