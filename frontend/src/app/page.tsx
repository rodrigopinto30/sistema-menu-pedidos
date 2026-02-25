"use client";

import { useState } from "react";
import { placeOrder, OrderPayload } from "@/services/orderServices";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { CheckoutForm } from "@/components/CheckoutForm";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const mockCartItems = [
    { product_id: 3, quantity: 2 },
    { product_id: 3, quantity: 1 },
  ];

  const handleSuccess = () => {
    console.log("🏆 Order placed from the UI!");
    alert("Check your database! The order should be there.");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-12">
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Test 1: Checkout Form (Real UI)
        </h2>
        <CheckoutForm cartItems={mockCartItems} onSuccess={handleSuccess} />
      </section>

      <hr className="border-t border-gray-200" />

      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Test 2: Quick Order Button (Previous Test)
        </h2>
        <Button
          onClick={async () => {
            setIsLoading(true);
            try {
              await placeOrder({
                customer_name: "Pepe Fast",
                customer_phone: "1122334455",
                customer_address: "Fast Track 123",
                items: [{ product_id: 1, quantity: 1 }],
              });
              alert("✅ Quick order worked!");
            } catch (e) {
              alert("❌ Fail");
            } finally {
              setIsLoading(false);
            }
          }}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Fast Order
        </Button>
      </section>
    </div>
  );
}
