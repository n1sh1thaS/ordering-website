import React from "react";
import { Product } from "@/lib/constants";

interface Props {
  product: Product;
}
export default function ProductCard({ product }: Props) {
  return (
    <div className="h-[280px] w-[220px] flex-grow flex flex-col bg-slate-100 shadow-lg rounded-2xl hover:bg-slate-200 transition-all">
      <img
        src={product.image || "./product-placeholder.jpg"}
        alt={product.title}
        className="max-w-full h-2/3 p-1 object-cover rounded-2xl"
      />
      <div className="p-3">
        <p
          className="font-semibold truncate max-w-full"
          title={product.title || "Title Unavailable"}
        >
          {product.title || "Title Unavailable"}
        </p>
        <p>${product.price}</p>
        <p>{product.sku || "SKU Unavailable"}</p>
      </div>
    </div>
  );
}
