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
export const productsAPI = createApi({
    reducerPath: "productsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<ListResponse, { page?: number, limit?: number, search?: string }>({
            query: ({ page, limit, search }) => ({
                url: `product`,
                params: { page, limit, search }
            }),
        }),
    }),
});

export const { useGetProductsQuery } = productsAPI;