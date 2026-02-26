"use client";

import { useEffect, useState } from "react";
import { Category, getMenu } from "@/services/productServices";
import { ProductCard } from "@/components/ProductCard";
import { CheckoutForm } from "@/components/CheckoutForm";
import { useCartStore } from "@/store/useCartStore";
import { Loader2, ShoppingCart, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const totalItems = useCartStore((state: any) => state.getTotalItems());

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenu();
        setCategories(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-orange-500" />
      </div>
    );

  return (
    <main className="p-4 md:p-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-10 sticky top-0 bg-white/80 backdrop-blur-md z-10 py-4 border-b">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Menú</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="relative p-2 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors cursor-pointer z-20">
                  <ShoppingCart className="h-6 w-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:max-w-lg overflow-y-auto z-[100]"
              >
                <SheetHeader className="mb-4">
                  <SheetTitle className="text-2xl font-bold">
                    Your Order
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <CheckoutForm categories={categories} onSuccess={() => {}} />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden md:flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold">
            <ShoppingCart className="mr-2 h-5 w-5" />
            <span>{totalItems} items</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <section className="md:col-span-2 space-y-10">
          {categories.map((category) => (
            <div key={category.id} className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 bg-gray-50 p-2 rounded">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="hidden md:block">
          <div className="sticky top-28">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Complete Order
            </h2>
            <CheckoutForm categories={categories} onSuccess={() => {}} />
          </div>
        </section>
      </div>
    </main>
  );
}
