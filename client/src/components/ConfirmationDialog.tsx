import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
    Breakpoint,
    Button,
    DialogActions,
    DialogTitle,
    Typography,
} from "@mui/material";



const CustomDialog = styled(Dialog)({
    '& .MuiDialog-paper': {
        borderRadius: '12px',
        padding: '20px',
    },
});

const ConfirmButton = styled(Button)({
    backgroundColor: '#d32f2f',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#b71c1c',
    },
});

const CancelButton = styled(Button)({
    backgroundColor: '#9e9e9e',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#616161',
    },
});

export default function ConfirmationDialog({
    open,
    setOpen,
    maxWidth,
    title,
    contentMessage,
    confirmFunction
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    maxWidth?: false | Breakpoint;
    title: string;
    contentMessage: string;
    confirmFunction: () => void;
}) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <CustomDialog open={open} onClose={handleClose}>
            <DialogTitle>
                <Typography variant="h6" fontWeight="bold">
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1">{contentMessage}</Typography>
            </DialogContent>
            <DialogActions>
                <CancelButton onClick={handleClose} variant="contained">
                    Cancel
                </CancelButton>
                <ConfirmButton onClick={confirmFunction} variant="contained">
                    Confirm
                </ConfirmButton>
            </DialogActions>
        </CustomDialog>
    );
}
