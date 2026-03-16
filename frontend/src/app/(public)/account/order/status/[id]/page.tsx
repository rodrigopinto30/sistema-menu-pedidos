"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, Clock, MapPin, Package } from "lucide-react";

export default function OrderStatusPage() {
  const params = useParams();
  const id = params?.id;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || id === "undefined") return;

    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (error) {
        console.error("Order not found en el backend");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    const interval = setInterval(fetchOrder, 30000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        <p className="text-gray-500 font-medium">
          Cargando detalles de tu pedido...
        </p>
      </div>
    );

  if (!order)
    return <div className="p-8 text-center">Orden no encontrada.</div>;

  const statusColors: any = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    preparing: "bg-blue-100 text-blue-700 border-blue-200",
    shipped: "bg-purple-100 text-purple-700 border-purple-200",
    delivered: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <main className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-2">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-black text-gray-900">¡Pedido Recibido!</h1>
        <p className="text-gray-500 tracking-tight">
          Orden #{order.id} — Gracias por elegirnos.
        </p>
      </div>

      <Card className="border-2 border-orange-100 shadow-sm overflow-hidden">
        <CardHeader className="bg-orange-50/50 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" /> Estado del Pedido
            </CardTitle>
            <Badge
              className={
                statusColors[order.status] || "bg-gray-100 text-gray-700"
              }
            >
              {order.status.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Package className="h-4 w-4" /> Resumen
            </h3>
            <div className="divide-y border-t border-b">
              {order.items?.map((item: any) => (
                <div
                  key={item.id}
                  className="py-3 flex justify-between text-sm"
                >
                  <span>
                    <span className="font-bold">{item.quantity}x</span>{" "}
                    {item.product?.name}
                  </span>
                  <span className="font-mono font-semibold">
                    ${(item.price || item.product?.price || 0) * item.quantity}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-2 text-xl font-black">
              <span>Total</span>
              <span className="text-orange-600">${order.total_price}</span>
            </div>
          </div>

          <hr />

          <div className="space-y-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Detalles de Entrega
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
              <p className="font-bold text-gray-800">{order.customer_name}</p>
              <p>{order.customer_address}</p>
              <p>Tel: {order.customer_phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
