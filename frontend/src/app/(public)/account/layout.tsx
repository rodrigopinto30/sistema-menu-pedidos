import { AccountSidebar } from "@/components/AccountSidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
