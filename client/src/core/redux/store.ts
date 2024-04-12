import { configureStore } from '@reduxjs/toolkit'
import { productsAPI } from './slice/api'
import productReducer from './slice/products-slice'
import clientReducer from './slice/clients-slice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            product: productReducer,
            client: clientReducer,
            [productsAPI.reducerPath]: productsAPI.reducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(productsAPI.middleware),
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']