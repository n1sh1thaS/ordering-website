import React from "react";

export default function CartListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <div
            key={i}
            className="h-[120px] w-[80vw] md:w-[50vw] flex-shrink flex flex-row bg-slate-100 shadow-lg rounded-2xl animate-pulse"
          >
            <div className="w-1/4 h-full p-1">
              <div className="h-full w-full bg-gray-200 rounded-2xl"></div>
            </div>
            <div className="flex flex-row justify-between w-full">
              <div className="p-3 pb-1 flex flex-col gap-2">
                <div className="h-5 w-48 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>

              <div className="p-3 flex items-start">
                <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
