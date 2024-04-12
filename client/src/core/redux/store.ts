import { configureStore } from '@reduxjs/toolkit'
import { productsAPI } from './slice/api/productsApi'
import productReducer from './slice/products-slice'
import clientReducer from './slice/clients-slice'
import { ordersAPI } from './slice/api/orderApi'

export const makeStore = () => {
    return configureStore({
        reducer: {
            product: productReducer,
            client: clientReducer,
            [productsAPI.reducerPath]: productsAPI.reducer,
            [ordersAPI.reducerPath]: ordersAPI.reducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(productsAPI.middleware, ordersAPI.middleware),
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']