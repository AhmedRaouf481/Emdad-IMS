"use client"
import { useAlert } from "@/components/Alert/AlertContext";
import api from "@/core/api/api";
import colors from "@/styles/colors";
import { AddBox, AddCircleOutline, AddRounded, AddTaskRounded, UploadFile } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function HeaderButtons({refetch}:{refetch:any}) {
    const router = useRouter()
    const fileInputRef: any = useRef(null);

    const { showAlert } = useAlert();

    const handleUpload = async (e: any) => {
        const file = fileInputRef.current.files[0];
        if (!file) {
            console.error('No file selected');
            return;
        }
        const formData = new FormData();
            formData.append('file', file);
            api.post('product/import-data', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{
                refetch()
                console.log('File uploaded successfully!');
                console.log(res)
            })
         .catch( (error)=> {
            showAlert(error.response.data.message,"error")
            console.error('Error uploading file:', error);
        })
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