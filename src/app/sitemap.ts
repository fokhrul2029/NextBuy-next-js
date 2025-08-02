// app/sitemap.xml/route.ts
import type { MetadataRoute } from "next";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://next-buy-next-js.vercel.app";

interface Product {
  id: number | string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // fetch product list
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) {
    console.warn("Failed to fetch products for sitemap:", res.status);
    // fallback to only root
    return [
      {
        url: APP_URL,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
    ];
  }

  const products: Product[] = await res.json();

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${APP_URL}/products/${p.id}`,
    lastModified: new Date(),
    // changeFrequency: "weekly",
    // priority: 0.8,
  }));

  return [
    {
      url: APP_URL,
      lastModified: new Date(),
      // changeFrequency: "yearly",
      // priority: 1,
    },
    ...productEntries,
  ];
}
