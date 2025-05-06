"use client";
import { useEffect, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import Search from "@/components/Search";
import { Product } from "@/lib/constants";
import { getProducts } from "./api/products/getProducts";

export default function Home() {
  const [products, setProducts] = useState<Product[] | undefined>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const data: Product[] | undefined = await getProducts(query);
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAllProducts();
  }, [query]);

  return (
    <div className="flex flex-col justify-start items-start p-5 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-semibold m-3">Products</h1>
      <Search setQuery={setQuery} />
      <ProductGrid products={products} />
    </div>
  );
}
