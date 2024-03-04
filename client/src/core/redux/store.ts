import { configureStore } from '@reduxjs/toolkit'
import { productsAPI } from './slice/api'

export const makeStore = () => {
    return configureStore({
        reducer: {
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