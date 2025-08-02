import { IoClose } from "react-icons/io5";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import Empty from "../components/Empty";
import Card from "../components/Card";

interface SideBarProps {
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ isCartOpen, setIsCartOpen }) => {
  const cartItems = useSelector((s: any) => s.cart.items);

  const total = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {isCartOpen && (
        <div className="fixed inset-0 bg-[#00000085] z-50 transition-opacity duration-300">
          {/* Clicking outside closes the sidebar */}
          <div
            className="absolute inset-0"
            onClick={() => setIsCartOpen(false)}
          ></div>

          {/* The actual sidebar content */}
          <div className="absolute right-0 top-0 h-full w-[350px] bg-white shadow-lg z-50 flex flex-col  ">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-red-500 font-semibold hover:text-red-700 cursor-pointer"
                >
                  <IoClose />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <Empty />
              ) : (
                cartItems?.map((product: any) => (
                  <Card key={product.id} product={product} />
                ))
              )}
            </div>
            {/* Footer with Total and Checkout */}
            {cartItems.length > 0 && <Footer total={total} />}
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
