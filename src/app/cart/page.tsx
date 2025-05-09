"use client";

import CartList from "@/components/CartList";
import { CartItem } from "@/lib/constants";
import React, { useEffect, useState } from "react";
import { getCart } from "../api/cart/getCart";

export default function Page() {
  const [cart, setCart] = useState<CartItem[] | undefined>([]);

  async function fetchCart() {
    try {
      const cart: CartItem[] | undefined = await getCart();
      setCart(cart);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="max-w-screen flex flex-row justify-between items-start p-5 font-[family-name:var(--font-geist-sans)]">
      <div className="w-1/3 ml-6 mt-2 sm:hidden md:block">
        <CartList cart={cart} fetchCart={fetchCart} />
      </div>
    </div>
  );
}
