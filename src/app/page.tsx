"use client";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "./api/products/getProducts";
import { useEffect, useState } from "react";
import { Product } from "@/lib/constants";

export default function Home() {
  const [products, setProducts] = useState<Product[] | undefined>([]);

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const data: Product[] | undefined = await getProducts();
        setProducts(data);
        console.log("data", data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAllProducts();
  }, []);
  return (
    <div className="flex flex-col justify-start items-start p-5 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-semibold m-3">Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
