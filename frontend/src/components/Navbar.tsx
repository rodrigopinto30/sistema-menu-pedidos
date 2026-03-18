"use client";

import {
  ShoppingCart,
  LogOut,
  User as UserIcon,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "./CartDrawer";

export function Navbar() {
  const totalItems = useCartStore((state: any) => state.getTotalItems());
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-md z-[50] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex-1" />

        <div className="flex items-center gap-6">
          {!isAuthPage ? (
            <>
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="cursor-pointer bg-transparent border-none flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-all duration-300 outline-none group text-left">
                      <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100 transition-colors group-hover:bg-emerald-100">
                        <UserIcon className="h-5 w-5" />
                      </div>
                      <div className="hidden md:flex flex-col">
                        <span className="text-sm font-bold text-slate-800 leading-none flex items-center gap-1.5">
                          {user.name}
                          <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium mt-1">
                          {user.email}
                        </span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-60 mt-2 p-2 rounded-2xl border-slate-100 shadow-xl shadow-slate-200/50"
                  >
                    <DropdownMenuLabel className="font-normal px-3 py-3">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold text-slate-900 leading-none">
                          My Account
                        </p>
                        <p className="text-[11px] leading-none text-slate-500 italic mt-1">
                          Signed in as {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-50" />

                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer rounded-xl focus:bg-emerald-50 focus:text-emerald-700 p-2.5"
                    >
                      <Link
                        href="/account/profile"
                        className="flex items-center w-full"
                      >
                        <Settings className="mr-3 h-4 w-4 opacity-70" />
                        <span className="font-semibold text-sm">
                          Profile Settings
                        </span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer rounded-xl focus:bg-emerald-50 focus:text-emerald-700 p-2.5"
                    >
                      <Link
                        href="/account/order"
                        className="flex items-center w-full"
                      >
                        <ShoppingCart className="mr-3 h-4 w-4 opacity-70" />
                        <span className="font-semibold text-sm">My Orders</span>
                      </Link>
                    </DropdownMenuItem>

                    {user.role === "admin" && (
                      <DropdownMenuItem
                        asChild
                        className="cursor-pointer rounded-xl focus:bg-blue-50 focus:text-blue-700 p-2.5"
                      >
                        <Link
                          href="/admin"
                          className="flex items-center w-full font-bold"
                        >
                          <div className="h-2 w-2 rounded-full bg-blue-500 mr-3 animate-pulse" />
                          <span>Admin Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator className="bg-slate-50" />

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer rounded-xl text-red-500 focus:text-red-700 focus:bg-red-50 p-2.5"
                    >
                      <LogOut className="mr-3 h-4 w-4 opacity-70" />
                      <span className="font-semibold text-sm">Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <CartDrawer />
            </>
          ) : (
            !user && (
              <Link
                href="/login"
                className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-all px-4 py-2 rounded-xl hover:bg-emerald-50"
              >
                Sign In
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
