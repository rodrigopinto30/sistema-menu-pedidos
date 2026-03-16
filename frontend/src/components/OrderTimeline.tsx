import React from "react";
import { CheckCircle2, Clock, Package, Truck, Utensils } from "lucide-react";
import { format } from "date-fns";

interface HistoryItem {
  status: string;
  comment: string;
  changed_at: string;
}

const statusConfig: Record<
  string,
  { icon: any; color: string; label: string }
> = {
  pending: { icon: Package, color: "text-slate-500", label: "Order Placed" },
  preparing: { icon: Utensils, color: "text-amber-500", label: "Preparing" },
  ready: { icon: Clock, color: "text-indigo-500", label: "Ready to Pick Up" },
  delivered: {
    icon: CheckCircle2,
    color: "text-emerald-500",
    label: "Delivered",
  },
  cancelled: { icon: Package, color: "text-red-500", label: "Cancelled" },
};

export default function OrderTimeline({ history }: { history: HistoryItem[] }) {
  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
      {history.map((item, index) => {
        const config = statusConfig[item.status] || {
          icon: Clock,
          color: "text-gray-500",
          label: item.status,
        };
        const Icon = config.icon;

        return (
          <div
            key={index}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <Icon className={`w-5 h-5 ${config.color}`} />
            </div>

            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow">
              <div className="flex items-center justify-between space-x-2 mb-1">
                <div className="font-bold text-slate-900">{config.label}</div>
                <time className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                  {format(new Date(item.changed_at), "MMM d, h:mm a")}
                </time>
              </div>
              <div className="text-slate-500 text-sm">{item.comment}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
