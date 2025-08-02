import Link from "next/link";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <>
      <div className="flex justify-between items-center p-4 border border-gray-200 rounded bg-white shadow space-x-4">
        <span className="text-lg font-semibold text-gray-800">Total:</span>
        <p className="text-2xl font-bold text-blue-600 flex items-center">
          <FaBangladeshiTakaSign />
          <span>4545</span>
        </p>
        <Link
          href="/checkout"
          className="ml-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Checkout
        </Link>
      </div>
    </>
  );
};

export default Footer;
