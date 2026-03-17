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
    <nav className="sticky top-0  backdrop-blur-md z-[50] border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
        <div className="flex-1" />

        <div className="flex items-center gap-4">
          {!isAuthPage ? (
            <>
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="cursor-pointer bg-transparent flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-100 transition-colors outline-none group text-left">
                      <div className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 border border-orange-200">
                        <UserIcon className="h-5 w-5" />
                      </div>
                      <div className="hidden md:flex flex-col">
                        <span className="text-sm font-bold text-gray-900 leading-none flex items-center gap-1">
                          {user.name}
                          <ChevronDown className="h-3 w-3 text-gray-400 group-hover:text-orange-600" />
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium">
                          {user.email}
                        </span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-56 mt-2">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold leading-none">
                          My Account
                        </p>
                        <p className="text-xs leading-none text-muted-foreground italic">
                          Signed in as {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link
                        href="/account/profile"
                        className="flex items-center"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Profile Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/account/order" className="flex items-center">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        <span>My Orders</span>
                      </Link>
                    </DropdownMenuItem>
                    {user.role === "admin" && (
                      <DropdownMenuItem
                        asChild
                        className="cursor-pointer font-bold text-orange-600"
                      >
                        <Link href="/admin">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Cart Indicator */}
              <div className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-sm shadow-orange-200 transition-transform hover:scale-105 active:scale-95 cursor-pointer ml-2">
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span className="text-sm">{totalItems}</span>
              </div>
            </>
          ) : (
            !user && (
              <Link
                href="/login"
                className="text-sm font-bold text-gray-700 hover:text-orange-600 transition-all"
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
