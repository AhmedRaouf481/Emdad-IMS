import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import colors from '@/styles/colors';

export default function CustomTableTollbar({ search = "", setSearch }: { search: string, setSearch: any }) {
    return (
        <>
            <Paper
                component="div"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: {
                        lg: "30%", md: "40%", sm: "100%", xs: "100%"
                    },
                    borderBottom: `1px solid ${colors.orange}`
                }
                }
                elevation={0}
            >

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); }}
                    inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>

            </Paper>
        </>
    );
}
