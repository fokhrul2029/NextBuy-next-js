"use client";

import ProductCard from "@/components/ProductCard";
import Spinner from "@/components/Spinner";
import Title from "@/components/Title";
import { useGetAllProductsQuery } from "@/redux/store/api";

const ProductSection: React.FC = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery();

  return (
    <div className="container mx-auto px-4 py-10">
      <Title>All Products</Title>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <div>Failed to load products.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center py-4">
          {data?.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSection;
