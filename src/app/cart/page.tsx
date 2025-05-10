"use client";

import CartList from "@/components/CartList";
import { CartItem } from "@/lib/constants";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const [cart, setCart] = useState<CartItem[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchCart() {
    try {
      setLoading(true);
      const cart: CartItem[] | undefined = await fetch(`/api/cart`, {
        method: "GET",
      }).then(async (res) => {
        if ("error" in res)
          toast.error("Error fetching cart", { position: "top-right" });
        return await res.json();
      });
      setCart(cart);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
      return toast.error("Error fetching cart", { position: "top-right" });
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="max-w-full flex flex-row justify-between items-start p-5 font-[family-name:var(--font-geist-sans)]">
      <Toaster />
      <div className="w-1/3 ml-6 mt-2 sm:hidden md:block">
        <CartList cart={cart} fetchCart={fetchCart} loading={loading} />
      </div>
    </div>
  );
}
