import React from "react";

export default function ProductGridSkeleton() {
  return (
    <div className="w-full justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="h-[300px] max-h-[300px] w-[220px] flex-shrink flex flex-col bg-slate-100 shadow-lg rounded-2xl animate-pulse"
        >
          <div className="h-[60%] w-full p-1">
            <div className="w-full h-full bg-slate-200 rounded-2xl"></div>
          </div>
          <div className="p-3 pb-1 space-y-2">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
          </div>
          <div className="flex justify-end pr-3 pb-3">
            <div className="h-6 w-6 bg-slate-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
