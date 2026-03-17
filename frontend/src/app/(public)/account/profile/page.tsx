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
import { User, Mail, Phone, MapPin, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Actualizando perfil:", formData);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      toast.error("Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Mi Perfil
        </h1>
        <p className="text-gray-500 text-sm">
          Gestiona tu información personal y de contacto.
        </p>
      </header>

      <Card className="border-none shadow-xl bg-white overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b pb-8">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <User className="h-8 w-8" />
            </div>
            <div>
              <CardTitle className="text-xl">{user?.name}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" /> Nombre Completo
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Tu nombre"
                  className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" /> Correo Electrónico
                </label>
                <Input
                  value={formData.email}
                  disabled
                  className="bg-slate-100 text-gray-500 cursor-not-allowed border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" /> Teléfono
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+54 9..."
                  className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
                />
              </div>

              {/* Dirección */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" /> Dirección de
                  Entrega
                </label>
                <Input
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Calle, Número, Ciudad..."
                  className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 transition-transform active:scale-95"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Cambios
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
