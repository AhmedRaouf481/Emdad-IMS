import api from "@/core/api/api"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getAllClients = createAsyncThunk(
    'products/getAllClients',
    async (_data, thunkApi) => {
        const { rejectWithValue } = thunkApi;

        try {
            const response = await api.get("/client")
            console.log(response)
            return response.data
        } catch (error) {
            console.log('Error:', error);
            return rejectWithValue(error);
        }
    },
)