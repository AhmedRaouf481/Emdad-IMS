"use client"
import CustomTableTollbar from "@/components/TableView/CustomTableTollbar";
import { Autocomplete, Box, Button, Stack, TextField, Typography } from "@mui/material";
import TableView from "../../../components/TableView/TableView";
import { useEffect, useState } from "react";
import { productsAPI, useGetProductsQuery } from "@/core/redux/slice/api/productsApi";
import ActionButtons from "@/components/TableView/ActionButtons";
import CustomizedDialog from "@/components/CustomizedDialog";
import CreateOrder from "./_components/OrderForm";
import { signOut } from "next-auth/react";
import { getAllProducts } from "@/core/redux/thunk/products-thunk";
import { useAppDispatch } from "@/core/redux/hooks";
import { getAllClients } from "@/core/redux/thunk/clients-thunk";
import { removeEmptyKeys } from "@/core/utlis/removeEmptyKeys";
import { useTableContext } from "@/components/TableView/context";
import api from "@/core/api/api";
import { header } from "../order/_components/Table/data";
import { useGetAllOrdersQuery, useGetOrdersQuery } from "@/core/redux/slice/api/orderApi";
import TitleSeparator from "@/components/TitleSeparator";
import colors from "@/styles/colors";


export default function Order() {

    const {
        page,
        setPage,
        rowsPerPage,
        search,
        selected,
    } = useTableContext()

    const [open, setOpen] = useState(false);
    const [orderProducts, setOrderProducts] = useState<Array<Record<string, any>>>()



    const query = {
        page: page + 1,
        limit: rowsPerPage,
        search: search,
    }

    const { data, isLoading, isError, error } = useGetOrdersQuery(removeEmptyKeys(query));
    // console.log(isLoading);
    // console.log(isError);
    // console.log(error);
    if (isError) {
        // TODO: modify type for error
        if ((error as any)?.status === 401) {
            signOut()
        }
    }
    console.log(data);

    const handleEditClick = (e: any) => {
        // console.log(rowData);
        // setOpenEdit(true);

    }


    const tableData: any[] = data?.data.map((v) => ({
        serial: v.serial,
        purchasingNum: v.purchasingNum,
        createdAt: new Date(v.createdAt).toLocaleString(),
        clientName: v.client.name,
        clientCode: v.client.code,
        clientAddress: v.client.address,
        products: <Button
            variant="outlined"
            size="small"
            color="secondary"
            style={{ textTransform: "none" }}
            onClick={() => {
                setOrderProducts(v.products)
                setOpen(true);

            }}
        >Products</Button>,
        buttons: <ActionButtons
            handleEditClick={handleEditClick}
        />
    })) ?? []
    // let data: any;



    return (
        <>
            <Box mt={1} mr={4}>
                <Box>


                    <CustomTableTollbar
                        numSelected={selected.length}
                    />

                    <TableView
                        data={tableData}
                        renderItem={header}
                        rowHeight="20px"
                        stickyHeader={true}
                        // onRowClick={(item) => setRowData(item)}
                        total={data?.pagination.total ?? 0}
                    />
                </Box>
            </Box>
            <CustomizedDialog open={open} setOpen={setOpen} >
                <>
                    <Stack direction="column" p={1}>
                        {orderProducts?.map((product, index) => (
                            <Box
                                key={index}
                            >


                                <Box py={1}>

                                    <Typography variant="h6">
                                        {product.product.name}:
                                    </Typography>
                                    <TitleSeparator color={colors.green} />
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Typography variant="subtitle1">
                                        Code:
                                    </Typography>
                                    <Typography variant="body1">
                                        {product.product.code}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Typography variant="subtitle1">
                                        Color:
                                    </Typography>
                                    <Typography variant="body1">
                                        {product.product.color}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between"

                                    }}
                                >
                                    <Typography variant="subtitle1">
                                        Quantity:
                                    </Typography>
                                    <Typography variant="body1">
                                        {product.qty}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Typography variant="subtitle1">
                                        Piece Price:
                                    </Typography>
                                    <Typography variant="body1">
                                        {product.product.price}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Typography variant="subtitle1">
                                        Total Price:
                                    </Typography>
                                    <Typography variant="body1">
                                        {product.product.price * product.qty}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}

                    </Stack>
                </>
            </CustomizedDialog>
        </>
    )
}
