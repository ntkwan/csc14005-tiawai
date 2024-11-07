import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { appApi } from "../api/api-config";
import authReducer, { AuthState } from "@/lib/slices/auth-slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Action } from "@reduxjs/toolkit";

export type RootState = {
    [appApi.reducerPath]: ReturnType<typeof appApi.reducer>;
    auth: AuthState;
};

const persistConfig = {
    key: "root",
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ["auth"],
};

const appReducer = combineReducers({
    [appApi.reducerPath]: appApi.reducer,
    auth: authReducer,
});

const rootReducer: Reducer<RootState, Action> = (state, action) => {
    if (action.type === "auth/logOut") {
        state = undefined;
    }
    return appReducer(state, action);
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(appApi.middleware),
    devTools: true,
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
