"use client"

import { Box, Button } from "@mui/material";
import TableView from "./_components/TableView";
import { header } from "./_components/data";
import api from "@/core/api/api";
import { useEffect, useState } from "react";
import { useGetProductsQuery } from "@/core/redux/slice/api";

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

    return (
        <>
            <Box mt={1} mr={4}>
                <TableView
                    data={data?.data ?? []}
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
