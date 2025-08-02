"use client";

import { Order } from "@/redux/orderSlice";
import { CartItem } from "@/redux/cartSlice";

interface SuccessPageProps {
  order: Order;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ order }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Order Placed!</h2>
          <p className="text-gray-600 mt-2">Thank you for your purchase</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-mono text-xs">{order.id.slice(0, 8)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total:</span>
              <span className="font-semibold">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {order.items.map((item: CartItem) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2 border-b border-gray-100"
            >
              <div>
                <p className="font-medium text-sm">{item.title}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <span className="font-semibold text-sm">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
