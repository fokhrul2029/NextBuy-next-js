// components/ProductCardStatic.tsx
import { removeFromCart, updateQuantity } from "@/redux/cartSlice";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useDispatch } from "react-redux";

interface CardProps {
  product: ProductProps;
}

interface ProductProps {
  title: string;
  price: number;
  quantity: number;
  id: number;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const { title, price, quantity, id } = product;

  const handleQuantityIncrease = (): void => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  const handleQuantityDecrease = (): void => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleRemoveCart = (): void => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm my-2">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <button
          onClick={handleRemoveCart}
          aria-label="Remove"
          className="text-red-500 text-sm cursor-pointer hover:text-red-700 transition-colors"
        >
          Remove
        </button>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-blue-600 font-semibold flex items-center">
          <FaBangladeshiTakaSign className="mr-1" />
          <span>{price}</span>
        </p>

        {/* Quantity controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleQuantityDecrease}
            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center text-sm select-none cursor-pointer hover:bg-gray-100 transition-colors"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <button
            onClick={handleQuantityIncrease}
            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center text-sm select-none cursor-pointer hover:bg-gray-100 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
