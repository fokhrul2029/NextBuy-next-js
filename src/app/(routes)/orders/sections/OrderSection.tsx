"use client";

import { useState } from "react";

const orders = [
  {
    id: "ORD-001",
    customerName: "John Smith",
    totalItems: 3,
    totalAmount: 299.85,
    orderDate: "2024-08-01",
    items: [
      { name: "Fjallraven Backpack", quantity: 1, price: 109.95 },
      { name: "Cotton T-Shirt", quantity: 2, price: 94.95 },
    ],
  },
  {
    id: "ORD-002",
    customerName: "Sarah Johnson",
    totalItems: 2,
    totalAmount: 159.9,
    orderDate: "2024-08-01",
    items: [
      { name: "Wireless Headphones", quantity: 1, price: 79.95 },
      { name: "Phone Case", quantity: 1, price: 79.95 },
    ],
  },
  {
    id: "ORD-003",
    customerName: "Mike Wilson",
    totalItems: 1,
    totalAmount: 49.99,
    orderDate: "2024-07-31",
    items: [{ name: "Coffee Mug", quantity: 1, price: 49.99 }],
  },
  {
    id: "ORD-004",
    customerName: "Emily Davis",
    totalItems: 4,
    totalAmount: 399.8,
    orderDate: "2024-07-31",
    items: [
      { name: "Running Shoes", quantity: 1, price: 129.99 },
      { name: "Sports Shirt", quantity: 2, price: 89.95 },
      { name: "Water Bottle", quantity: 1, price: 89.91 },
    ],
  },
  {
    id: "ORD-005",
    customerName: "David Brown",
    totalItems: 2,
    totalAmount: 199.9,
    orderDate: "2024-07-30",
    items: [
      { name: "Bluetooth Speaker", quantity: 1, price: 99.95 },
      { name: "Charging Cable", quantity: 1, price: 99.95 },
    ],
  },
];

interface Order {
  id: string;
  customerName: string;
  totalItems: number;
  totalAmount: number;
  orderDate: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

const OrderSection: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order.id}
                onClick={() => handleOrderClick(order)}
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.totalItems}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  ${order.totalAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(order.orderDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Order Details</h2>
                <button
                  onClick={handleCloseDetails}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-semibold">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-semibold">
                    {formatDate(selectedOrder.orderDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-semibold text-blue-600">
                    ${selectedOrder.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-100"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${(item.price * item.quantity).toFixed(2)} total
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-6 pt-4 border-t">
                <button
                  onClick={handleCloseDetails}
                  className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSection;
