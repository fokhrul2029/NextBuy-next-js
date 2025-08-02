import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetails from "./sections/ProductDetails";

type Params = Promise<{ id: string }>;
type Product = { title: string; description?: string };

const API_BASE = "https://fakestoreapi.com";

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) notFound();
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  return {
    title: product.title,
    description: product.description?.substring(0, 160),
    openGraph: {
      title: product.title,
      description: product.description,
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { id } = await params;

  return (
    <div>
      <ProductDetails id={id} />
    </div>
  );
}
