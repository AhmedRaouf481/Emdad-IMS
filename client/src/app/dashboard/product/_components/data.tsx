import AccessibleIcon from "@mui/icons-material/Accessible";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import DescriptionIcon from "@mui/icons-material/Description";
import { HeaderItem } from "./TableView";
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
    id: "code",
    label: "Code",
    minWidth: 50,
    maxWidth: 50,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: true,
    searchable: true,
    onClick: () => { },
  },
  {
    id: "name",
    label: "Name",
    minWidth: 100,
    maxWidth: 100,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: true,
    searchable: true,
    onClick: () => { },
  },
  {
    id: "description",
    label: "Description",
    minWidth: 200,
    maxWidth: 200,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: true,
    searchable: true,
    onClick: () => { },
  },
  {
    id: "qty",
    label: "Quantity",
    minWidth: 100,
    maxWidth: 100,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: true,
    searchable: true,
    onClick: () => { },
  },
  {
    id: "price",
    label: "Cost Price ($)",
    minWidth: 100,
    maxWidth: 100,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: true,
    searchable: true,
    onClick: () => { },
  },
  {
    id: "_count",
    label: "packages",
    minWidth: 100,
    maxWidth: 100,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: true,
    searchable: true,
    onClick: () => { },
  },

];
