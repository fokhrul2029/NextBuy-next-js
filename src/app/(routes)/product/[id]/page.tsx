import { Metadata } from "next";
import ProductDetails from "./sections/ProductDetails";

type Params = { id: number };

const API_BASE = "https://fakestoreapi.com";
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const res = await fetch(`${API_BASE}/products/${params.id}`);

  if (!res.ok) {
    return {
      title: "Product not found",
    };
  }

  const product: { title: string; description?: string } = await res.json();

  return {
    title: `${product.title}`,
    description: product.description?.substring(0, 160) || undefined,
    openGraph: {
      title: product.title,
      description: product.description,
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const res = await fetch(`${API_BASE}/products/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>Product not found.</div>;
  }

  const product: any = await res.json();

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}
