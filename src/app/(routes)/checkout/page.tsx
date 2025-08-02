import { Metadata } from "next";
import CheckoutForm from "./sections/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
};

const Checkout: React.FC = () => {
  return (
    <div>
      <CheckoutForm />
    </div>
  );
};

export default Checkout;
