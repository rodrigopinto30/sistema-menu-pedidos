"use client";

import { useState } from "react";
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
      alert("Error: " + (error.response?.data?.message || "Check your data"));
    } finally {
      setLoading(false);
    }
  };

  if (isOrdered) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-green-50 rounded-xl border border-green-200 animate-in fade-in zoom-in duration-300">
        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-green-800">Order Received!</h2>
        <p className="text-green-700 mt-2">
          Thank you, <strong>{formData.name}</strong>. Your food is on the way
          to <strong>{formData.address}</strong>.
        </p>
        <Button
          variant="outline"
          className="mt-6 border-green-600 text-green-700 hover:bg-green-100"
          onClick={() => setIsOrdered(false)}
        >
          <ShoppingBag className="mr-2 h-4 w-4" /> Order Something Else
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm h-fit">
      <CartSummary categories={categories} />
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 border rounded-lg shadow-sm"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
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
          className="w-full"
          disabled={loading || items.length === 0}
        >
          {loading ? "Processing..." : "Confirm Order"}
        </Button>
      </form>
    </div>
  );
}
