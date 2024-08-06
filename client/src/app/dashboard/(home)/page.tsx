"use client";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import CardView from "../product/_components/CardView";
import Grid from '@mui/material/Unstable_Grid2';
import Header from "@/components/layout/Header";
import * as React from "react";
import Paper from "@mui/material/Paper";
import { PieChart } from "@mui/x-charts/PieChart";
import { TableProvider } from "@/components/TableView/context";
import TableView from "@/components/TableView/TableView";
import DashboardPaper from "./_components/DashboardPaper";

export function BasicPie() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10,color: "#cdf9fe" },
            { id: 1, value: 15,color:"#fecdfe" },
            { id: 2, value: 20, color:"#cde5fe"},
            { id: 3, value: 20,color:"#f9d406" },
          ],
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 0,
          cornerRadius: 5,
          startAngle: -180,
          endAngle: 180,
          cx: 150,
          cy: 150,
        },
      ]}
      width={300}
      height={270}
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
    onClick: () => { },
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
    onClick: () => { },
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
    onClick: () => { },
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
    onClick: () => { },
  },
  {
    id: "buttons",
    label: "",
    minWidth: 30,
    maxWidth: 30,
    tableCellProps: { align: "center" },
    isIcon: true,
    onClick: () => { },
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
      {/* <Header title="Dashboard" /> */}
      <Box sx={{ width: '100%', mt: 4 , pr: 2 }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          <Grid xs={8}>
            <DashboardPaper title="Recent Orders" subTitle="Last month">
              <DisplayTable data={data} />
            </DashboardPaper>
          </Grid>
          <Grid xs={4}>
            <DashboardPaper title="Top 5 Products">
              <BasicPie />
            </DashboardPaper>
          </Grid>
          <Grid xs={8}>
            <DashboardPaper title="Stocks" subTitle="14 days or less">
              <DisplayTable data={data} />
            </DashboardPaper>
          </Grid>
          <Grid xs={4}>
            <DashboardPaper title="Expired soon" subTitle="14 days or less">
              <DisplayTable data={data} />
            </DashboardPaper>
          </Grid>
        </Grid>
      </Box>

    </>
  )
}
