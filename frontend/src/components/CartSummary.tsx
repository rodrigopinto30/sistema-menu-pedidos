"use client";

import { useCartStore } from "@/store/useCartStore";
import { Category } from "@/services/productServices";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartSummaryProps {
  categories: Category[];
}

export function CartSummary({ categories }: CartSummaryProps) {
  const { items, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);

  const getProductDetails = (id: number) => {
    if (!categories || !Array.isArray(categories)) return null;
    for (const cat of categories) {
      const product = cat.products.find((p) => p.id === id);
      if (product) return product;
    }
    return null;
  };

  const total = items.reduce((acc: any, item: any) => {
    const details = getProductDetails(item.product_id);
    return acc + (details?.price || 0) * item.quantity;
  }, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="h-20 w-full animate-pulse bg-slate-50 rounded-2xl" />
    );

  if (items.length === 0)
    return (
      <div className="py-12 text-center bg-slate-50 rounded-[24px] border-none">
        <p className="text-slate-400 font-medium italic">Your cart is empty.</p>
      </div>
    );

  return (
    <div className="space-y-6 pb-6 border-b border-slate-100 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="font-black text-xl text-slate-800 tracking-tighter">
          Order Summary
        </h3>
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
          {items.length} {items.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      <ul className="space-y-3">
        {items.map((item: any) => {
          const details = getProductDetails(item.product_id);
          return (
            <li
              key={item.product_id}
              className="group flex justify-between items-center bg-slate-50/50 p-3 rounded-2xl hover:bg-slate-50 transition-colors duration-300"
            >
              <div className="flex flex-col">
                <span className="font-bold text-slate-700 text-sm">
                  {details?.name || "Product"}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  Qty: {item.quantity} × ${details?.price}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-black text-slate-800 text-sm">
                  ${((details?.price || 0) * item.quantity).toFixed(2)}
                </span>
                <Button
                  onClick={() => removeItem(item.product_id)}
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer h-8 w-8 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all duration-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex justify-between items-center pt-4 border-t border-slate-100">
        <span className="font-bold text-slate-500 uppercase text-xs tracking-[0.2em]">
          Total
        </span>
        <span className="text-2xl font-black text-emerald-600 tracking-tighter">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
