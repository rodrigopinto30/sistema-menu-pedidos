"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Store,
  ChevronRight,
  Menu,
  ListTree,
  X,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Categories", href: "/admin/categories", icon: ListTree },
  { name: "Back to Store", href: "/", icon: Store },
];

export function AdminSidebar({ isExpanded, setIsExpanded }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-[4px] z-[60] animate-in fade-in duration-500"
          onClick={() => setIsExpanded(false)}
        />
      )}

      <div
        className={cn(
          "fixed left-0 top-0 h-screen bg-white z-[70] transition-all duration-500 ease-in-out border-r border-slate-50 flex flex-col overflow-hidden",
          isExpanded ? "w-72 shadow-2xl shadow-blue-900/10" : "w-20",
        )}
      >
        <div
          className={cn(
            "p-6 flex items-center h-28 transition-all duration-500",
            isExpanded ? "justify-between" : "justify-center",
          )}
        >
          {isExpanded ? (
            <>
              <Link
                href="/admin"
                className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-700"
              >
                <div className="bg-blue-600 p-2.5 rounded-[14px] shadow-lg shadow-blue-100">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-black text-slate-900 tracking-tighter">
                  Admin<span className="text-blue-600">Panel</span>
                </span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
                className="cursor-pointer text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all h-9 w-9"
              >
                <X className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(true)}
              className="cursor-pointer bg-slate-50 text-slate-400 rounded-2xl h-12 w-12 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 border border-slate-100/50"
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isExpanded && setIsExpanded(false)}
                className={cn(
                  "group flex items-center rounded-2xl transition-all duration-300 relative cursor-pointer",
                  isExpanded
                    ? "px-4 py-3.5 justify-between"
                    : "h-12 w-12 mx-auto justify-center",
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                    : "text-slate-500 hover:bg-blue-50 hover:text-blue-700",
                )}
              >
                <div className="flex items-center gap-4">
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                      isActive ? "text-white" : "text-slate-400",
                    )}
                  />
                  {isExpanded && (
                    <span className="font-bold text-sm tracking-tight whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-500">
                      {item.name}
                    </span>
                  )}
                </div>
                {isExpanded && isActive && (
                  <ChevronRight className="h-4 w-4 opacity-50" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-8 mt-auto border-t border-slate-50">
          {isExpanded ? (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                System Management
              </p>
              <p className="text-xs font-bold text-slate-400 mt-1">
                v2.0.4 - 2026 🛡️
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-200" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
