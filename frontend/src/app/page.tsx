"use client";

import { useEffect, useState } from "react";
import { Category, getMenu } from "@/services/productServices";
import { ProductCard } from "@/components/ProductCard";
import { CheckoutForm } from "@/components/CheckoutForm";
import { useCartStore } from "@/store/useCartStore";
import { Loader2, ShoppingCart } from "lucide-react";

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
        console.error("Error fetching menu:", error);
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
    <main className="p-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-10 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Menú Rodri</h1>
          <p className="text-gray-500 text-sm">Elige tus productos favoritos</p>
        </div>

        <div className="flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold shadow-sm">
          <ShoppingCart className="mr-2 h-5 w-5" />
          <span>Carrito: {totalItems} items</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="space-y-10">
          {categories.map((category) => (
            <div key={category.id} className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 bg-gray-50 p-2 rounded">
                {category.name}
              </h2>
              <div className="grid gap-4">
                {category.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="bg-white p-6 rounded-xl border shadow-sm h-fit sticky top-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Finalizar Pedido
          </h2>
          <CheckoutForm onSuccess={() => alert("¡Pedido enviado con éxito!")} />
        </section>
      </div>
    </main>
  );
}
