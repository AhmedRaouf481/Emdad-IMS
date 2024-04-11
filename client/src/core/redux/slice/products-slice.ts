import { createSlice } from '@reduxjs/toolkit'
import { getAllProducts } from '../thunk/products-thunk'

export interface Product {
    id?: string;
    code?: string;
    name?: string;
    price?: number;
    qty?: number;
    pkgCapacity?: number;
    photo?: string;
    description?: string;
    weight?: number;
    color?: string;
    dimension?: string;
    size?: string;
    material?: string;
    minValue?: number;
    createdAt?: Date;
    updatedAt?: Date;
    categoryId?: string;
}
// Define a type for the slice state
export interface ProductState {
    currentProduct: Product
    products: Product[]
    loading: boolean
    error: string
}

// Define the initial state using that type
const initialState: ProductState = {
    products: [],
    currentProduct: {},
    loading: false,
    error: "",
}

export const productSlice = createSlice({
    name: 'product',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //* Get all Products
        builder.addCase(getAllProducts.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.products = action.payload
        });
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as any;
        });
    }
})

export default productSlice.reducer