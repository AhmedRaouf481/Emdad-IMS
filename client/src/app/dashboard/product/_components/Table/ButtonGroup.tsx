import { Box, IconButton } from '@mui/material';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import { DeleteRounded, EditRounded } from '@mui/icons-material';

export default function BasicButtonGroup() {
    return (
        <Box >

            <IconButton color='info'>
                <AssignmentRoundedIcon />
            </IconButton>

            <IconButton color='success'>
                <EditRounded />
            </IconButton>
            <IconButton color='error'>
                <DeleteRounded />
            </IconButton>
        </Box>
    );
}