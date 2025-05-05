import React from "react";
import { Product } from "@/lib/constants";

interface Props {
  product: Product;
}
export default function ProductCard({ product }: Props) {
  return (
    <div className="h-[280px] w-[220px] flex flex-col bg-slate-100 shadow-lg rounded-2xl hover:bg-slate-200 transition-all">
      <img
        src={product.image}
        alt={product.title}
        className="max-w-full h-2/3 p-1 object-cover rounded-2xl"
      />
      <div className="p-3">
        <p className="font-semibold">{product.title}</p>
        <p>${product.price}</p>
        <p>{product.sku}</p>
      </div>
    </div>
  );
}
