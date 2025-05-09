"use client";
import { useEffect, useRef, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import Search from "@/components/Search";
import { Product } from "@/lib/constants";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { getQuery } from "@/lib/chat";

export default function Home() {
  const [products, setProducts] = useState<Product[] | undefined>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [chatVisibility, setChatVisibility] = useState<boolean>(false);

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        setLoading(true);
        let data: Product[] | undefined;
        // query by chat
        if (chatVisibility && chatHistory.length > 0) {
          const responseUrl = await getQuery(
            chatHistory[chatHistory.length - 1]
          );
          data = await fetch(`/api/products${responseUrl}`, {
            method: "GET",
          }).then(async (res) => {
            return await res.json();
          });
        }
        // query by search or display all products
        else {
          data = await fetch(`/api/products?query=${query}`, {
            method: "GET",
          }).then(async (res) => {
            return await res.json();
          });
        }
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    }

    fetchAllProducts();
  }, [query, chatHistory.length, chatVisibility]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView();
  }, [chatHistory]);

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter" && inputRef.current) {
      setChatHistory([...chatHistory, inputRef.current.value]);
      inputRef.current.value = "";
    }
  };

  const handleChatVisibility = () => {
    setChatVisibility(!chatVisibility);
  };

  return (
    <div className="max-w-screen flex flex-row justify-center items-start p-5 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-[90%]">
        <Search setQuery={setQuery} />
        <ProductGrid products={products} loading={loading} />
        {chatVisibility ? (
          <div className="w-[50vw] md:w-[20vw] h-[40%] bg-slate-300 shadow-2xl shadow-sky-500 rounded-t-2xl px-3 fixed bottom-0 right-2">
            <div className="flex justify-between items-center pt-3">
              <p className="font-semibold">Query by Chat</p>
              <FaChevronUp onClick={handleChatVisibility} />
            </div>
            <p className="text-sm pb-2">
              If the chat is open, products are queried by your latest message.
            </p>
            <div className="flex-1 overflow-y-auto max-h-[68%] flex flex-col gap-2">
              {chatHistory.map((message, idx) => (
                <p key={idx} className="p-1 px-2 rounded-xl bg-blue-400">
                  {message}
                </p>
              ))}
              <div ref={chatEndRef} className="p-4" />
            </div>
            <input
              type="text"
              ref={inputRef}
              placeholder={"Show me electronics..."}
              className="absolute bottom-2 bg-white rounded-md p-2 w-[95%]"
              onKeyDown={handleKeyDown}
            />
          </div>
        ) : (
          <div className="w-[50vw] md:w-[20vw] h-[5%] bg-slate-300 rounded-t-2xl px-3 fixed bottom-0 right-2">
            <div className="flex justify-between items-center py-3">
              <p className="font-semibold">Query by Chat</p>
              <FaChevronDown onClick={handleChatVisibility} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
