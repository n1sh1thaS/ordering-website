"use client";

import { Product } from "@/lib/constants";
import ProductCard from "./ProductCard";
import React from "react";

interface Props {
  products: Product[] | undefined;
  loading: boolean;
}
export default function ProductGrid({ products, loading }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading ? (
        <p className="ml-2 font-medium">Loading...</p>
      ) : products && products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p className="ml-2 font-medium text-red-800">
          Products Unavailable. Try again later.
        </p>
      )}
    </div>
  );
}
