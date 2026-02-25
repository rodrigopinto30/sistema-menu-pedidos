"use client";

import { useState } from "react";
import { placeOrder, OrderPayload } from "@/services/orderServices";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleTestOrder = async () => {
    setIsLoading(true);
    const payload: OrderPayload = {
      customer_name: "Pepe",
      customer_phone: "1122334455",
      customer_address: "Calle Falsa 123",
      items: [{ product_id: 3, quantity: 2 }],
    };

    try {
      const response = await placeOrder(payload);
      alert("✅ Orden #" + response.data.order.id + " creada!");
    } catch (error: any) {
      alert("❌ Error: " + (error.response?.data?.message || "Algo falló"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <Button onClick={handleTestOrder} disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Probar Pedido
      </Button>
    </div>
  );
}
