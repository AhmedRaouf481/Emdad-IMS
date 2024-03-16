"use client"
import { API_BASE_URL } from "@/core/api/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ListResponse {
    pagination: {
        limit: number
        current: number
        pages: number
        total: number
    }
    data: any[]
}
type ListAllResponse = any[]

export const productsAPI = createApi({
    reducerPath: "productsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<ListResponse, { page?: number, limit?: number, search?: string, category?: string }>({
            query: ({ page, limit, search, category }) => ({
                url: `product`,
                params: { page, limit, search, category }
            }),
        }),
        getAllProducts: builder.query<ListAllResponse, any>({
            query: () => ({
                url: `product/all`,
            }),
        }),

        getAllClients: builder.query<any[], any>({
            query: () => ({
                url: `client`,
            }),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetAllProductsQuery,
    useGetAllClientsQuery } = productsAPI;