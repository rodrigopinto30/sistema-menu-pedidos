"use client";

import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state: any) => state.addItem);

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between h-full overflow-hidden p-6 transition-all duration-500",
        "rounded-[32px] border border-slate-100",
        "bg-slate-50/50 hover:bg-white hover:border-emerald-200",
        "hover:translate-y-[-4px]",
      )}
    >
      <div className="absolute -right-4 -top-4 text-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <Sparkles className="h-24 w-24" />
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-black text-slate-800 tracking-tighter leading-tight group-hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>
          <div className="bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-slate-100 group-hover:border-emerald-100">
            <span className="text-emerald-600 font-black text-sm tracking-tighter">
              ${product.price}
            </span>
          </div>
        </div>

        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
          {product.description ||
            "Crafted with the finest ingredients for a perfect taste experience."}
        </p>
      </div>

      <div className="relative z-10 mt-auto">
        <Button
          onClick={() => addItem(product.id)}
          className={cn(
            "w-full h-13 cursor-pointer border rounded-2xl font-black transition-all duration-300 ",
            "bg-white text-slate-900 border-gray-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 shadow-none active:scale-95",
          )}
        >
          <Plus className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
