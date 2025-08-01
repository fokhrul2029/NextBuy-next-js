import { Metadata } from "next";
import Banner from "./sections/Banner";
import ProductSection from "./sections/ProductSection";

export const metadata: Metadata = {
  title: "Home",
};

const Home: React.FC = () => {
  return (
    <div>
      <Banner />
      <ProductSection />
    </div>
  );
};

export default Home;
