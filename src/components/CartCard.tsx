import React from "react";
import { Product } from "@/lib/constants";
import { TiDeleteOutline } from "react-icons/ti";

interface Props {
  product: Product;
}

export default function CartCard({ product }: Props) {
  return (
    <div className="h-[120px] w-full flex-shrink flex flex-row bg-slate-100 shadow-lg rounded-2xl hover:bg-slate-200 transition-all">
      <img
        src={product.image || "./product-placeholder.jpg"}
        alt={product.title}
        className="w-1/4 h-full p-1 object-cover rounded-2xl"
      />
      <div className="flex flex-row justify-between w-3/4">
        <div className="p-3 pb-1">
          <p
            className="font-semibold truncate w-3/5"
            title={product.title || "Title Unavailable"}
          >
            {product.title || "Title Unavailable"}
          </p>
          <p>${product.price}</p>
          <p>{product.sku || "SKU Unavailable"}</p>
        </div>
        <div className="p-3">
          <TiDeleteOutline
            size={25}
            className="transition-transform hover:scale-115 hover:text-red-700 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
