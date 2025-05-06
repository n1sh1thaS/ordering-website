import { Product } from "@/lib/constants";
import ProductCard from "./ProductCard";
import React from "react";

interface Props {
  products: Product[] | undefined;
}
export default function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products !== undefined && products.length > 0 ? (
        products.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })
      ) : (
        <p className="ml-2 font-medium text-red-800">
          Products Unavailable. Try again later.
        </p>
      )}
    </div>
  );
}
