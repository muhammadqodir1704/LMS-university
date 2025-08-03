"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Calendar,
  BarChart,
  MessageCircle,
  Users,
  Settings,
  FolderKanban,
  FileText,
  BookCheck,
  Anvil,
  Menu
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import { useLoading } from "./LoadingProvider";

export type Role = "STUDENT" | "TEACHER" | "ADMIN";

const menus: Record<Role, { name: string; icon: any; path: string }[]> = {
  STUDENT: [
    { name: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
    { name: "TimeTable", icon: BookOpen, path: "/student/timetable" },
    { name: "Sciences", icon: ClipboardList, path: "/student/sciences" },
    { name: "Attendance", icon: BarChart, path: "/student/attendance" },
    {
      name: "Financial payment",
      icon: MessageCircle,
      path: "/student/payment",
    },
    { name: "Courses", icon: Users, path: "/student/courses" },
    { name: "Online Lessons", icon: BookOpen, path: "/student/stream" },
    { name: "Electronic library", icon: Settings, path: "/student/library" },
  ],
  TEACHER: [
    { name: "Dashboard", icon: LayoutDashboard, path: "/teacher/dashboard" },
    { name: "Classes", icon: FolderKanban, path: "/teacher/classes" },
    { name: "Schedule", icon: Calendar, path: "/teacher/schedule" },
    { name: "Gradebook", icon: BarChart, path: "/teacher/grades" },
    { name: "Assignments", icon: FileText, path: "/teacher/assignments" },
    { name: "Exams" , icon: BookCheck , path: "/teacher/exams"},
    { name: "Course Management" ,icon: Anvil , path: "/teacher/courseControl"}, 
    { name: "Live Stream", icon: BookOpen, path: "/teacher/stream" },
    { name: "Notifications", icon: MessageCircle, path: "/teacher/notifications" }
  ],
  ADMIN: [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Courses", icon: ClipboardList, path: "/admin/courses" },
    { name: "Payments", icon: BarChart, path: "/admin/payments" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ],
};

function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const pages = menus[role] || [];
  const [open, setOpen] = useState(false);
  const { setLoading } = useLoading();

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const handleLinkClick = () => {
    setLoading(true);
    setOpen(false);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white/80 rounded-full p-2 shadow"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6" />
      </button>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`fixed left-0 top-0 h-screen w-[60vw] max-w-[290px] z-50 transform transition-transform duration-300 md:static md:top-0 md:left-0 md:h-screen md:w-[280px] md:min-h-screen flex flex-col justify-between pl-4 md:pl-[30px] py-6 md:py-[30px] ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } shadow-lg bg-[#B2B0E8]`} 
      >
        <div>
          <Link href="/" className="mb-[30px] hidden md:block">
            <h2 className="font-bold text-lg">LMS UNIVERSITY</h2>
          </Link>
          <div className="flex flex-col gap-2.5">
            {pages.map((page, index) => {
              if (!page.path || !page.icon || !page.name) return null;
              const activeLink = pathname === page.path;
              const Icon = page.icon;

              return (
                <Link
                  key={index}
                  href={page.path}
                  className={`inline-flex items-center gap-4 transition-all duration-300 rounded-r-[10px] ${activeLink ? 'sidebar-active' : ''}`}
                  style={activeLink ? {
                    background: 'var(--color-sidebar-active)',
                    color: 'var(--color-primary)',
                  } : {}}
                  onClick={handleLinkClick} 
                >
                  <span
                    className={`h-[50px] w-1.5 rounded-[10px] transition-all duration-300`}
                    style={activeLink ? { background: 'var(--color-primary)' } : {}}
                  />
                  <Icon className="w-5 h-5 transition-all duration-300" />
                  <span className="font-semibold text-xs md:text-sm transition-all duration-300">{page.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-end justify-start mt-8">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
