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
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function CheckoutForm({
  onSuccess,
  categories,
}: {
  onSuccess: () => void;
  categories: any[];
}) {
  const { items, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
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
        onSuccess();

        toast.success("Order placed successfully!", {
          description: "Your delicious meal is now being prepared.",
          duration: 5000,
        });

        router.push(`/account/order?last_order=${orderId}`);
      }
    } catch (error: any) {
      toast.error("Order failed", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">
      <motion.div
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
              onValueChange={(values: any) =>
                setFormData({ ...formData, phone: values.formattedValue })
              }
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
    </div>
  );
}
