"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  HiOutlineBell,
  HiOutlineBars3,
  HiOutlineChevronDown,
} from "react-icons/hi2";

export default function DashboardTopbar({ setIsOpen }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.includes("supporter")) return "Supporter Dashboard";
    if (pathname.includes("creator")) return "Creator Dashboard";
    if (pathname.includes("admin")) return "Admin Dashboard";
    return "Dashboard";
  };

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-[#ECE7DE] bg-[#FDFBF7] shadow-[0_-6px_20px_rgba(0,0,0,0.03)] px-4 sm:px-8">
      {/* Left */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile Menu Hamburger Button */}
        <button 
          onClick={() => setIsOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ECE7DE] text-[#244034] transition hover:bg-[#F8F5EF] lg:hidden"
        >
          <HiOutlineBars3 size={24} />
        </button>

        <div>
          <h1 className="text-lg font-bold text-[#244034] sm:text-2xl leading-none">
            {getPageTitle()}
          </h1>
          <p className="hidden text-xs text-gray-500 sm:block sm:text-sm mt-1">
            Welcome back <span className="font-bold lg:text-xl text-[#4F8A6A]"> {user?.name} </span> 
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-5">
        {/* Credits */}
        <div className="flex items-center gap-1.5 rounded-full bg-[#EAF5EE] px-3 py-1.5 sm:px-4 sm:py-2">
          <span className="text-sm sm:text-lg">🪙</span>
          <span className="text-xs font-semibold text-[#244034] sm:text-sm whitespace-nowrap">
            {user?.credit || 0} <span className="hidden xs:inline">Credits</span>
          </span>
        </div>

        {/* Notification */}
        <button className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-[#ECE7DE] transition hover:bg-[#F8F5EF]">
          <HiOutlineBell size={20} className="text-[#244034]" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#F59E42]"></span>
        </button>

        {/* User Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#ECE7DE] p-1.5 sm:px-3 sm:py-2 transition hover:bg-[#F8F5EF]"
          >
            <Image
              src={user?.image || "/images/avatar.png"}
              width={32}
              height={32}
              alt="User"
              className="rounded-xl object-cover sm:h-[42px] sm:w-[42px]"
            />
            <div className="hidden text-left md:block">
              <h3 className="text-sm font-semibold text-[#244034]">
                {user?.name || "Guest"}
              </h3>
              <p className="text-xs capitalize text-[#4F8A6A]">
                {user?.role || "User"}
              </p>
            </div>
            <HiOutlineChevronDown className="hidden text-gray-500 sm:block" />
          </div>

          {/* Dropdown Menu */}
          <ul
            tabIndex={0}
            className="dropdown-content z-50 mt-3 w-52 sm:w-60 rounded-2xl border border-[#ECE7DE] bg-white p-2 shadow-xl"
          >
            <li>
              <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-[#F8F5EF]">
                👤 Profile
              </button>
            </li>
            <li>
              <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-[#F8F5EF]">
                ⚙ Settings
              </button>
            </li>
            <li>
              <button className="w-full rounded-xl px-4 py-3 text-left text-red-500 hover:bg-red-50">
                🚪 Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}