import Sidebar from "@/components/sidebar";
import Header from "@/components/user/header";
import { QueryProvider } from "@/provider/query.provider";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <QueryProvider>{children}</QueryProvider>
    </>
  );
}
