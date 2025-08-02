import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetails from "./sections/ProductDetails";

type Params = Promise<{ id: string }>;
type Product = { title: string; description?: string };

const API_BASE = "https://fakestoreapi.com";

const productCache = new Map<string, Product>();

async function getProduct(id: string): Promise<Product> {
  if (productCache.has(id)) {
    return productCache.get(id)!;
  }
  const res = await fetch(`${API_BASE}/products/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) notFound();
  const product: Product = await res.json();
  productCache.set(id, product);
  return product;
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
