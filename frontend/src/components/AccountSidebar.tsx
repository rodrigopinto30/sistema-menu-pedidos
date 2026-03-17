"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Package,
  User,
  ChevronRight,
  UtensilsCrossed,
  Menu,
} from "lucide-react";
import { Button } from "./ui/button";

interface AccountSidebarProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export function AccountSidebar({
  isExpanded,
  setIsExpanded,
}: AccountSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Main Menu", href: "/", icon: UtensilsCrossed },
    { name: "My Orders", href: "/account/order", icon: Package },
    { name: "My Profile", href: "/account/profile", icon: User },
  ];

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
            href="/"
            className="flex items-center gap-2 font-black text-xl text-orange-600 animate-in fade-in duration-500"
          >
            <UtensilsCrossed className="h-6 w-6" />
            <span>Foodie</span>
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
        {navItems.map((item) => {
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
                  <span className="font-semibold text-sm animate-in slide-in-from-left-2 duration-300">
                    {item.name}
                  </span>
                )}
              </div>
              {isExpanded
                ? isActive && <ChevronRight className="h-4 w-4 opacity-70" />
                : isActive && (
                    <div className="absolute -left-3 w-1.5 h-8 bg-orange-600 rounded-r-full" />
                  )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
