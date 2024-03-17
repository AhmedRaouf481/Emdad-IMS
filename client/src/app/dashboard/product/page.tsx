"use client"

import { Box } from "@mui/material";
import TableView from "./_components/Table/TableView";
import { header } from "./_components/Table/data";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useGetProductsQuery } from "@/core/redux/slice/api";
import ActionButtons from "@/app/dashboard/product/_components/Table/ButtonGroup";
import CustomizedDialog from "@/components/CustomizedDialog";
import CreateOrder from "../order/_components/CreateOrder";

const removeEmptyKeys = (object: Record<string, any>) => {
    Object.keys(object).forEach(key => {
        if (object[key] == null || object[key] === "") {
            delete object[key];
        }
    })
    return object
}

export default function Product() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState<string>("");
    const [categoryFilter, setCategoryFilter] = useState<any>()
    const [open, setOpen] = useState(false);
    const [rowData, setRowData] = useState<any>()

    const orderFormRef = useRef(null)

    const query = {
        page: page + 1,
        limit: rowsPerPage,
        search: searchValue,
        category: categoryFilter?.label ?? undefined
    }
    console.log(orderFormRef.current);
    const handleOrderClick = (e: any) => {
        console.log(rowData);
        setOpen(true);

    }
    const { data, isLoading, isError, error } = useGetProductsQuery(removeEmptyKeys(query));
    console.log(isLoading);
    console.log(isError);
    console.log(error);

    const tableData = data?.data ? data.data.map((value) => {
        return {
            ...value,
            button: <ActionButtons
                handleOrderClick={handleOrderClick}
            />
        }
    }) : []

    return (
        <>
            <Box mt={1} mr={4}>
                <TableView
                    data={tableData}
                    renderItem={header}
                    rowHeight="20px"
                    stickyHeader={true}
                    onRowClick={(item) => setRowData(item)}
                    setPage={setPage}
                    setRowsPerPage={setRowsPerPage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    total={data?.pagination.total ?? 0}
                    search={searchValue}
                    setSearch={setSearchValue}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                />
            </Box>
            <CustomizedDialog open={open} setOpen={setOpen}>
                <CreateOrder data={rowData} />
            </CustomizedDialog>
        </>
    );
}
