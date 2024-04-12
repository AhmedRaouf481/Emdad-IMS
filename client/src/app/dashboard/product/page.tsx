"use client"

import { Autocomplete, Box, TextField } from "@mui/material";
import TableView from "../../../components/TableView/TableView";
import { header } from "./_components/Table/data";
import { useEffect, useState } from "react";
import { useGetProductsQuery } from "@/core/redux/slice/api/productsApi";
import ActionButtons from "@/app/dashboard/product/_components/Table/ButtonGroup";
import CustomizedDialog from "@/components/CustomizedDialog";
import CreateOrder from "../order/_components/CreateOrder";
import { signOut } from "next-auth/react";
import { getAllProducts } from "@/core/redux/thunk/products-thunk";
import { useAppDispatch } from "@/core/redux/hooks";
import { getAllClients } from "@/core/redux/thunk/clients-thunk";
import { removeEmptyKeys } from "@/core/utlis/removeEmptyKeys";
import CustomTableTollbar from "../../../components/TableView/CustomTableTollbar";
import { useTableContext } from "@/components/TableView/context";
import api from "@/core/api/api";


export default function Product() {
    const {
        page,
        setPage,
        rowsPerPage,
        search,
        selected,
    } = useTableContext()

    const [rowData, setRowData] = useState<any>()
    const [open, setOpen] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState<any>()


    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getAllClients())
    }, [dispatch])

    const query = {
        page: page + 1,
        limit: rowsPerPage,
        search: search,
        category: categoryFilter?.label ?? undefined
    }

    const { data, isLoading, isError, error } = useGetProductsQuery(removeEmptyKeys(query));
    console.log(isLoading);
    console.log(isError);
    console.log(error);
    if (isError) {
        // TODO: modify type for error
        if ((error as any)?.status === 401) {
            signOut()
        }
    }


    const handleOrderClick = (e: any) => {
        console.log(rowData);
        setOpen(true);

    }
    const tableData = data?.data ? data.data.map((value) => {
        return {
            ...value,
            button: <ActionButtons
                handleOrderClick={handleOrderClick}
            />
        }
    }) : []

    console.log(selected);

    const [categories, setCategories] = useState([])

    useEffect(() => {
        api.get('/product/category')
            .then((res) => setCategories(res.data))
            .catch((err) => { console.log(err) })

    }, [])

    useEffect(() => {
        if (categoryFilter) {
            setPage(0)

        }
    }, [categoryFilter])


    return (
        <>
            <Box mt={1} mr={4}>
                <Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 2,
                        width: '100%',
                    }}>

                        <CustomTableTollbar
                            numSelected={selected.length}
                            handleSelectedButtonClick={handleOrderClick}
                        />

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
                    </Box>

                    <TableView
                        data={tableData}
                        renderItem={header}
                        rowHeight="20px"
                        stickyHeader={true}
                        onRowClick={(item) => setRowData(item)}
                        total={data?.pagination.total ?? 0}
                        withCheckbox
                    />
                </Box>
            </Box>
            <CustomizedDialog open={open} setOpen={setOpen}>
                <CreateOrder data={selected} />
            </CustomizedDialog>
        </>
    );
}
