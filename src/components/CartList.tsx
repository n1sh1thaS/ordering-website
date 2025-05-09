import { CartItem } from "@/lib/constants";
import { Divide } from "lucide-react";
import React from "react";
import CartCard from "./CartCard";

interface Props {
  cart: CartItem[] | undefined;
  fetchCart: () => Promise<void>;
}
export default function CartList({ cart, fetchCart }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {cart && cart.length > 0 ? (
        cart.map((item) => (
          <CartCard key={item._id} product={item} fetchCart={fetchCart} />
        ))
      ) : (
        <p className="ml-2 font-medium text-red-800">No items in cart.</p>
      )}
    </div>
  );
}
