"use client"
import { API_BASE_URL } from "@/core/api/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

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
        prepareHeaders: async (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const session = await getSession()
            if (session) {
                headers.set('authorization', `Bearer ${session.token}`)
            }
            return headers
        },
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
    }),
});

export const {
    useGetProductsQuery,
    useGetAllProductsQuery
} = productsAPI;