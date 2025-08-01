import { Metadata } from "next";
import React from "react";
import ProductDetails from "./sections/ProductDetails";

export const metadata: Metadata = {
  title: "Product Info",
};

function Product() {
  return (
    <div>
      <ProductDetails />
    </div>
  );
}

export default Product;
