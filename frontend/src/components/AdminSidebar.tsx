"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Settings,
  Store,
  ChevronRight,
  Menu,
  LogOut,
  ListTree,
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
    <div className="flex flex-col h-full bg-white">
      <div
        className={cn(
          "p-4 border-b border-gray-100 flex items-center",
          isExpanded ? "justify-between" : "justify-center",
        )}
      >
        {isExpanded && (
          <Link
            href="/admin"
            className="flex items-center gap-2 font-black text-xl text-orange-600 animate-in fade-in duration-500"
          >
            <LayoutDashboard className="h-6 w-6" />
            <span>FoodieAdmin</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer text-gray-500 hover:text-orange-600 hover:bg-orange-50"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      <nav className="flex-1 p-3 space-y-4 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center rounded-xl transition-all duration-200 relative",
                isExpanded ? "px-3 py-3 justify-between" : "p-3 justify-center",
                isActive
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className={cn(
                    "h-6 w-6",
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:scale-110",
                  )}
                />
                {isExpanded && (
                  <span className="font-semibold text-sm">{item.name}</span>
                )}
              </div>
              {!isExpanded && isActive && (
                <div className="absolute -left-3 w-1.5 h-8 bg-orange-600 rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
