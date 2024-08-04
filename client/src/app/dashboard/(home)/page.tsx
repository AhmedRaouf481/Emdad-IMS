"use client";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CardView from "../product/_components/CardView";
import { BiDollar } from "react-icons/bi";
import Header from "@/components/layout/Header";
import * as React from "react";
import Paper from "@mui/material/Paper";
import { PieChart } from "@mui/x-charts/PieChart";
import { TableProvider } from "@/components/TableView/context";
import TableView from "@/components/TableView/TableView";

export function BasicPie() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: "series A" },
            { id: 1, value: 15, label: "series B" },
            { id: 2, value: 20, label: "series C" },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}

export const header = [
  {
    id: "code",
    label: "Code",
    minWidth: 150,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: true,
    searchable: true,
    onClick: () => {},
  },
  {
    id: "name",
    label: "Name",
    minWidth: 200,
    maxWidth: 200,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: true,
    searchable: true,
    onClick: () => {},
  },
  {
    id: "color",
    label: "Color",
    minWidth: 100,
    maxWidth: 100,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: true,
    searchable: true,
    onClick: () => {},
  },
  {
    id: "qty",
    label: "Qty",
    minWidth: 50,
    maxWidth: 50,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: true,
    searchable: true,
    onClick: () => {},
  },
  {
    id: "buttons",
    label: "",
    minWidth: 30,
    maxWidth: 30,
    tableCellProps: { align: "center" },
    isIcon: true,
    onClick: () => {},
  },
];
export function DisplayTable({ data }: any) {
  return (
    <TableProvider>
      <TableView
        data={data}
        renderItem={header}
        rowHeight="20px"
        height="100%"
        stickyHeader={true}
      />
    </TableProvider>
  );
}

export default function Home() {
  const data = [
    {
      id: "1",
      code: "A001",
      name: "Product 1",
      color: "Red",
      qty: 100,
    },
    {
      id: "2",
      code: "A002",
      name: "Product 2",
      color: "Blue",
      qty: 200,
    },
    {
      id: "3",
      code: "A003",
      name: "Product 3",
      color: "Green",
      qty: 150,
    },
    {
      id: "4",
      code: "A004",
      name: "Product 4",
      color: "Yellow",
      qty: 300,
    },
    {
      id: "5",
      code: "A005",
      name: "Product 5",
      color: "Black",
      qty: 250,
    },
  ];
  return (
    <>
      <Header title="Dashboard" />
      <Stack mt={1} spacing={2} direction={"row"} flexWrap={"wrap"}>
        <Paper variant="outlined">
          <DisplayTable data={data} />
        </Paper>
        <Paper variant="outlined">
          <BasicPie />
        </Paper>
      </Stack>
    </>
  );
}
