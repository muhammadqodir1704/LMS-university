"use client";
import TopBar from "@/app/components/TopBar";
import { UserProvider, useUser } from "@/app/context/UserContext";
import type { Role } from "@/app/components/SideBar";
import Sidebar from "@/app/components/SideBar";
import { usePathname } from "next/navigation";

function LayoutWithRole({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const pathname = usePathname();
  let role: Role = "STUDENT";
  if (user?.roles?.includes("TEACHER")) role = "TEACHER";
  else if (user?.roles?.includes("STUDENT")) role = "STUDENT";
  const showSidebar = pathname.startsWith("/student") || pathname.startsWith("/Profile") || pathname.startsWith("/Notifications");
  return (
    <div className="flex h-screen">
      {showSidebar && <Sidebar role={role} />}
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <LayoutWithRole>{children}</LayoutWithRole>
    </UserProvider>
  );
} 