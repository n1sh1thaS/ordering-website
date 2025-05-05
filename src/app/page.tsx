import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ProductCard
          product={{
            title: "Animal Print Furry Hair Band (Various Colours)",
            image:
              "http://cdn.shopify.com/s/files/1/0028/4062/products/600_DB187_Hair_Band_Silver_Leopard_PrintPS.jpg?1257429506",
            sku: "DB341-ZEB-0",
            price: 14.99,
          }}
        />
      </main>
    </div>
  );
}
