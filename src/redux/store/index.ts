import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import cartReducer from "../cartSlice";
import orderReducer from "../orderSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
