"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import OrderTimeline from "@/components/OrderTimeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ChevronRight, ShoppingBag, Clock } from "lucide-react";
import { getStatusStyles } from "@/lib/consts/order-constants";
import { cn } from "@/lib/utils";

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
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10 animate-in fade-in duration-700">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100/50">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-[10px] font-black uppercase tracking-[0.15em]">
            History
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
          My <span className="text-emerald-600">Orders</span>
        </h1>
        <p className="text-slate-500 font-medium tracking-tight">
          Track the status of your orders in real time.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-4">
          {orders.length === 0 ? (
            <div className="p-10 text-center bg-slate-50 rounded-[32px] border-none">
              <ShoppingBag className="h-10 w-10 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 font-medium italic text-sm">
                You haven't placed any orders yet.
              </p>
            </div>
          ) : (
            orders.map((order) => {
              const isSelected = selectedOrder?.id === order.id;
              return (
                <div
                  key={order.id}
                  className={cn(
                    "group cursor-pointer p-5 transition-all duration-300 rounded-[24px] border relative overflow-hidden",
                    isSelected
                      ? "bg-white border-emerald-500 ring-4 ring-emerald-500/5 translate-x-2"
                      : "bg-slate-50/50 border-slate-100 hover:bg-white hover:border-emerald-200",
                  )}
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex justify-between items-start relative z-10">
                    <div className="space-y-1.5">
                      <p className="font-black text-slate-800 tracking-tight">
                        Order #{order.id}
                      </p>
                      <div
                        className={cn(
                          "text-[10px] uppercase font-black px-2.5 py-1 rounded-lg inline-block tracking-wider",
                          "bg-white border border-slate-100 shadow-sm text-slate-600",
                        )}
                      >
                        {order.status}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-black text-emerald-600 text-lg tracking-tighter">
                        ${order.total_price}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20">
                      <ChevronRight className="h-12 w-12 text-emerald-600" />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="lg:col-span-8">
          {selectedOrder ? (
            <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden transition-all duration-500 animate-in zoom-in-95">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-600 p-3 rounded-2xl shadow-lg shadow-emerald-100">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tighter">
                      Order Tracking #{selectedOrder.id}
                    </h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                      Status:{" "}
                      <span className="text-emerald-600">
                        {selectedOrder.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-10">
                <div className="p-6 bg-slate-50/80 rounded-[24px] border border-slate-100/50">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                    Your Items
                  </p>
                  <p className="text-slate-700 font-bold text-base leading-relaxed tracking-tight">
                    {selectedOrder.items
                      .map((i: any) => `${i.quantity}x ${i.product.name}`)
                      .join(", ")}
                  </p>
                </div>

                <div className="px-2">
                  <OrderTimeline history={selectedOrder.history} />
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[500px] flex flex-col items-center justify-center rounded-[40px] border-2 border-dashed border-slate-100 bg-slate-50/30 text-slate-400 transition-all duration-500">
              <div className="bg-white p-6 rounded-[24px] shadow-sm mb-6 border border-slate-50">
                <Package className="w-12 h-12 text-emerald-100" />
              </div>
              <p className="font-black text-slate-800 text-lg tracking-tighter">
                Select an order
              </p>
              <p className="text-xs font-medium text-slate-400 mt-1 max-w-[200px] text-center">
                Choose a purchase from the left list to view its progress.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
