"use client";

import CartList from "@/components/CartList";
import { CartItem } from "@/lib/constants";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [cart, setCart] = useState<CartItem[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchCart() {
    try {
      setLoading(true);
      const cart: CartItem[] | undefined = await fetch(`/api/cart`, {
        method: "GET",
      }).then(async (res) => {
        return await res.json();
      });
      setCart(cart);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="max-w-screen flex flex-row justify-between items-start p-5 font-[family-name:var(--font-geist-sans)]">
      <div className="w-1/3 ml-6 mt-2 sm:hidden md:block">
        <CartList cart={cart} fetchCart={fetchCart} loading={loading} />
      </div>
    </div>
  );
}
