"use client";

import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import { useGetAllProductsQuery } from "@/redux/store/api";

const ProductSection: React.FC = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery();

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Failed to load products.</div>;

  console.log(data);

  return (
    <div className="container mx-auto px-4 py-10">
      <Title>All Products</Title>

      <div className="grid grid-cols-5 gap-6 items-center py-4">
        {data?.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
