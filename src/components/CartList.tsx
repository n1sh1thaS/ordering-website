"use client";

import { CartItem } from "@/lib/constants";
import React from "react";
import CartCard from "./CartCard";
import CartListSkeleton from "./CartListSkeleton";

interface Props {
  cart: CartItem[] | undefined;
  fetchCart: () => Promise<string | undefined>;
  loading: boolean;
}
export default function CartList({ cart, fetchCart, loading }: Props) {
  return loading ? (
    <CartListSkeleton />
  ) : (
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
