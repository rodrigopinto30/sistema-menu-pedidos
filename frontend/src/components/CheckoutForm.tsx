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
import { CheckCircle2, ShoppingBag } from "lucide-react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await placeOrder({
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_address: formData.address,
        items: items,
      });
      clearCart();
      setIsOrdered(true);
      onSuccess();
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center p-8 text-center bg-green-50 rounded-xl border border-green-200"
          >
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-green-800">
              Order Received!
            </h2>
            <p className="text-green-700 mt-2">
              Thanks <strong>{formData.name}</strong>! Your order is on the way.
            </p>
            <Button
              variant="outline"
              className="mt-6 border-green-600 text-green-700 hover:bg-green-100"
              onClick={() => setIsOrdered(false)}
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> Order More
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white p-6 rounded-xl border shadow-sm"
          >
            <CartSummary categories={categories} />
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2 flex flex-col">
                <Label htmlFor="phone">Phone Number</Label>
                <PatternFormat
                  format="(###) ###-####"
                  mask="_"
                  customInput={Input}
                  id="phone"
                  required
                  value={formData.phone}
                  onValueChange={(values: any) => {
                    setFormData({ ...formData, phone: values.formattedValue });
                  }}
                  placeholder="(555) 000-0000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Input
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg"
                disabled={loading || items.length === 0}
              >
                {loading ? "Processing..." : "Confirm Order"}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
