"use client";

import { Autocomplete, Box, TextField } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { AxiosError } from "axios";

import TableView from "../../../components/TableView/TableView";
import { header } from "./_components/Table/data";
import ActionButtons from "@/components/TableView/ActionButtons";
import CustomizedDialog from "@/components/CustomizedDialog";
import OrderForm from "../order/_components/OrderForm";
import HeaderButtons from "./_components/HeaderButtons";
import ProductForm from "./_components/ProductForm";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import CustomTableTollbar from "../../../components/TableView/CustomTableTollbar";

import { useGetProductsQuery } from "@/core/redux/slice/api/productsApi";
import { getAllProducts } from "@/core/redux/thunk/products-thunk";
import { useAppDispatch } from "@/core/redux/hooks";
import { getAllClients } from "@/core/redux/thunk/clients-thunk";
import { removeEmptyKeys } from "@/core/utlis/removeEmptyKeys";
import { useTableContext } from "@/components/TableView/context";
import api from "@/core/api/api";

export default function Product() {
    const {
        page,
        setPage,
        rowsPerPage,
        search,
        selected,
    } = useTableContext();

    const [rowData, setRowData] = useState<any>();
    const [openOrder, setOpenOrder] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState<any>();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllClients());
    }, [dispatch]);

    const query = {
        page: page + 1,
        limit: rowsPerPage,
        search: search,
        category: categoryFilter?.label ?? undefined,
    };

    const { data, isLoading, isError, error, refetch } = useGetProductsQuery(removeEmptyKeys(query));

    useEffect(() => {
        refetch();
    }, [openEdit, openOrder]);

    if (isError) {
        if ((error as AxiosError)?.response?.status === 401) {
            signOut();
        }
    }

    const handleOrderClick = (e: any) => {
        console.log(rowData);
        setOpenOrder(true);
    };

    const handleEditClick = (e: any) => {
        console.log(rowData);
        setOpenEdit(true);
    };

    const handleDeleteClick = (e: any) => {
        setConfirmationOpen(true);
    };

    const tableData = data?.data
        ? data.data.map((value) => {
            return {
                ...value,
                buttons: (
                    <ActionButtons
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                    />
                ),
            };
        })
        : [];

    console.log(selected);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.get("/product/category")
            .then((res) => setCategories(res.data))
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (categoryFilter) {
            setPage(0);
        }
    }, [categoryFilter]);

    const handleEditSubmit = (values: any) => {
        const {
            code,
            name,
            color,
            size,
            material,
            description,
            dimension,
            pkgCapacity,
            weight,
            price,
            qty,
            minValue,
        } = values;

        api.patch(`product/${values.id}`, {
            code,
            name,
            color,
            size,
            material,
            description,
            dimension,
            qty: qty ? +qty : undefined,
            pkgCapacity: pkgCapacity ? +pkgCapacity : undefined,
            minValue: minValue ? +minValue : undefined,
            weight: weight ? +weight : undefined,
            price: price ? +price : undefined,
        })
            .then((res) => {
                console.log(res);
                setOpenEdit(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDeleteConfirm = () => {
        api.delete(`product/${rowData.id}`)
            .then(() => {
                setConfirmationOpen(false);
                refetch();
            })
            .catch((err) => {
                console.log(err);
                setConfirmationOpen(false);
                refetch();
            });
    };

    return (
        <>
            <HeaderButtons refetch={refetch} />
            <Box mt={1} mr={4}>
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 2,
                            width: "100%",
                        }}
                    >
                        <CustomTableTollbar
                            numSelected={selected.length}
                            handleSelectedButtonClick={handleOrderClick}
                        />

                        <Autocomplete
                            size="small"
                            sx={{
                                width: {
                                    lg: "30%",
                                    md: "40%",
                                    xs: "100%",
                                },
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name="products"
                                    placeholder="Product"
                                    variant="standard"
                                />
                            )}
                            options={
                                categories.map((value: { name: string; id: string }) => ({
                                    label: value.name.toLowerCase(),
                                    id: value.id,
                                })) ?? []
                            }
                            value={categoryFilter}
                            onChange={(e, value) => {
                                setCategoryFilter(value);
                            }}
                        />
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
            <CustomizedDialog open={openOrder} setOpen={setOpenOrder}>
                <OrderForm data={selected} setOpenOrder={setOpenOrder} />
            </CustomizedDialog>
            <CustomizedDialog
                open={openEdit}
                setOpen={setOpenEdit}
                title="Edit Product"
            >
                <ProductForm
                    handleSubmit={handleEditSubmit}
                    formIntialValues={rowData}
                />
            </CustomizedDialog>
            <ConfirmationDialog
                open={confirmationOpen}
                setOpen={setConfirmationOpen}
                title="Delete Product!"
                contentMessage="Are you sure you want to delete this product?"
                confirmFunction={handleDeleteConfirm}
            />
        </>
    );
}
