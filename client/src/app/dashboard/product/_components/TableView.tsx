"use client"

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    SxProps,
    Box,
    Typography,
    Tooltip,
    TablePagination,
    TableCellProps,
} from "@mui/material";
import { useEffect, useState } from "react";
import { BiPackage } from "react-icons/bi";
import CustomTableTollbar from "./CustomTableTollbar";
import React from "react";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import colors from "@/styles/colors";
import { useGetProductsQuery } from "@/core/redux/slice/api";
// import { SortedColumn } from ".";

export interface HeaderItem {
    id: string;
    label: string;
    minWidth?: number;
    maxWidth?: number;
    tableCellProps?: TableCellProps;
    format?: (value: number) => string;
    onClick?: () => void;
    isIcon?: boolean;
    component?: React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
    searchable?: boolean;
}

export interface SortedColumn {
    id: string;
    isAscending: boolean;
}
interface SortProps {
    columnId: string;
    setSortedColumn: (sortableColumn: SortedColumn) => void;
    sortableColumn: SortedColumn;
}
const CustomColumnSort = ({
    columnId,
    setSortedColumn,
    sortableColumn,
}: SortProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                position: "relative",
                cursor: "pointer",
                marginX: "0.5rem",
                opacity: `${sortableColumn.id === columnId ? "1" : "0.2"}`,
                transition: "0.2s",
                transform: `rotate(${sortableColumn.isAscending && sortableColumn.id === columnId
                    ? 0
                    : -180
                    }deg)`,
                transformOrigin: "50% 50%",
                "&:hover": {
                    opacity: `${sortableColumn.id === columnId ? "1" : "0.7"}`,
                },
            }}
            onClick={() => {
                setSortedColumn({
                    id: columnId,
                    isAscending:
                        sortableColumn.id === columnId ? !sortableColumn.isAscending : true,
                });
            }}
        >
            <ArrowUpwardRoundedIcon />
        </Box>
    );
};

// export default CustomColumnSort;

interface Props {
    data?: any[];
    renderItem: HeaderItem[];
    width?: string;
    height?: string;
    boxShadow?: number;
    stickyHeader?: boolean;
    sx?: SxProps;
    onRowClick?: (item?: any) => void;
    hover?: boolean;
    variantBackground?: boolean;
    rowHeight?: string;
    initSortedColumn?: SortedColumn;
}

export default function TableView({
    // data,
    renderItem,
    width = "100%",
    height = "80vh",
    boxShadow = 10,
    stickyHeader = false,
    sx,
    onRowClick,
    hover = true,
    variantBackground = true,
    rowHeight = "1rem",
    initSortedColumn = { id: renderItem[0].id, isAscending: true },
}: Props) {

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { data, isLoading, isError } = useGetProductsQuery({ page: page, limit: limit })
    console.log(isLoading);
    console.log(isError);

    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const [filterdData, setFilterddData] = useState<any>([
    //     ...data,
    //     ...data,
    //     ...data,
    //     ...data,
    // ]);
    //* ----------------------- Handle Sorting
    const [sortedColumn, setSortedColumn] =
        useState<SortedColumn>(initSortedColumn);

    useEffect(() => {
        console.log(sortedColumn);
    }, [sortedColumn]);

    //* ----------------------- Handle Searching
    const [searchValue, setSearchValue] = useState<string>("");
    useEffect(() => {
        console.log(searchValue);
    }, [searchValue]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: width,
                height: height,
                ...sx,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    mb: 2,
                    width: width,
                }}
            >
                <CustomTableTollbar

                />
            </Box>

            <TableContainer
                component={Paper}
                sx={{
                    width: width,
                    height: "100%",
                }}
                elevation={0}
            >
                <Table stickyHeader={stickyHeader} aria-label="sticky table" >
                    <TableHead>
                        <TableRow>
                            {renderItem.map((item) => (
                                <TableCell
                                    key={item.id}
                                    {...item.tableCellProps}
                                    sx={{
                                        // minWidth: item.minWidth,
                                        // bgcolor: "#f6f2fa",
                                        maxHeight: "20px",

                                    }}
                                >
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <Typography
                                            variant="subtitle1"
                                        >
                                            {item.component ? item.component : item.label}
                                        </Typography>
                                        {/* {item.sortable ? (
                                            <CustomColumnSort
                                                columnId={item.id}
                                                setSortedColumn={setSortedColumn}
                                                sortableColumn={sortedColumn}
                                            />
                                        ) : null} */}
                                    </Box>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(data?.data ?? []).map((item: any, index: number) => (
                            <TableRow
                                key={(item as any).id}
                                onClick={() => onRowClick && onRowClick(item)}
                                hover={hover}
                                sx={{
                                    backgroundColor:
                                        "white",
                                    "&:hover": {
                                        backgroundColor: "#f0f0f0",
                                    },
                                }}
                            >
                                {renderItem.map((headerItem) =>
                                    headerItem.isIcon ? (
                                        <TableCell
                                            key={headerItem.id}
                                            {...headerItem.tableCellProps}
                                            sx={{
                                                minWidth: headerItem.minWidth,
                                                maxWidth: headerItem.maxWidth,
                                                height: rowHeight,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    height: rowHeight,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {(item as any)["icon"]}
                                            </Box>
                                        </TableCell>
                                    ) : (
                                        <TableCell
                                            key={headerItem.id}
                                            {...headerItem.tableCellProps}
                                            sx={{
                                                minWidth: headerItem.minWidth,
                                                maxWidth: headerItem.maxWidth,
                                                height: rowHeight,
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            <Tooltip
                                                enterDelay={1000}
                                                title={(item as any)[headerItem.id]}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: "0.8rem",
                                                        textAlign: "center", // Center the text horizontally
                                                        lineHeight: rowHeight, // Center the text vertically
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        display: "inline-block", // Ensure ellipsis works properly
                                                        maxWidth: "100%", // Ensure text doesn't overflow TableCell
                                                    }}
                                                >
                                                    {(item as any)[headerItem.id]}
                                                </Typography>
                                            </Tooltip>
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                sx={{
                    width: width,
                }}
            >
                <TablePagination
                    component="div"
                    // count={100}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    count={data?.pagination.total as number}
                    page={page}
                    rowsPerPageOptions={[5, 10, 25, 100]}
                />
            </Box>
        </Box >
    );
}
