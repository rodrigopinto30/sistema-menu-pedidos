"use client";

import { placeOrder } from "../lib/api";
import { Button } from "@/components/ui/button";

export default function Home() {
  const testOrder = async () => {
    try {
      const response = await placeOrder({
        customer_name: "pepe",
        customer_phone: "1122334455",
        customer_address: "Calle Falsa 123",
        items: [
          {
            product_id: 3,
            quantity: 2,
          },
        ],
      });
      console.log("✅ ORDEN CREADA:", response.data);
    } catch (error) {
      console.error("❌ ERROR DE VALIDACIÓN:", error.response.data);
    }
  };
  return (
    <div>
      <Button onClick={() => testOrder()}>test</Button>
    </div>
  );
}
