import { CartItem } from "@/lib/constants";
import { Divide } from "lucide-react";
import React from "react";
import CartCard from "./CartCard";

interface Props {
  cart: CartItem[] | undefined;
}
export default function CartList({ cart }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {cart && cart.length > 0 ? (
        cart.map((item) => <CartCard key={item._id} product={item} />)
      ) : (
        <p className="ml-2 font-medium text-red-800">No items in cart.</p>
      )}
    </div>
  );
}
