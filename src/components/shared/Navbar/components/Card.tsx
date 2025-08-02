// components/ProductCardStatic.tsx
import { FaBangladeshiTakaSign } from "react-icons/fa6";

interface CardProps {
  product: ProductProps;
}
interface ProductProps {
  title: string;
  price: number;
  quantity: number;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const { title, price, quantity } = product;
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm my-2">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <button
          aria-label="Remove"
          className="text-red-500 text-sm cursor-pointer hover:text-red-700"
        >
          Remove
        </button>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-blue-600 font-semibold flex items-center">
          <FaBangladeshiTakaSign className="mr-1" />
          <span>{price}</span>
        </p>

        {/* Quantity display (non-functional) */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center text-sm select-none">
            -
          </div>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center text-sm select-none">
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
