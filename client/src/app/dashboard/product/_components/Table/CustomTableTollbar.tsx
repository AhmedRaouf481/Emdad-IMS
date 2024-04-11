import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import colors from '@/styles/colors';
import { Autocomplete, AutocompleteRenderInputParams, Box, TextField } from '@mui/material';
import SelectField from '@/components/SelectField';
import api from '@/core/api/api';
import { useEffect, useState } from 'react';
import EnhancedTableToolbar from './CheckToolbar';

interface CustomTableTollbarProps {
    search: string
    width: string
    setSearch: any
    categoryFilter: {}
    setCategoryFilter: any
    numSelected: number;
    handleSelectedButtonClick: (e: any) => void;
}
export default function CustomTableTollbar({ search = "",
    setSearch,
    width,
    categoryFilter,
    setCategoryFilter, numSelected, handleSelectedButtonClick }: CustomTableTollbarProps) {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        api.get('/product/category')
            .then((res) => setCategories(res.data))
            .catch((err) => { console.log(err) })

    }, [])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "end",
                gap: 2,
                mb: 2,
                width: width,
            }}
        >

            <Autocomplete
                size='small'

                sx={{
                    width: {
                        lg: "30%", md: "40%", xs: "100%"
                    },

                }}
                renderInput={(params) => (
                    <TextField {...params} name="products" placeholder="Product" variant='standard' />
                )}
                options={
                    categories.map((value: { name: string, id: string }) => ({
                        label: value.name.toLowerCase(),
                        id: value.id
                    })) ?? []
                }
                value={categoryFilter}
                onChange={(e, value) => {
                    setCategoryFilter(value);
                }} />
            <Paper
                component="div"
                sx={{
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    width: {
                        lg: "40%", md: "40%", sm: "100%", xs: "100%"
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
            <EnhancedTableToolbar
                numSelected={numSelected}
                handleSelectedButtonClick={handleSelectedButtonClick}
                sx={{
                    width: "50%"
                }} />
        </Box>
    );
}
