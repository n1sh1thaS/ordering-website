"use client";
import { useEffect, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import Search from "@/components/Search";
import { CartItem, Product } from "@/lib/constants";
import { getProducts } from "./api/products/getProducts";
import CartList from "@/components/CartList";
import { getCart } from "./api/cart/getCart";

export default function Home() {
  const [products, setProducts] = useState<Product[] | undefined>([]);
  const [cart, setCart] = useState<CartItem[] | undefined>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const data: Product[] | undefined = await getProducts(query);
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    }
    async function fetchCart() {
      try {
        const cart: CartItem[] | undefined = await getCart();
        setCart(cart);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAllProducts();
    fetchCart();
  }, [query]);

  return (
    <div className="max-w-screen flex flex-row justify-between items-start p-5 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-2/3">
        <h1 className="text-2xl font-semibold m-3">Products</h1>
        <Search setQuery={setQuery} />
        <ProductGrid products={products} />
      </div>
      <div className="w-1/3 ml-6 mt-2 sm:hidden md:block">
        <h1 className="text-2xl font-semibold m-1">Cart</h1>
        <CartList cart={cart} />
      </div>
    </div>
  );
}
