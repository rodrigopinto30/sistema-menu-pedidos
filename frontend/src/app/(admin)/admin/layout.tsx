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
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-100">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-orange-600"
          >
            <Store className="h-6 w-6" />
            <span>FoodieAdmin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-orange-50 text-orange-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      isActive ? "text-orange-600" : "text-gray-400",
                    )}
                  />
                  {item.name}
                </div>
                {isActive && <ChevronRight className="h-4 w-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold">
              A
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900 leading-none">
                Admin User
              </p>
              <p className="text-xs text-gray-500 mt-1">admin@foodie.com</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 md:hidden">
          <Store className="h-6 w-6 text-orange-600 mr-2" />
          <span className="font-bold">FoodieAdmin</span>
        </header>

        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}
