import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "./cartSlice";

export interface Order {
  id: string;
  fullName: string;
  address: string;
  phone: string;
  items: CartItem[];
  total: number;
  createdAt: string;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = { orders: [] };

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    placeOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
  },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
