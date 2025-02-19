import { configureStore } from "@reduxjs/toolkit";
import authStatusReducer from "../slices/authSlice";
import fileReducer from "../slices/fileSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";


const authPersistConfig = {
    key: "authStatus",
    storage
};


const filePersistConfig = {
    key: "fileStatus",
    storage
};


const persistedAuthReducer = persistReducer(authPersistConfig, authStatusReducer);
const persistedFileReducer = persistReducer(filePersistConfig, fileReducer);

const rootReducer = combineReducers({
    authStatus: persistedAuthReducer,
    fileStatus: persistedFileReducer
});


export const store = configureStore({
    reducer: rootReducer
});

export const persistor = persistStore(store);
