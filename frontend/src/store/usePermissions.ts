import { useAuthStore } from "@/store/useAuthStore";

export const usePermissions = () => {
  const user = useAuthStore((state: any) => state.user);

  return {
    isAdmin: user?.role === 'admin',
    isCustomer: user?.role === 'customer',
    canManageOrders: user?.role === 'admin',
    canEditOrder: (orderUserId: number) => user?.id === orderUserId || user?.role === 'admin',
  };
};