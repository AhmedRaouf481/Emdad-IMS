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
    IconButton,
    Toolbar,
    Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";
import CustomTableTollbar from "./CustomTableTollbar";
import React from "react";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import colors from "@/styles/colors";
import { Delete, FilterList } from "@mui/icons-material";
import { alpha } from '@mui/material/styles';
import EnhancedTableToolbar from "./CheckToolbar";
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
    data: any[];
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
    selected: string[]
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    rowsPerPage: number
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
    categoryFilter: {}
    setCategoryFilter: React.Dispatch<React.SetStateAction<{}>>
    total: number
    handleSelectedButtonClick: (e: Event) => void
}

export default function TableView({
    data,
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
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    total,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    selected,
    setSelected,
    handleSelectedButtonClick
}: Props) {

    // const [page, setPage] = useState(0);


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


    // TODO
    //* ----------------------- Handle Sorting
    const [sortedColumn, setSortedColumn] =
        useState<SortedColumn>(initSortedColumn);

    useEffect(() => {
        console.log(sortedColumn);
    }, [sortedColumn]);

    //* ----------------------- Handle Searching
    const [searchValue, setSearchValue] = useState<string>("");
    useEffect(() => {
        if (searchValue.length >= 2) {
            setSearch(searchValue)
            setPage(0)
        }
        if (searchValue === "") {
            setSearch(searchValue)
        }
        if (categoryFilter) {
            setPage(0)

        }
    }, [searchValue, categoryFilter]);


    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = data.map((n: any) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };


    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
                width: width,
                height: height,
                ...sx,
            }}
        >
            <CustomTableTollbar
                search={searchValue}
                setSearch={setSearchValue}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                width={width}
                numSelected={selected.length}
                handleSelectedButtonClick={handleSelectedButtonClick}
            />
            <TableContainer
                component={Paper}
                sx={{
                    width: width,
                    height: "100%",
                }}
                elevation={0}
            >

                {/* <EnhancedTableToolbar
                    numSelected={selected.length}
                    handleSelectedButtonClick={handleSelectedButtonClick}
                /> */}

                <Table stickyHeader={stickyHeader} size="small" aria-label="sticky table" >
                    <TableHead>

                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    indeterminate={selected.length > 0 && selected.length < data.length}
                                    checked={data.length > 0 && selected.length === data.length}
                                    onChange={handleSelectAllClick}
                                    inputProps={{
                                        'aria-label': 'select all desserts',
                                    }}
                                />
                            </TableCell>
                            {renderItem.map((item) => (
                                <TableCell
                                    key={item.id}
                                    {...item.tableCellProps}
                                    sx={{
                                        maxHeight: "20px",

                                    }}
                                >
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <Typography
                                            variant="subtitle1"
                                        >
                                            {item.component ? item.component : item.label}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(data ?? []).map((item: any, index: number) => {
                            const isItemSelected = isSelected(item.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    key={(item as any).id}
                                    onClick={(e) => onRowClick && onRowClick(item)}
                                    hover={hover}
                                    sx={{
                                        backgroundColor:
                                            "white",
                                        "&:hover": {
                                            backgroundColor: "#f0f0f0",
                                        },
                                    }}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            onClick={(e) => {
                                                handleClick(e, (item as any).id)
                                            }}
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                    </TableCell>
                                    {renderItem.map((headerItem) =>
                                        headerItem.isIcon ? (
                                            <TableCell
                                                key={headerItem.id}
                                                {...headerItem.tableCellProps}
                                                sx={{
                                                    // minWidth: headerItem.minWidth,
                                                    // maxWidth: headerItem.maxWidth,
                                                    // height: rowHeight,
                                                }}
                                            >
                                                {/* <Box
                                                sx={{
                                                    height: rowHeight,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            > */}
                                                {(item as any)[headerItem.id]}
                                                {/* </Box> */}
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
                            )
                        })}
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
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    count={total ?? 0}
                    page={page}
                    rowsPerPageOptions={[5, 10, 25, 100]}
                />
            </Box>
        </Box >
    );
}
