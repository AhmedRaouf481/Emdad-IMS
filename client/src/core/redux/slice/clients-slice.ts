import { createSlice } from '@reduxjs/toolkit'
import { getAllClients } from '../thunk/clients-thunk'

export interface Client {
    id?: string;
    code?: string;
    name?: string;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
// Define a type for the slice state
export interface ClientState {
    currentClient: Client
    clients: Client[]
    loading: boolean
    error: string
}

// Define the initial state using that type
const initialState: ClientState = {
    clients: [],
    currentClient: {},
    loading: false,
    error: "",
}

export const clientSlice = createSlice({
    name: 'product',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //* Get all Clients
        builder
            .addCase(getAllClients.pending, (state, _action) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getAllClients.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "";
                state.clients = action.payload
            })
            .addCase(getAllClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            });
    }
})

export default clientSlice.reducer