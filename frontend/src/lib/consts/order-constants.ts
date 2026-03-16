export const getStatusStyles = (status: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-slate-100 text-slate-700 border-slate-200";
    case "preparing":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "ready":
      return "bg-indigo-100 text-indigo-700 border-indigo-200";
    case "delivered":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "cancelled":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};