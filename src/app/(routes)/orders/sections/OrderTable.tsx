"use client";

import TableHead from "../components/TableHead";

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

interface OrderTableProps {
  orders: Order[];
  onOrderClick: (order: Order) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onOrderClick }) => {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const tableHead = [" Order ID", "Customer", "Items", "Total", "Date"];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            {tableHead.map((content, i) => (
              <TableHead key={i}>{content}</TableHead>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr
              key={order.id}
              onClick={() => onOrderClick(order)}
              className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                #{order.id.slice(0, 8)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.fullName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.items.length}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                $
                {order.items
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(order.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
