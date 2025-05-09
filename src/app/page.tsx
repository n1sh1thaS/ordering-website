"use client";
import { useEffect, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import Search from "@/components/Search";
import { Product } from "@/lib/constants";

export default function Home() {
  const [products, setProducts] = useState<Product[] | undefined>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const data: Product[] | undefined = await fetch(
          `/api/products/?query=${query}`,
          { method: "GET" }
        ).then(async (res) => {
          return await res.json();
        });
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchAllProducts();
  }, [query]);

  return (
    <div className="max-w-screen flex flex-row justify-between items-start p-5 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-2/3">
        <Search setQuery={setQuery} />
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
