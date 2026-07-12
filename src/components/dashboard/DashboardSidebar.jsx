"use client";

import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";

import {
  HiOutlineHome,
  HiOutlineGlobeAlt,
  HiOutlineCreditCard,
  HiOutlineBanknotes,
  HiOutlineFolderOpen,
  HiOutlineUsers,
  HiOutlineClipboardDocumentList,
  HiOutlineChartBar,
  HiOutlinePlusCircle,
  HiOutlineArrowRightOnRectangle,
  HiXMark,
} from "react-icons/hi2";
import Logo from "../shared/Logo";

const supporterMenu = [
  { title: "Home", href: "/dashboard/supporter", icon: HiOutlineHome },
  { title: "Explore Campaigns", href: "/campaigns", icon: HiOutlineGlobeAlt },
  { title: "My Contributions", href: "/dashboard/supporter/my-contributions", icon: HiOutlineFolderOpen },
  { title: "Purchase Credits", href: "/dashboard/supporter/purchase-credit", icon: HiOutlineCreditCard },
  { title: "Payment History", href: "/dashboard/supporter/payment-history", icon: HiOutlineBanknotes },
];

const creatorMenu = [
  { title: "Home", href: "/dashboard/creator", icon: HiOutlineHome },
  { title: "Add New Campaign", href: "/dashboard/creator/add-campaign", icon: HiOutlinePlusCircle },
  { title: "My Campaigns", href: "/dashboard/creator/my-campaigns", icon: HiOutlineFolderOpen },
  { title: "Withdrawals", href: "/dashboard/creator/withdrawals", icon: HiOutlineBanknotes },
  { title: "Payment History", href: "/dashboard/creator/payment-history", icon: HiOutlineCreditCard },
];

const adminMenu = [
  { title: "Home", href: "/dashboard/admin", icon: HiOutlineHome },
  { title: "Manage Users", href: "/dashboard/admin/manage-users", icon: HiOutlineUsers },
  { title: "Manage Campaigns", href: "/dashboard/admin/manage-campaigns", icon: HiOutlineClipboardDocumentList },
  { title: "/Withdrawal Requests", href: "/dashboard/admin/withdrawal-requests", icon: HiOutlineBanknotes },
  { title: "Reports", href: "/dashboard/admin/reports", icon: HiOutlineChartBar },
];

export default function DashboardSidebar({ isOpen, setIsOpen }) {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const user = session?.user;

  let menu = [];
  if (user?.role === "supporter") menu = supporterMenu;
  if (user?.role === "creator") menu = creatorMenu;
  if (user?.role === "admin") menu = adminMenu;

  return (
    <>
      {/* Mobile Overlay Background */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed bottom-0 top-0 left-0 z-50 flex h-screen w-[290px] flex-col border-r border-[#ECE7DE] bg-[#F8F5EF] transition-transform duration-300 ease-in-out lg:sticky lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo & Mobile Close Button */}
        <div className="flex items-center justify-between border-b border-[#ECE7DE] p-6">
          <Logo></Logo>
          <button 
            onClick={() => setIsOpen(false)}
            className="rounded-xl p-1 text-gray-500 hover:bg-white lg:hidden"
          >
            <HiXMark size={24} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-1">
            {menu.map((item) => {
              const Icon = item.icon;
              const isHome = item.href === `/dashboard/${user?.role}`;
              const isActive = isHome ? pathname === item.href : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)} // Mobile-e menu click korle jeno sidebar close hoy
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300
                    ${isActive
                      ? "bg-white border border-[#ECE7DE] text-[#244034] shadow-sm"
                      : "text-[#6B7280] hover:bg-white hover:text-[#244034]"
                    }`}
                >
                  <Icon
                    size={20}
                    className={isActive ? "text-[#4F8A6A]" : "text-gray-400"}
                  />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#ECE7DE] p-5">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-white hover:text-red-500">
            <HiOutlineArrowRightOnRectangle size={20} />
            Logout
          </button>
          <p className="mt-4 text-center text-xs text-gray-400">
            BlueCrown v1.0
          </p>
        </div>
      </aside>
    </>
  );
}