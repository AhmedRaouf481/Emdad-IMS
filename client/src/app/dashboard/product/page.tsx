"use client"

import { Box } from "@mui/material";
import TableView from "./_components/Table/TableView";
import { header } from "./_components/Table/data";
import { useState } from "react";
import { useGetProductsQuery } from "@/core/redux/slice/api";
import BasicButtonGroup from "@/app/dashboard/product/_components/Table/ButtonGroup";

export default function Product() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState<string>("");

    const { data, isLoading, isError } = useGetProductsQuery({
        page: page + 1,
        limit: rowsPerPage,
        search: searchValue
    })
    console.log(isLoading);
    console.log(isError);
    const tableData = data?.data ? data.data.map((value) => {
        return {
            ...value,
            button: <BasicButtonGroup />
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
                    onRowClick={(item) => console.log(item)}
                    setPage={setPage}
                    setRowsPerPage={setRowsPerPage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    total={data?.pagination.total ?? 0}
                    search={searchValue}
                    setSearch={setSearchValue}
                />
            </Box>
        </>
    );
}
