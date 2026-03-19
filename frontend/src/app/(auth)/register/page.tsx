"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import {
  User,
  Mail,
  LockKeyhole,
  UserPlus,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: SignUpInput) => {
    try {
      await api.post("/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });

      toast.success("Account created! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      const serverErrors = error.response?.data?.errors;
      const message = serverErrors
        ? (Object.values(serverErrors).flat()[0] as string)
        : error.response?.data?.message;

      toast.error(message || "Registration failed");
    }
  };

  const labelStyle =
    "text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1";
  const inputContainerStyle = "relative group";
  const iconStyle =
    "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors";
  const inputStyle =
    "pl-11 h-12 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all font-medium";

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center py-12 px-4 animate-in fade-in zoom-in-95 duration-500">
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <div className="bg-emerald-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-200">
          <ShoppingBag className="h-6 w-6 text-white" />
        </div>
        <span className="text-2xl font-black text-slate-900 tracking-tighter">
          Foodie<span className="text-emerald-600">App</span>
        </span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl shadow-slate-200/60 border border-slate-100 p-10 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50 mb-2">
            <UserPlus className="h-3.5 w-3.5" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Join the Community
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            Create <span className="text-emerald-600">Account</span>
          </h1>
          <p className="text-slate-400 font-medium text-sm italic">
            Start your culinary journey today
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }: { field: any }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className={labelStyle}>Full Name</FormLabel>
                  <FormControl>
                    <div className={inputContainerStyle}>
                      <User className={iconStyle} />
                      <Input
                        placeholder="John Doe"
                        {...field}
                        className={inputStyle}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }: { field: any }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className={labelStyle}>Email Address</FormLabel>
                  <FormControl>
                    <div className={inputContainerStyle}>
                      <Mail className={iconStyle} />
                      <Input
                        placeholder="john@example.com"
                        {...field}
                        className={inputStyle}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }: { field: any }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className={labelStyle}>Password</FormLabel>
                    <FormControl>
                      <div className={inputContainerStyle}>
                        <LockKeyhole className={iconStyle} />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          className={inputStyle}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[10px] font-bold" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }: { field: any }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className={labelStyle}>
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className={inputContainerStyle}>
                        <LockKeyhole className={iconStyle} />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          className={inputStyle}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[10px] font-bold" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-slate-900 hover:bg-emerald-600 text-white font-black rounded-2xl transition-all active:scale-95 shadow-lg shadow-slate-200 cursor-pointer flex items-center justify-center gap-2 group mt-4"
            >
              Sign Up Now
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        </Form>

        <div className="pt-6 text-center border-t border-slate-50">
          <p className="text-sm font-medium text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-emerald-600 font-black hover:underline underline-offset-4"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
