"use client";
import { useRouter } from "next/navigation";
import { logout, getCurrentUser } from "@/services/authService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Bell,
  User,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";

const TopBar = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ firstName: string; lastName: string; roles: string[] } | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }

    fetchUser();
  }, []);

  return (
    <div className="p-4 flex justify-end" style={{ background: 'var(--color-card)', color: 'var(--color-text-main)' }}>
      <div className="flex gap-2 md:gap-[20px] items-center">
        <div
          className="px-3 py-2 rounded-[10px] border border-gray-90/10 flex gap-2.5 items-center overflow-hidden min-w-0"
          style={{ width: '220px', maxWidth: '100%' }}
        >
          <Search className="w-5 h-5 text-gray-500 shrink-0" />
          <input
            className="outline-0 bg-transparent w-full min-w-0 text-sm"
            type="text"
            placeholder="Search"
            style={{
              width: '100%',
              minWidth: 0,
              ...(typeof window !== 'undefined' && window.innerWidth <= 440 ? { width: '100px' } : {})
            }}
          />
        </div>
        <div className="p-2 md:p-3 rounded-[10px] w-[40px] md:w-[50px] h-[40px] md:h-[50px] bg-gray-10 cursor-pointer flex items-center justify-center">
          <Bell className="w-5 h-5 text-gray-700" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1.5 p-1 md:p-[5px] rounded-[8px] border border-gray-10">
            <img src="/assets/header-user.png" alt="User Avatar" className="w-8 h-8 md:w-auto md:h-auto" />
            <span className="hidden lg:flex lg:flex-col text-left">
              <span className="font-semibold text-dark-500 text-[16px]">
                {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
              </span>
              <span className="text-gray-500 font-[300] capitalize">
                {user ? user.roles[0].toLowerCase() : ""}
              </span>
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => {
              if (user?.roles?.includes("TEACHER")) router.push("/teacher/profile");
              else router.push("/student/profile");
            }}>
              <User className="w-4 h-4 text-gray-500 mr-2" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              if (user?.roles?.includes("TEACHER")) router.push("/teacher/notifications");
              else router.push("/student/notifications");
            }}>
              <Bell className="w-4 h-4 text-gray-500 mr-2" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <span className="text-red-400 hover:text-red-500">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopBar;
