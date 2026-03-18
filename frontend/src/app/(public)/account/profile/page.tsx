"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Save,
  Loader2,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { user, updateUser, token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return toast.error("Authentication token missing");

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Update failed");
      if (updateUser && data.user) updateUser(data.user);

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setPasswordLoading(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/change-password`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
            newPassword_confirmation: passwordData.confirmPassword,
          }),
        },
      );

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password changed successfully");
    } catch (error) {
      toast.error("Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const labelStyle =
    "text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1 flex items-center gap-2";
  const inputStyle =
    "h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-emerald-500/20 focus:border-emerald-500 transition-all px-4 mt-2";

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16 animate-in fade-in duration-700">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100/50">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span className="text-[10px] font-black uppercase tracking-[0.15em]">
            Account
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
          Account <span className="text-emerald-600">Settings</span>
        </h1>
        <p className="text-slate-500 font-medium">
          Manage your personal information and security preferences.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-10">
        <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm shadow-slate-200/20">
          <div className="p-8 border-b border-slate-50 bg-slate-50/30">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-100 p-2.5 rounded-2xl">
                <User className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">
                  Personal Information
                </h2>
                <p className="text-xs font-medium text-slate-400 mt-0.5">
                  Update your contact details and shipping address.
                </p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <form onSubmit={handleUpdateProfile} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className={labelStyle}>
                    <User className="h-3 w-3" /> Full Name
                  </label>
                  <Input
                    className={inputStyle}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelStyle}>
                    <Mail className="h-3 w-3" /> Email Address
                  </label>
                  <Input
                    className={inputStyle}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelStyle}>
                    <Phone className="h-3 w-3" /> Phone Number
                  </label>
                  <Input
                    className={inputStyle}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+1 234 567 890"
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelStyle}>
                    <MapPin className="h-3 w-3" /> Shipping Address
                  </label>
                  <Input
                    className={inputStyle}
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="123 Street, City, Country"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 px-8 cursor-pointer bg-emerald-600 hover:bg-slate-900 text-white rounded-2xl font-black transition-all duration-300 border-none active:scale-95"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm shadow-slate-200/20">
          <div className="p-8 border-b border-slate-50 bg-slate-50/30">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-2.5 rounded-2xl">
                <Lock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">
                  Security
                </h2>
                <p className="text-xs font-medium text-slate-400 mt-0.5">
                  Ensure your account is using a long, random password.
                </p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <form onSubmit={handleChangePassword} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-1">
                  <label className={labelStyle}>Current Password</label>
                  <Input
                    type="password"
                    className={inputStyle}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelStyle}>New Password</label>
                  <Input
                    type="password"
                    className={inputStyle}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelStyle}>Confirm New Password</label>
                  <Input
                    type="password"
                    className={inputStyle}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={passwordLoading}
                  variant="outline"
                  className="h-12 px-8 cursor-pointer border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 rounded-2xl font-black transition-all duration-300 active:scale-95"
                >
                  {passwordLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <KeyRound className="mr-2 h-4 w-4" />
                  )}
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
