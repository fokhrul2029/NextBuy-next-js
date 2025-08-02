"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import OrderTable from "./OrderTable";
import OrderDetailsModal from "./OrderDetailsModal";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  fullName: string;
  items: OrderItem[];
  createdAt: string;
}

interface RootState {
  order: {
    orders: Order[];
  };
}

const OrderSection: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const orders = useSelector((state: RootState) => state.order.orders);

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
        <p className="text-gray-600 mt-2">
          {orders.length} order{orders.length !== 1 ? "s" : ""} placed
        </p>
      </div>

      {orders.length > 0 ? (
        <>
          <OrderTable orders={orders} onOrderClick={handleOrderClick} />
          {selectedOrder && (
            <OrderDetailsModal
              order={selectedOrder}
              onClose={handleCloseDetails}
            />
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No orders yet
          </h3>
          <p className="text-gray-500">
            Your completed orders will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderSection;
