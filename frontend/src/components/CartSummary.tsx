"use client";

import { useCartStore } from "@/store/useCartStore";
import { Category } from "@/services/productServices";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Trash2, ShoppingCart } from "lucide-react";
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
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 w-full animate-pulse bg-slate-50 rounded-2xl"
          />
        ))}
      </div>
    );

  if (items.length === 0)
    return (
      <div className="py-16 text-center bg-slate-50/50 rounded-[32px] border-2 border-dashed border-slate-100 flex flex-col items-center gap-3">
        <div className="bg-white p-4 rounded-full shadow-sm">
          <ShoppingCart className="h-6 w-6 text-slate-300" />
        </div>
        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest italic">
          Your cart is empty
        </p>
      </div>
    );

  return (
    <div className="space-y-8 pb-8 border-b border-slate-100 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-black text-2xl text-slate-900 tracking-tighter leading-none">
            Order <span className="text-emerald-600">Summary</span>
          </h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Review your cravings
          </p>
        </div>
        <div className="bg-emerald-600 px-3 py-1.5 rounded-xl shadow-lg shadow-emerald-100">
          <span className="text-[11px] font-black text-white uppercase tracking-tighter">
            {items.length} {items.length === 1 ? "Item" : "Items"}
          </span>
        </div>
      </div>

      <ul className="space-y-4">
        {items.map((item: any) => {
          const details = getProductDetails(item.product_id);
          return (
            <li
              key={item.product_id}
              className="group flex items-center gap-4 bg-white p-2 rounded-[24px] border border-slate-50 hover:border-emerald-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-100 border border-slate-50">
                <img
                  src={
                    details?.image_url ||
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200"
                  }
                  alt={details?.name || "Product"}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-black text-slate-800 text-sm tracking-tight truncate group-hover:text-emerald-600 transition-colors">
                  {details?.name || "Product"}
                </h4>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">
                  Qty: <span className="text-slate-600">{item.quantity}</span> ×
                  ${details?.price}
                </p>
              </div>

              <div className="flex items-center gap-3 pr-2">
                <span className="font-black text-slate-900 text-sm tracking-tighter shrink-0">
                  ${((details?.price || 0) * item.quantity).toFixed(2)}
                </span>
                <Button
                  onClick={() => removeItem(item.product_id)}
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer h-9 w-9 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all duration-300 active:scale-90"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="bg-slate-900 p-6 rounded-[28px] shadow-xl shadow-slate-200 flex justify-between items-center group overflow-hidden relative">
        <div className="absolute top-0 right-0 h-full w-24 bg-emerald-600/10 skew-x-12 translate-x-12 group-hover:translate-x-6 transition-transform duration-700" />

        <div className="relative z-10">
          <span className="font-black text-slate-400 uppercase text-[10px] tracking-[0.3em]">
            Grand Total
          </span>
          <p className="text-xs text-slate-500 font-medium">VAT Included</p>
        </div>
        <span className="text-3xl font-black text-white tracking-tighter relative z-10">
          <span className="text-emerald-500 mr-1">$</span>
          {total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
