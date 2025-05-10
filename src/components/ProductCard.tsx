import React from "react";
import { Product } from "@/lib/constants";
import { TbShoppingCartPlus } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  product: Product;
}
export default function ProductCard({ product }: Props) {
  const handleAddItem = async () => {
    try {
      const item = {
        product_id: product._id,
        image: product.image,
        title: product.title,
        sku: product.sku,
        price: product.price,
      };
      await fetch(`/api/cart`, {
        method: "POST",
        body: JSON.stringify(item),
      }).then((res) => {
        if ("error" in res)
          return toast.error("Error adding item to cart", {
            position: "top-right",
          });
        return toast.success("Successfully added item to cart", {
          position: "top-right",
        });
      });
    } catch (err) {
      console.error(err);
      return toast.error("Error adding item", { position: "top-right" });
    }
  };
  return (
    <div className="h-[300px] max-h-[300px] w-[220px] flex-shrink flex flex-col bg-slate-100 shadow-lg rounded-2xl hover:bg-slate-200 transition-all">
      <Toaster
        toastOptions={{
          success: {
            style: {
              boxShadow: "none",
            },
          },
          error: {
            style: {
              boxShadow: "none",
            },
          },
        }}
      />
      <img
        src={product.image || "./product-placeholder.jpg"}
        alt={product.title}
        className="max-w-full min-h-[60%] h-[60%] p-1 object-cover rounded-2xl"
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
          className="transition-transform hover:scale-115 hover:text-green-900 cursor-pointer"
        />
      </div>
    </div>
  );
}
