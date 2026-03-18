"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PatternFormat } from "react-number-format";
import { placeOrder } from "@/services/orderServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/store/useCartStore";
import { CartSummary } from "./CartSummary";
import { CheckCircle2, ShoppingBag, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function CheckoutForm({
  onSuccess,
  categories,
}: {
  onSuccess: () => void;
  categories: any[];
}) {
  const { items, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await placeOrder({
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_address: formData.address,
        items: items,
      });

      const orderId = response.data.order?.id;

      if (orderId) {
        clearCart();
        setIsOrdered(true);
        onSuccess();
        router.push(`/order/status/${orderId}`);
      }
    } catch (error: any) {
      alert("Error processing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait">
        {isOrdered ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-10 text-center bg-emerald-50/50 rounded-[32px] border-none"
          >
            <div className="bg-emerald-100 p-4 rounded-full mb-4">
              <CheckCircle2 className="h-12 w-12 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tighter">
              Order Received!
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              Thanks <strong>{formData.name}</strong>! Your order is being
              prepared.
            </p>
            <Button
              variant="outline"
              className="mt-8 rounded-2xl border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 transition-all font-bold px-8"
              onClick={() => setIsOrdered(false)}
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> Order More
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[24px] border-none"
          >
            <CartSummary categories={categories} />

            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1"
                >
                  Full Name
                </Label>
                <Input
                  id="name"
                  required
                  placeholder="John Doe"
                  className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-emerald-500/20 focus:border-emerald-500 transition-all px-4"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1"
                >
                  Phone Number
                </Label>
                <PatternFormat
                  format="(###) ###-####"
                  mask="_"
                  customInput={Input}
                  id="phone"
                  required
                  className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-emerald-500/20 focus:border-emerald-500 transition-all px-4"
                  value={formData.phone}
                  onValueChange={(values: any) => {
                    setFormData({ ...formData, phone: values.formattedValue });
                  }}
                  placeholder="(555) 000-0000"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="address"
                  className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1"
                >
                  Delivery Address
                </Label>
                <Input
                  id="address"
                  required
                  placeholder="123 Street, City"
                  className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-emerald-500/20 focus:border-emerald-500 transition-all px-4"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <Button
                type="submit"
                className={cn(
                  "cursor-pointer w-full h-14 rounded-[20px] text-base font-bold transition-all border-none active:scale-[0.98]",
                  loading || items.length === 0
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-none",
                )}
                disabled={loading || items.length === 0}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Confirm Order"
                )}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
