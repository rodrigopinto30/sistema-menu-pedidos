"use client";

import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state: any) => state.addItem);

  return (
    <div
      className={cn(
        "group relative flex flex-col h-full overflow-hidden transition-all duration-500",
        "rounded-[40px] border border-slate-100 bg-white hover:border-emerald-200",
        "hover:shadow-[0_20px_50px_rgba(16,185,129,0.1)] hover:-translate-y-2",
      )}
    >
      <div className="relative h-64 w-full overflow-hidden bg-slate-100">
        <img
          src={
            product.image_url ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800"
          }
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-sm border border-white/20">
          <Clock className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">
            15-20 min
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="flex flex-col flex-1 p-8 relative">
        <div className="absolute -right-2 -top-6 text-emerald-600/10 group-hover:text-emerald-600/20 transition-colors duration-700 rotate-12">
          <Sparkles className="h-20 w-20" />
        </div>

        <div className="flex justify-between items-start mb-3 relative z-10">
          <h3 className="text-xl font-black text-slate-800 tracking-tighter leading-tight group-hover:text-emerald-600 transition-colors duration-300">
            {product.name}
          </h3>
          <div className="bg-emerald-50 px-3 py-1.5 rounded-2xl border border-emerald-100 shrink-0 shadow-sm shadow-emerald-100/50">
            <span className="text-emerald-700 font-black text-sm tracking-tighter">
              ${product.price}
            </span>
          </div>
        </div>

        <p className="text-slate-500 text-xs font-medium leading-relaxed mb-8 line-clamp-2 italic">
          {product.description ||
            "Crafted with the finest ingredients for a perfect taste experience."}
        </p>

        <div className="mt-auto relative z-10">
          <Button
            onClick={() => addItem(product.id)}
            className={cn(
              "w-full h-14 cursor-pointer rounded-[20px] font-black transition-all duration-300",
              "bg-slate-900 text-white hover:bg-emerald-600 shadow-lg shadow-slate-200 hover:shadow-emerald-200",
              "active:scale-95 flex items-center justify-center gap-2 group/btn",
            )}
          >
            <Plus className="h-5 w-5 group-hover/btn:rotate-90 transition-transform duration-300" />
            <span className="uppercase tracking-widest text-[10px]">
              Add to Cart
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
