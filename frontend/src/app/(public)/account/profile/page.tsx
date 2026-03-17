"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Save,
  Loader2,
  KeyRound,
} from "lucide-react";
import { toast } from "sonner";

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

      if (updateUser && data.user) {
        updateUser(data.user);
      }

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
      const response = await fetch(
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

  return (
    <div className="max-w-4xl space-y-10 pb-10">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Account Settings
        </h1>
        <p className="text-gray-500 text-sm">
          Manage your personal information and security preferences.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-orange-600" /> Personal Information
            </CardTitle>
            <CardDescription>
              Update your contact details and shipping address.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" /> Full Name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" /> Email Address
                  </label>
                  <Input
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" /> Phone Number
                  </label>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+1 234 567 890"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" /> Shipping
                    Address
                  </label>
                  <Input
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="123 Street, City, Country"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Profile Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="h-5 w-5 text-orange-600" /> Security
            </CardTitle>
            <CardDescription>
              Ensure your account is using a long, random password to stay
              secure.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleChangePassword} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <Input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <Input
                    type="password"
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
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={passwordLoading}
                  variant="outline"
                  className="cursor-pointer border-orange-600 text-orange-600 hover:bg-orange-50"
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
