"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Package,
  User,
  Settings,
  ChevronRight,
  UtensilsCrossed,
} from "lucide-react";

export function AccountSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Menú Principal", href: "/", icon: UtensilsCrossed },
    { name: "Mis Pedidos", href: "/account/order", icon: Package },
    { name: "Mi Perfil", href: "/account/profile", icon: User },
    { name: "Configuración", href: "/account/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-100">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-orange-600"
        >
          <UtensilsCrossed className="h-6 w-6" />
          <span>Foodie</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
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
    </div>
  );
}
