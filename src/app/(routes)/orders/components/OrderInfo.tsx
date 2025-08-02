interface OrderInfoProps {
  title?: string;
  order: any;
}

const OrderInfo: React.FC<OrderInfoProps> = ({ title, order }) => {
  return (
    <div className="space-y-1">
      {title && <p className="text-sm text-gray-500">{title}</p>}

      <p className="font-mono font-semibold text-gray-600">{order}</p>
    </div>
  );
};

export default OrderInfo;
