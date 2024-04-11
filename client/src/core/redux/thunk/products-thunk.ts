import api from "@/core/api/api"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getAllProducts = createAsyncThunk(
    'products/getAllProducts',
    async (_data, thunkApi) => {
        const { rejectWithValue } = thunkApi;

        try {
            const response = await api.get("/product/all")
            return response.data
        } catch (error) {
            console.log('Error:', error);
            return rejectWithValue(error);
        }
    },
)