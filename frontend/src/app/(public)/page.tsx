"use client";

import { useEffect, useState } from "react";
import { Category, getMenu } from "@/services/productServices";
import { ProductCard } from "@/components/ProductCard";
import { MenuSkeleton } from "@/components/menu/MenuSkeleton";
import { Sparkles, ArrowRight, Clock, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <div className="space-y-32 pb-24 animate-in fade-in duration-1000">
      <section className="relative overflow-hidden pt-12 md:pt-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 relative z-10">
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 w-fit px-4 py-1.5 rounded-full border border-emerald-100/50 shadow-sm shadow-emerald-100">
              <Sparkles className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                New Taste Experience
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] lg:max-w-md">
              Taste the{" "}
              <span className="text-emerald-600 drop-shadow-sm">
                Extraordinary
              </span>
            </h1>

            <p className="text-slate-500 text-lg md:text-xl max-w-lg font-medium tracking-tight leading-relaxed">
              Bringing the best local flavors straight to your door with the
              <span className="text-slate-900 font-bold italic">
                {" "}
                speed and quality
              </span>{" "}
              you deserve.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="cursor-pointer h-16 px-10 rounded-full bg-slate-900 hover:bg-emerald-600 text-white font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-200 group">
                Order Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="ghost"
                className="cursor-pointer h-16 px-8 rounded-full font-black text-sm uppercase tracking-widest text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 group"
              >
                <div className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center mr-3 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Play className="h-4 w-4 fill-current" />
                </div>
                How it works
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4 border-t border-slate-100 w-fit">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-slate-900 tracking-tighter">
                  10k+
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Happy Foodies
                </span>
              </div>
              <div className="h-8 w-[1px] bg-slate-100" />
              <div className="flex flex-col">
                <div className="flex items-center text-emerald-600">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  5.0 Star Rating
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-[60px] overflow-hidden border-[12px] border-white shadow-2xl shadow-emerald-900/10 rotate-2 hover:rotate-0 transition-transform duration-700 bg-slate-50">
              <div className="aspect-[4/5] bg-emerald-100 flex items-center justify-center group overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"
                  alt="Featured dish"
                  className="object-cover w-full h-full scale-110 group-hover:scale-100 transition-transform duration-1000"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-[32px] shadow-2xl border border-slate-50 flex items-center gap-4 animate-bounce duration-[3000ms]">
              <div className="h-12 w-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Delivery Time
                </p>
                <p className="text-xl font-black text-slate-900 tracking-tighter">
                  15-25 Mins
                </p>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl -z-0" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 space-y-20">
        <div className="text-center space-y-4">
          <div className="h-1 w-20 bg-emerald-600/20 mx-auto rounded-full" />
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Explore <span className="text-emerald-600">Categories</span>
          </h2>
        </div>

        <div className="space-y-28">
          {categories.map((category) => (
            <div key={category.id} className="group space-y-10">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-4 shrink-0">
                  <div className="h-12 w-12 bg-slate-900 text-white rounded-[20px] flex items-center justify-center font-black text-lg">
                    {category.name.charAt(0)}
                  </div>
                  <h3 className="text-3xl font-black text-slate-800 tracking-tighter">
                    {category.name}
                  </h3>
                </div>
                <div className="h-[2px] w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-24 bg-emerald-600 rounded-full group-hover:w-full transition-all duration-1000 ease-in-out opacity-30" />
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
      </section>
    </div>
  );
}
