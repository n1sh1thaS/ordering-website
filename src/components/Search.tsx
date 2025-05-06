import React from "react";

interface Props {
  setQuery: (query: string) => void;
}
export default function Search({ setQuery }: Props) {
  return (
    <input
      type="text"
      onChange={(e) => setQuery(e.target.value)}
      className="py-2 px-5 bg-slate-100 w-full rounded-full shadow-md mb-5"
      placeholder="Search with title or SKU..."
    />
  );
}
