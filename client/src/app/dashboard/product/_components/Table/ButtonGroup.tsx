import { Box, IconButton } from '@mui/material';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import { DeleteRounded, EditRounded } from '@mui/icons-material';

interface ActionButtonsProps {
    handleEditClick: any
}

export default function ActionButtons(
    { handleEditClick }: ActionButtonsProps
) {
    return (
        <Box >
            <IconButton color='success' aria-label='Edit' title='Edit' onClick={handleEditClick}>
                <EditRounded />
            </IconButton>
            <IconButton color='error' aria-label='Delete' title='Delete'>
                <DeleteRounded />
            </IconButton>
        </Box>
    );
}