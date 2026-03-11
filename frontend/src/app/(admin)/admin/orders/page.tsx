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
import { Loader2, Eye, ShoppingCart, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

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
          body { font-family: 'Courier New', Courier, monospace; width: 300px; padding: 20px; color: #000; }
          .header { text-align: center; border-bottom: 1px dashed #000; padding-bottom: 10px; margin-bottom: 10px; }
          .total { border-top: 1px dashed #000; margin-top: 10px; padding-top: 10px; font-weight: bold; font-size: 1.2em; }
          table { width: 100%; border-collapse: collapse; }
          .footer { text-align: center; margin-top: 20px; font-size: 0.8em; }
          @media print { .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>FOODIE APP</h2>
          <p>Order ID: #MD-${order.id}</p>
          <p>Date: ${new Date(order.created_at).toLocaleString()}</p>
        </div>
        <div>
          <p><strong>Customer:</strong> ${order.customer_name}</p>
          <p><strong>Address:</strong> ${order.customer_address}</p>
          <p><strong>Phone:</strong> ${order.customer_phone}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th style="text-align: left;">Item</th>
              <th style="text-align: right;">Subt.</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        <div class="total">
          <div style="display: flex; justify-content: space-between;">
            <span>TOTAL:</span>
            <span>$${order.total_price}</span>
          </div>
        </div>
        <div class="footer">
          <p>Thank you for your order!</p>
        </div>
        <script>
          window.onload = function() { window.print(); window.close(); };
        </script>
      </body>
    </html>
  `);
    printWindow.document.close();
  };

  useEffect(() => {
    api
      .get("/orders")
      .then((res: any) => setOrders(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="p-8 flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Customer Orders</h1>

      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs text-gray-500">
                  #{order.id}
                </TableCell>
                <TableCell>
                  {new Date(order.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-medium">
                  {order.customer_name}
                </TableCell>
                <TableCell className="font-bold">
                  ${order.total_price}
                </TableCell>
                <TableCell>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none capitalize">
                    {order.status || "Pending"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4 text-gray-500" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-md">
                      <DialogHeader className="flex flex-row items-center justify-between">
                        <DialogTitle className="flex items-center gap-2">
                          <ShoppingCart className="h-5 w-5 text-orange-600" />
                          Order Details #{selectedOrder?.id}
                        </DialogTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePrint(selectedOrder)}
                          className="cursor-pointer mr-4 gap-2"
                        >
                          <Printer className="h-4 w-4" /> Print Ticket
                        </Button>
                      </DialogHeader>

                      <div className="mt-4 space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg space-y-1 text-sm">
                          <p>
                            <strong>Customer:</strong>{" "}
                            {selectedOrder?.customer_name}
                          </p>
                          <p>
                            <strong>Phone:</strong>{" "}
                            {selectedOrder?.customer_phone}
                          </p>
                          <p>
                            <strong>Address:</strong>{" "}
                            {selectedOrder?.customer_address}
                          </p>
                          {selectedOrder?.notes && (
                            <p>
                              <strong>Notes:</strong> {selectedOrder.notes}
                            </p>
                          )}
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900 border-b pb-1">
                            Products
                          </h4>
                          {selectedOrder?.items?.map((item: any) => (
                            <div
                              key={item.id}
                              className="flex justify-between items-center text-sm"
                            >
                              <div className="flex gap-2">
                                <span className="text-orange-600 font-bold">
                                  {item.quantity}x
                                </span>
                                <span>{item.product?.name}</span>
                              </div>
                              <span className="text-gray-600">
                                ${item.price_at_time * item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 border-t flex justify-between items-center font-bold text-lg">
                          <span>Total Paid:</span>
                          <span className="text-orange-600">
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
