"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Eye,
  ShoppingCart,
  Printer,
  Save,
  CheckCircle2,
  Calendar,
  Hash,
  User,
  MapPin,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const getStatusStyles = (status: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-slate-100 text-slate-600 border-slate-200";
    case "preparing":
      return "bg-blue-50 text-blue-600 border-blue-100";
    case "ready":
      return "bg-indigo-50 text-indigo-600 border-indigo-100";
    case "delivered":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "cancelled":
      return "bg-rose-50 text-rose-600 border-rose-100";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [tempStatus, setTempStatus] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    api
      .get("/orders")
      .then((res: any) => setOrders(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handlePrint = (order: any) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    const itemsHtml = order.items
      .map(
        (item: any) => `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${item.quantity}x ${item.product?.name}</td>
        <td style="text-align: right; padding: 8px 0; border-bottom: 1px solid #eee;">$${(item.price_at_time * item.quantity).toFixed(2)}</td>
      </tr>`,
      )
      .join("");

    printWindow.document.write(`
      <html>
        <head><style>body { font-family: sans-serif; width: 300px; padding: 20px; }</style></head>
        <body>
          <h2>Order #${order.id}</h2>
          <table><tbody>${itemsHtml}</tbody></table>
          <p><strong>TOTAL: $${order.total_price}</strong></p>
          <script>window.onload = () => { window.print(); window.close(); };</script>
        </body>
      </html>`);
    printWindow.document.close();
  };

  const confirmUpdateStatus = async () => {
    if (!selectedOrder || !tempStatus) return;
    setIsUpdating(true);
    try {
      await api.patch(`/orders/${selectedOrder.id}/status`, {
        status: tempStatus,
      });
      setOrders((prev) =>
        prev.map((o) =>
          o.id === selectedOrder.id ? { ...o, status: tempStatus } : o,
        ),
      );
      setSelectedOrder({ ...selectedOrder, status: tempStatus });
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-slate-400 font-black text-sm uppercase tracking-widest">
          Processing Orders...
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-full border border-blue-100/50 mb-2">
            <ClipboardList className="h-3.5 w-3.5" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em]">
              Order Logs
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">
            Order <span className="text-blue-600">Management</span>
          </h1>
        </div>
        <Badge className="bg-white border-slate-100 text-slate-500 font-black px-4 py-2 rounded-2xl shadow-sm text-xs">
          {orders.length} RECORDS
        </Badge>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-b border-slate-100">
              <TableHead className="py-5 px-6 font-black text-[11px] uppercase tracking-widest text-slate-400">
                ID
              </TableHead>
              <TableHead className="py-5 font-black text-[11px] uppercase tracking-widest text-slate-400">
                Customer
              </TableHead>
              <TableHead className="py-5 font-black text-[11px] uppercase tracking-widest text-slate-400">
                Total
              </TableHead>
              <TableHead className="py-5 font-black text-[11px] uppercase tracking-widest text-slate-400">
                Status
              </TableHead>
              <TableHead className="py-5 px-6 text-right font-black text-[11px] uppercase tracking-widest text-slate-400">
                Details
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="group border-b border-slate-50 hover:bg-blue-50/30 transition-colors"
              >
                <TableCell className="py-5 px-6 font-mono text-xs text-slate-400">
                  #ORD-{order.id}
                </TableCell>
                <TableCell className="py-5 font-black text-slate-800">
                  {order.customer_name}
                </TableCell>
                <TableCell className="py-5 font-black text-slate-900">
                  ${order.total_price}
                </TableCell>
                <TableCell className="py-5">
                  <Badge
                    className={cn(
                      "capitalize font-black text-[10px] tracking-widest border px-3 py-1 rounded-lg",
                      getStatusStyles(order.status),
                    )}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-5 px-6 text-right">
                  <Dialog
                    onOpenChange={(open: any) => {
                      if (open) {
                        setSelectedOrder(order);
                        setTempStatus(order.status);
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-slate-400 hover:text-blue-600 rounded-xl cursor-pointer"
                      >
                        <Eye className="h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md border-none rounded-[32px] shadow-2xl overflow-hidden p-0 bg-white">
                      <div className="bg-blue-600 h-1.5 w-full" />
                      <div className="p-8 space-y-6">
                        <DialogHeader className="flex flex-row items-center justify-between pb-2">
                          <DialogTitle className="text-2xl font-black tracking-tighter">
                            Order <span className="text-blue-600">Details</span>
                          </DialogTitle>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePrint(selectedOrder)}
                            className="cursor-pointer rounded-xl font-black text-[10px] uppercase h-10 px-4"
                          >
                            <Printer className="h-4 w-4 mr-2" /> Print
                          </Button>
                        </DialogHeader>

                        <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-6 rounded-[24px] border border-slate-100">
                          <div className="space-y-1">
                            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">
                              Customer
                            </p>
                            <p className="font-black text-slate-900 text-sm">
                              {selectedOrder?.customer_name}
                            </p>
                          </div>
                          <div className="space-y-1 text-right">
                            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">
                              Phone
                            </p>
                            <p className="font-black text-slate-900 text-sm">
                              {selectedOrder?.customer_phone}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />{" "}
                            Summary
                          </h4>
                          <div className="max-h-[180px] overflow-y-auto space-y-2">
                            {selectedOrder?.items?.map((item: any) => (
                              <div
                                key={item.id}
                                className="flex justify-between items-center p-3 rounded-2xl bg-white border border-slate-50"
                              >
                                <span className="text-slate-800 font-bold text-xs">
                                  {item.quantity}x {item.product?.name}
                                </span>
                                <span className="text-slate-900 font-black text-xs">
                                  $
                                  {(item.price_at_time * item.quantity).toFixed(
                                    2,
                                  )}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t space-y-4">
                          <div className="flex gap-2 items-center">
                            <Select
                              value={tempStatus}
                              onValueChange={setTempStatus}
                            >
                              <SelectTrigger
                                className={cn(
                                  "flex-1 h-11 rounded-full font-black text-[10px] uppercase tracking-widest border-2 transition-all px-5",
                                  getStatusStyles(tempStatus),
                                )}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
                                {[
                                  "pending",
                                  "preparing",
                                  "ready",
                                  "delivered",
                                  "cancelled",
                                ].map((s) => (
                                  <SelectItem
                                    key={s}
                                    value={s}
                                    className="capitalize font-bold text-xs py-2.5 focus:bg-blue-50 focus:text-blue-600 rounded-lg cursor-pointer"
                                  >
                                    {s}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <Button
                              onClick={confirmUpdateStatus}
                              disabled={
                                isUpdating ||
                                tempStatus === selectedOrder?.status
                              }
                              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-black w-11 h-11 rounded-full shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 disabled:shadow-none p-0 flex items-center justify-center shrink-0"
                            >
                              {isUpdating ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Save className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="pt-4 flex justify-between items-center">
                          <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                            Total
                          </span>
                          <span className="text-3xl font-black text-slate-900 tracking-tighter">
                            ${selectedOrder?.total_price}
                          </span>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
