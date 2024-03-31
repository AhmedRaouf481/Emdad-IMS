import { Box, IconButton } from '@mui/material';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import { DeleteRounded, EditRounded } from '@mui/icons-material';

interface ActionButtonsProps {
    handleOrderClick: any
}

export default function ActionButtons(
    { handleOrderClick }: ActionButtonsProps
) {
    return (
        <Box >
            {/* 
            <IconButton color='info' aria-label='Order' title='Order'
                onClick={handleOrderClick}>
                <AssignmentRoundedIcon />
            </IconButton> */}

            <IconButton color='success' aria-label='Edit' title='Edit'>
                <EditRounded />
            </IconButton>
            <IconButton color='error' aria-label='Delete' title='Delete'>
                <DeleteRounded />
            </IconButton>
        </Box>
    );
}