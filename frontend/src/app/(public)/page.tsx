"use client";

import { useEffect, useState } from "react";
import { Category, getMenu } from "@/services/productServices";
import { ProductCard } from "@/components/ProductCard";
import { MenuSkeleton } from "@/components/menu/MenuSkeleton";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMenu()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <main className="max-w-7xl mx-auto px-6 py-12">
        <MenuSkeleton />
      </main>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 animate-in fade-in duration-700">
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 w-fit px-4 py-1.5 rounded-full border border-emerald-100/50">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-black uppercase tracking-[0.2em]">
            Fresh & Delicious
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
          Our <span className="text-emerald-600">Menu</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-xl font-medium tracking-tight">
          Choose from our selection of handcrafted dishes and enjoy a unique
          culinary experience.
        </p>
      </section>

      <div className="space-y-24">
        {categories.map((category) => (
          <div key={category.id} className="group space-y-8">
            <div className="flex items-center gap-6">
              <h2 className="text-3xl font-black text-slate-800 tracking-tighter shrink-0 transition-transform group-hover:translate-x-1 duration-300">
                {category.name}
              </h2>
              <div className="h-[2px] w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-24 bg-emerald-600/30 rounded-full" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {category.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
