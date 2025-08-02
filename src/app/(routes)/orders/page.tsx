import { Metadata } from "next";
import OrderSection from "./sections/OrderSection";

export const metadata: Metadata = {
  title: "Orders",
};

const Orders: React.FC = () => {
  return (
    <div>
      <OrderSection />
    </div>
  );
};

export default Orders;
