import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, SxProps } from '@mui/material';


interface EnhancedTableToolbarProps {
    numSelected: number;
    handleSelectedButtonClick: (e: any) => void;
    sx?: SxProps
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected, handleSelectedButtonClick } = props;

    return (
        <Toolbar
            sx={{
                // pl: { sm: 2 },
                // pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
                ...props.sx
            }}

            variant='dense'
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >

                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Make Order">
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        sx={{
                            width: "40%"
                        }}
                        onClick={handleSelectedButtonClick}
                    >
                        Make Order
                    </Button>
                </Tooltip>
            ) : null}
        </Toolbar>
    );
}