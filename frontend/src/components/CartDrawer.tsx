"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { CheckoutForm } from "@/components/CheckoutForm";
import { useEffect, useState } from "react";
import { Category, getMenu } from "@/services/productServices";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const totalItems = useCartStore((state: any) => state.getTotalItems());
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    getMenu().then(setCategories).catch(console.error);
    setMounted(true);
  }, []);

  if (!mounted) return <div className="p-2 w-10 ml-2" />;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className={cn(
            "cursor-pointer flex items-center px-5 py-2.5 rounded-2xl font-bold transition-all duration-300 outline-none ml-2 border-none active:scale-95",
            totalItems > 0
              ? "bg-emerald-600 text-white"
              : "bg-slate-100 text-slate-400 hover:bg-slate-200",
          )}
        >
          <div className="relative">
            <ShoppingCart className="mr-2.5 h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-200"></span>
              </span>
            )}
          </div>
          <span className="text-sm tracking-tight">{totalItems}</span>
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg overflow-y-auto border-none p-8">
        <SheetHeader className="mb-8 mt-4">
          <SheetTitle className="text-3xl font-black flex items-center gap-3 text-slate-800 tracking-tighter">
            <div className="bg-emerald-50 p-2.5 rounded-2xl">
              <ShoppingCart className="h-7 w-7 text-emerald-600" />
            </div>
            Your Cart
          </SheetTitle>
        </SheetHeader>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CheckoutForm
            categories={categories}
            onSuccess={() => setOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
