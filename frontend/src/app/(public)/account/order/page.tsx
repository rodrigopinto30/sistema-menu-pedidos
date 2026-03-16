"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import OrderTimeline from "@/components/OrderTimeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { getStatusStyles } from "@/lib/consts/order-constants";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders");
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Mis Compras
        </h1>
        <p className="text-gray-500 text-sm">
          Sigue el estado de tus pedidos en tiempo real.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-4">
          {orders.length === 0 ? (
            <p className="text-gray-400 text-sm italic">
              No tienes pedidos realizados aún.
            </p>
          ) : (
            orders.map((order) => (
              <Card
                key={order.id}
                className={cn(
                  "cursor-pointer transition-all hover:border-orange-200 shadow-sm",
                  selectedOrder?.id === order.id
                    ? "border-orange-500 ring-1 ring-orange-500 bg-orange-50/30"
                    : "border-transparent",
                )}
                onClick={() => setSelectedOrder(order)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-900">
                        Pedido #{order.id}
                      </p>
                      <p
                        className={cn(
                          "text-[10px] uppercase font-bold px-2 py-0.5 rounded border inline-block mt-1 shadow-sm",
                          getStatusStyles(order.status),
                        )}
                      >
                        {order.status}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-orange-600">
                        ${order.total_price}
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="lg:col-span-8">
          {selectedOrder ? (
            <Card className="overflow-hidden border-none shadow-xl bg-white">
              <CardHeader className="border-b bg-white/50 backdrop-blur-sm">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Package className="h-5 w-5 text-orange-600" />
                    </div>
                    <CardTitle className="text-xl">
                      Seguimiento del Pedido #{selectedOrder.id}
                    </CardTitle>
                  </div>
                  <Badge
                    className={cn(
                      "capitalize font-semibold border-2 shadow-none px-3 py-1",
                      getStatusStyles(selectedOrder.status),
                    )}
                  >
                    {selectedOrder.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-10 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Productos solicitados
                    </p>
                    <p className="text-slate-700 font-medium text-sm leading-relaxed">
                      {selectedOrder.items
                        .map((i: any) => `${i.quantity}x ${i.product.name}`)
                        .join(", ")}
                    </p>
                  </div>
                </div>

                <div className="px-2">
                  <OrderTimeline history={selectedOrder.history} />
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-[400px] flex flex-col items-center justify-center border-2 border-dashed rounded-3xl bg-white/50 text-gray-400">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Package className="w-10 h-10 opacity-30" />
              </div>
              <p className="font-medium">
                Selecciona un pedido para ver su progreso
              </p>
              <p className="text-xs">
                Aquí aparecerá la línea de tiempo de tu envío.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
