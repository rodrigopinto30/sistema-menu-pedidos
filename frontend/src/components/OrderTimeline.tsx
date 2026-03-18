"use client";

import React from "react";
import {
  CheckCircle2,
  Clock,
  Package,
  Utensils,
  XCircle,
  MapPin,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface HistoryItem {
  status: string;
  comment: string;
  changed_at: string;
}

const statusConfig: Record<
  string,
  { icon: any; color: string; bgColor: string; label: string }
> = {
  pending: {
    icon: Package,
    color: "text-slate-400",
    bgColor: "bg-slate-50",
    label: "Order Received",
  },
  preparing: {
    icon: Utensils,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    label: "In Kitchen",
  },
  ready: {
    icon: Clock,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    label: "Ready for Pickup",
  },
  delivered: {
    icon: CheckCircle2,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    label: "Successfully Delivered",
  },
  cancelled: {
    icon: XCircle,
    color: "text-red-500",
    bgColor: "bg-red-50",
    label: "Cancelled",
  },
};

export default function OrderTimeline({ history }: { history: HistoryItem[] }) {
  return (
    <div className="relative space-y-12 before:absolute before:inset-0 before:left-5 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-emerald-500/20 before:via-slate-100 before:to-transparent">
      {history.map((item, index) => {
        const config = statusConfig[item.status] || {
          icon: MapPin,
          color: "text-slate-400",
          bgColor: "bg-slate-50",
          label: item.status,
        };
        const Icon = config.icon;
        const isLast = index === 0;

        return (
          <div
            key={index}
            className="relative flex items-start gap-8 group animate-in slide-in-from-left-4 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={cn(
                "relative z-10 flex items-center justify-center w-10 h-10 rounded-2xl border-4 border-white transition-transform duration-500 group-hover:scale-110 shadow-sm",
                isLast ? "bg-emerald-600 shadow-emerald-200" : "bg-slate-100",
              )}
            >
              <Icon
                className={cn("w-5 h-5", isLast ? "text-white" : config.color)}
              />
            </div>

            <div
              className={cn(
                "flex-1 p-5 rounded-[24px] border transition-all duration-300",
                isLast
                  ? "bg-emerald-50/30 border-emerald-100 shadow-sm"
                  : "bg-white border-slate-50",
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "font-black tracking-tighter text-base",
                      isLast ? "text-emerald-900" : "text-slate-800",
                    )}
                  >
                    {config.label}
                  </span>
                  {isLast && (
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </div>
                <time
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                    isLast
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-400",
                  )}
                >
                  {format(new Date(item.changed_at), "h:mm a · MMM d")}
                </time>
              </div>
              <p
                className={cn(
                  "text-sm font-medium leading-relaxed",
                  isLast ? "text-emerald-700/80" : "text-slate-500",
                )}
              >
                {item.comment}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
