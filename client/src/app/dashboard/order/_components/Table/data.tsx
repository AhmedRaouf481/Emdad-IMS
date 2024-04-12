import { HeaderItem } from "@/components/TableView/types";


export interface DataItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  icon?: React.ReactNode;
}

export const data = [
  {
    id: "clt7diqrr21uqxyqgr00ik4fu",
    code: "CB5332-RD",
    name: "CUTTING BOARD",
    price: 3609,
    qty: 12,
    pkgCapacity: 10,
    photo: null,
    description: "CUTTING BOARD , 53X32X2 CM",
    weight: 3210,
    color: "RED",
    dimension: "53X32X2CM",
    size: null,
    material: null,
    minValue: null,
    createdAt: "2024-02-29T15:21:46.352Z",
    updatedAt: "2024-02-29T15:21:46.352Z",
    categoryId: null,
    _count: {
      items: 12,
      packages: 2
    }
  },
  {
    id: "clt7diqrp21uoxyqg2rqmy1h9",
    code: "CB5332-WH",
    name: "CUTTING BOARD",
    price: 3609,
    qty: 24,
    pkgCapacity: 10,
    photo: null,
    description: "CUTTING BOARD , 53X32X2 CM",
    weight: 3210,
    color: "WHITE",
    dimension: "53X32X2CM",
    size: null,
    material: null,
    minValue: null,
    createdAt: "2024-02-29T15:21:46.352Z",
    updatedAt: "2024-02-29T15:21:46.352Z",
    categoryId: null,
    _count: {
      items: 24,
      packages: 3
    }
  },
  {
    id: "clt7diqrr21uqxyqgr00ik4fu",
    code: "CB5332-RD",
    name: "CUTTING BOARD",
    price: 3609,
    qty: 12,
    pkgCapacity: 10,
    photo: null,
    description: "CUTTING BOARD , 53X32X2 CM",
    weight: 3210,
    color: "RED",
    dimension: "53X32X2CM",
    size: null,
    material: null,
    minValue: null,
    createdAt: "2024-02-29T15:21:46.352Z",
    updatedAt: "2024-02-29T15:21:46.352Z",
    categoryId: null,
    _count: {
      items: 12,
      packages: 2
    }
  },
  {
    id: "clt7diqrp21uoxyqg2rqmy1h9",
    code: "CB5332-WH",
    name: "CUTTING BOARD",
    price: 3609,
    qty: 24,
    pkgCapacity: 10,
    photo: null,
    description: "CUTTING BOARD , 53X32X2 CM",
    weight: 3210,
    color: "WHITE",
    dimension: "53X32X2CM",
    size: null,
    material: null,
    minValue: null,
    createdAt: "2024-02-29T15:21:46.352Z",
    updatedAt: "2024-02-29T15:21:46.352Z",
    categoryId: null,
    _count: {
      items: 24,
      packages: 3
    }
  },
  {
    id: "clt7diqrr21uqxyqgr00ik4fu",
    code: "CB5332-RD",
    name: "CUTTING BOARD",
    price: 3609,
    qty: 12,
    pkgCapacity: 10,
    photo: null,
    description: "CUTTING BOARD , 53X32X2 CM",
    weight: 3210,
    color: "RED",
    dimension: "53X32X2CM",
    size: null,
    material: null,
    minValue: null,
    createdAt: "2024-02-29T15:21:46.352Z",
    updatedAt: "2024-02-29T15:21:46.352Z",
    categoryId: null,
    _count: {
      items: 12,
      packages: 2
    }
  },
  {
    id: "clt7diqrp21uoxyqg2rqmy1h9",
    code: "CB5332-WH",
    name: "CUTTING BOARD",
    price: 3609,
    qty: 24,
    pkgCapacity: 10,
    photo: null,
    description: "CUTTING BOARD , 53X32X2 CM",
    weight: 3210,
    color: "WHITE",
    dimension: "53X32X2CM",
    size: null,
    material: null,
    minValue: null,
    createdAt: "2024-02-29T15:21:46.352Z",
    updatedAt: "2024-02-29T15:21:46.352Z",
    categoryId: null,
    _count: {
      items: 24,
      packages: 3
    }
  },
  {
    id: "clt7diqrr21uqxyqgr00ik4fu",
    code: "CB5332-RD",
    name: "CUTTING BOARD",
    price: 3609,
    qty: 12,
    pkgCapacity: 10,
    photo: null,
    description: "CUTTING BOARD , 53X32X2 CM",
    weight: 3210,
    color: "RED",
    dimension: "53X32X2CM",
    size: null,
    material: null,
    minValue: null,
    createdAt: "2024-02-29T15:21:46.352Z",
    updatedAt: "2024-02-29T15:21:46.352Z",
    categoryId: null,
    _count: {
      items: 12,
      packages: 2
    }
  },
  {
    id: "clt7diqrp21uoxyqg2rqmy1h9",
    code: "CB5332-WH",
    name: "CUTTING BOARD",
    price: 3609,
    qty: 24,
    pkgCapacity: 10,
    photo: null,
    description: "CUTTING BOARD , 53X32X2 CM",
    weight: 3210,
    color: "WHITE",
    dimension: "53X32X2CM",
    size: null,
    material: null,
    minValue: null,
    createdAt: "2024-02-29T15:21:46.352Z",
    updatedAt: "2024-02-29T15:21:46.352Z",
    categoryId: null,
    _count: {
      items: 24,
      packages: 3
    }
  },

]

export const header: HeaderItem[] = [
  {
    id: "serial",
    label: "",
    minWidth: 50,
    maxWidth: 50,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: true,
    searchable: true,
    onClick: () => { },
  },
  {
    id: "purchasingNum",
    label: "Purchasing Num",
    minWidth: 100,
    maxWidth: 100,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: true,
    searchable: true,
    onClick: () => { },
  },
  {
    id: "clientCode",
    label: "Client Code",
    minWidth: 100,
    maxWidth: 100,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: true,
    searchable: true,
    onClick: () => { },
  },
  {
    id: "clientName",
    label: "Client Name",
    minWidth: 150,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: true,
    searchable: true,
    onClick: () => { },
  },

  {
    id: "clientAddress",
    label: "Client Address",
    minWidth: 100,
    maxWidth: 100,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: true,
    searchable: true,
    onClick: () => { },
  },
  {
    id: "createdAt",
    label: "Created At",
    minWidth: 200,
    maxWidth: 200,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: true,
    searchable: true,
    onClick: () => { },
  },
  {
    id: "products",
    label: "Products",
    minWidth: 150,
    maxWidth: 150,
    tableCellProps: { align: "center", sx: { textOverflow: "inherit" } },
    sortable: true,
    filterable: true,
    searchable: true,
    isIcon: true,
    onClick: () => { },
  },
  // {
  //   id: "button",
  //   label: "Actions",
  //   minWidth: 50,
  //   maxWidth: 50,
  //   tableCellProps: { align: "center" },
  //   isIcon: true,
  //   onClick: () => { },
  // },

];
