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
      return "bg-slate-100 text-slate-700 border-slate-200";
    case "preparing":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "ready":
      return "bg-indigo-100 text-indigo-700 border-indigo-200";
    case "delivered":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "cancelled":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700";
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
        <td style="padding: 5px 0;">${item.quantity}x ${item.product?.name}</td>
        <td style="text-align: right;">$${(item.price_at_time * item.quantity).toFixed(2)}</td>
      </tr>
    `,
      )
      .join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Ticket #MD-${order.id}</title>
          <style>
            body { font-family: 'Courier New', Courier, monospace; width: 280px; padding: 10px; color: #000; }
            .header { text-align: center; border-bottom: 1px dashed #000; padding-bottom: 10px; margin-bottom: 10px; }
            .total { border-top: 1px dashed #000; margin-top: 10px; padding-top: 10px; font-weight: bold; font-size: 1.1em; }
            table { width: 100%; border-collapse: collapse; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <div class="header"><h3>FOODIE APP</h3><p>Order #${order.id}</p></div>
          <table><tbody>${itemsHtml}</tbody></table>
          <div class="total"><div style="display:flex; justify-content:space-between;"><span>TOTAL:</span><span>$${order.total_price}</span></div></div>
          <script>window.onload = function() { window.print(); window.close(); };</script>
        </body>
      </html>
    `);
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
      console.error("Error updating status", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="p-8 flex justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-orange-500" />
      </div>
    );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Order Management
        </h1>
        <Badge
          variant="outline"
          className="px-3 py-1 text-gray-500 bg-white shadow-sm"
        >
          {orders.length} Total Orders
        </Badge>
      </div>

      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <TableCell className="font-mono text-xs text-gray-400">
                  #{order.id}
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {new Date(order.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-medium text-gray-900">
                  {order.customer_name}
                </TableCell>
                <TableCell className="font-bold text-gray-900">
                  ${order.total_price}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "capitalize font-semibold border-2 shadow-none px-2.5 py-0.5",
                      getStatusStyles(order.status),
                    )}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
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
                        className="cursor-pointer hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-md border-none shadow-2xl">
                      <DialogHeader className="flex flex-row items-center justify-between border-b pb-4">
                        <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                          <ShoppingCart className="h-5 w-5 text-orange-600" />
                          Order Details
                        </DialogTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePrint(selectedOrder)}
                          className="cursor-pointer gap-2 border-orange-200 text-orange-700 hover:bg-orange-50"
                        >
                          <Printer className="h-4 w-4" /> Print
                        </Button>
                      </DialogHeader>

                      <div className="py-4 space-y-5">
                        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl text-sm border border-gray-100">
                          <div className="space-y-1">
                            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                              Customer
                            </p>
                            <p className="font-semibold text-gray-900">
                              {selectedOrder?.customer_name}
                            </p>
                          </div>
                          <div className="space-y-1 text-right">
                            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                              Phone
                            </p>
                            <p className="font-semibold text-gray-900">
                              {selectedOrder?.customer_phone}
                            </p>
                          </div>
                          <div className="col-span-2 space-y-1">
                            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                              Delivery Address
                            </p>
                            <p className="font-medium text-gray-700 leading-tight">
                              {selectedOrder?.customer_address}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />{" "}
                            Items Summary
                          </h4>
                          <div className="max-h-[200px] overflow-y-auto pr-2 space-y-2">
                            {selectedOrder?.items?.map((item: any) => (
                              <div
                                key={item.id}
                                className="flex justify-between items-center text-sm p-2 rounded-lg hover:bg-gray-50"
                              >
                                <div className="flex gap-3 items-center">
                                  <span className="h-6 w-6 flex items-center justify-center bg-orange-100 text-orange-700 rounded text-xs font-bold">
                                    {item.quantity}
                                  </span>
                                  <span className="text-gray-700 font-medium">
                                    {item.product?.name}
                                  </span>
                                </div>
                                <span className="text-gray-900 font-bold">
                                  $
                                  {(item.price_at_time * item.quantity).toFixed(
                                    2,
                                  )}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t space-y-3">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Update Order Flow
                          </p>
                          <div className="flex gap-2">
                            <Select
                              value={tempStatus}
                              onValueChange={setTempStatus}
                            >
                              <SelectTrigger
                                className={cn(
                                  "flex-1 capitalize font-semibold transition-all",
                                  getStatusStyles(tempStatus),
                                )}
                              >
                                <SelectValue placeholder="Update Status" />
                              </SelectTrigger>
                              <SelectContent className="border-gray-200 shadow-xl">
                                <SelectItem
                                  value="pending"
                                  className="focus:bg-slate-50 focus:text-slate-700 text-slate-600"
                                >
                                  Pending
                                </SelectItem>
                                <SelectItem
                                  value="preparing"
                                  className="focus:bg-amber-50 focus:text-amber-700 text-amber-600"
                                >
                                  Preparing
                                </SelectItem>
                                <SelectItem
                                  value="ready"
                                  className="focus:bg-indigo-50 focus:text-indigo-700 text-indigo-600 font-medium"
                                >
                                  Ready to Dispatch
                                </SelectItem>
                                <SelectItem
                                  value="delivered"
                                  className="focus:bg-emerald-50 focus:text-emerald-700 text-emerald-600"
                                >
                                  Delivered
                                </SelectItem>
                                <SelectItem
                                  value="cancelled"
                                  className="focus:bg-red-50 focus:text-red-700 text-red-600 font-bold"
                                >
                                  Cancelled
                                </SelectItem>
                              </SelectContent>
                            </Select>

                            <Button
                              onClick={confirmUpdateStatus}
                              disabled={
                                isUpdating ||
                                tempStatus === selectedOrder?.status
                              }
                              className="bg-gray-900 hover:bg-black text-white px-6 shadow-lg shadow-gray-200 transition-all active:scale-95 cursor-pointer"
                            >
                              {isUpdating ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Save className="h-4 w-4 mr-2" />
                              )}
                              Update
                            </Button>
                          </div>
                        </div>

                        <div className="pt-4 border-t flex justify-between items-center font-black text-xl text-gray-900">
                          <span className="text-gray-400 text-sm font-bold uppercase">
                            Total Received
                          </span>
                          <span className="text-orange-600 font-mono tracking-tighter">
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
