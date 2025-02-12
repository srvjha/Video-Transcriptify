import { configureStore } from "@reduxjs/toolkit";
import authStatusReducer from "../slices/authSlice"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key:"authStatus",
    storage
}

const persistedReducer = persistReducer(persistConfig,authStatusReducer);

export const store = configureStore({
    reducer:{
        authStatus: persistedReducer
    }
})


export const persistor = persistStore(store);