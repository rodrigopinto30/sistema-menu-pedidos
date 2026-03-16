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
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-6 font-bold text-xl text-orange-600">My Account</div>
        <nav className="mt-4">
          <a
            href="#"
            className="block px-6 py-3 bg-orange-50 text-orange-600 border-l-4 border-orange-600 font-medium"
          >
            Orders
          </a>
          <a
            href="#"
            className="block px-6 py-3 text-gray-600 hover:bg-gray-50"
          >
            Profile
          </a>
          <a
            href="#"
            className="block px-6 py-3 text-gray-600 hover:bg-gray-50"
          >
            Settings
          </a>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Your Purchases</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            {orders.map((order) => (
              <Card
                key={order.id}
                className={`cursor-pointer transition-all hover:shadow-md ${selectedOrder?.id === order.id ? "border-orange-500 ring-1 ring-orange-500" : ""}`}
                onClick={() => setSelectedOrder(order)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold">Order #{order.id}</p>
                      <p
                        className={cn(
                          "text-[10px] uppercase font-bold px-2 py-0.5 rounded border inline-block mt-1",
                          getStatusStyles(order.status),
                        )}
                      >
                        {order.status}
                      </p>
                    </div>
                    <p className="font-semibold text-orange-600">
                      ${order.total_price}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="md:col-span-2">
            {selectedOrder ? (
              <Card className="overflow-hidden">
                <CardHeader className="border-b bg-white">
                  <div className="flex justify-between items-center">
                    <CardTitle>Tracking Order #{selectedOrder.id}</CardTitle>
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
                  <div className="flex items-start space-x-4 mb-10 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200">
                      <Package className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Items in this order
                      </p>
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {selectedOrder.items
                          .map((i: any) => `${i.quantity}x ${i.product.name}`)
                          .join(", ")}
                      </p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="pl-2">
                    <OrderTimeline history={selectedOrder.history} />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed rounded-2xl bg-white text-gray-400">
                <Package className="w-12 h-12 mb-4 opacity-20" />
                <p className="font-medium">Select an order to see its status</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
