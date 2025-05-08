import React from "react";
import { Product } from "@/lib/constants";
import { TbShoppingCartPlus } from "react-icons/tb";
import { addItem } from "@/app/api/cart/addItem";

interface Props {
  product: Product;
}
export default function ProductCard({ product }: Props) {
  const handleAddItem = async () => {
    try {
      await addItem({
        product_id: product._id,
        image: product.image,
        title: product.title,
        sku: product.sku,
        price: product.price,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="h-[280px] w-[220px] flex-shrink flex flex-col bg-slate-100 shadow-lg rounded-2xl hover:bg-slate-200 transition-all">
      <img
        src={product.image || "./product-placeholder.jpg"}
        alt={product.title}
        className="max-w-full h-2/3 p-1 object-cover rounded-2xl"
      />
      <div className="p-3 pb-1">
        <p
          className="font-semibold truncate max-w-full"
          title={product.title || "Title Unavailable"}
        >
          {product.title || "Title Unavailable"}
        </p>
        <p>${product.price}</p>
        <p>{product.sku || "SKU Unavailable"}</p>
      </div>
      <div className="flex justify-end pr-3 pb-3">
        <TbShoppingCartPlus
          onClick={handleAddItem}
          size={25}
          className="transition-transform hover:scale-115 cursor-pointer"
        />
      </div>
    </div>
  );
}
