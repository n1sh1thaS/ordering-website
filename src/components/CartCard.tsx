import React from "react";
import { Product } from "@/lib/constants";
import { TiDeleteOutline } from "react-icons/ti";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  product: Product;
  fetchCart: () => Promise<string | undefined>;
}

export default function CartCard({ product, fetchCart }: Props) {
  const handleDeleteItem = async () => {
    try {
      await fetch(`/api/cart/${product._id}`, { method: "DELETE" }).then(
        async (res) => {
          if ("error" in res)
            return toast.error("Error removing item from cart", {
              position: "top-right",
            });
          toast.success("Successfully removed item from cart", {
            position: "top-right",
          });
          await fetchCart();
        }
      );
    } catch (err) {
      console.error(err);
      return toast.error("Error removing item from cart", {
        position: "top-right",
      });
    }
  };
  return (
    <div className="h-[120px] w-full flex-shrink flex flex-row bg-slate-100 shadow-lg rounded-2xl hover:bg-slate-200 transition-all">
      <Toaster />
      <img
        src={product.image || "./product-placeholder.jpg"}
        alt={product.title}
        className="w-1/4 h-full p-1 object-cover rounded-2xl"
      />
      <div className="flex flex-row justify-between w-3/4">
        <div className="p-3 pb-1">
          <div className="w-[17rem]">
            <p
              className="font-semibold truncate"
              title={product.title || "Title Unavailable"}
            >
              {product.title || "Title Unavailable"}
            </p>
          </div>
          <p>${product.price}</p>
          <p>{product.sku || "SKU Unavailable"}</p>
        </div>
        <div className="p-3">
          <TiDeleteOutline
            onClick={handleDeleteItem}
            size={25}
            className="transition-transform hover:scale-115 hover:text-red-700 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
