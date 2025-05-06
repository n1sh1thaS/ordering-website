"use client";
import ProductCard from "@/components/ProductCard";
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {products !== undefined &&
          products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
      </main>
    </div>
  );
}
