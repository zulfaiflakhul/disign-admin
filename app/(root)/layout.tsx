import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/sidebar-nav";

export const metadata: Metadata = {
  title: "Admin | UNY DiSign",
  description: "Admin Dashbord Kelola Data Kamus Disign",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
};

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/",
  },
  {
    title: "Data Kamus",
    href: "/kata",
  },
  {
    title: "Kategori",
    href: "/categories",
  },
  {
    title: "Layanan",
    href: "/services",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            DiSign Admin Dashboard
          </h2>
          <p className="text-muted-foreground">
            Manajemen Bahasa Isyarat Kamus DiSign
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:w-full">{children}</div>
        </div>
      </div>
    </>
  );
}
