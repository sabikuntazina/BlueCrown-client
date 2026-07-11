"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FiChevronDown,
  FiGrid,
  FiLogOut,
  FiSettings,
  FiUser,
} from "react-icons/fi";

export default function UserMenu({ session , handleSignOut}) {
  const user = session?.user;

  // নাম থেকে প্রথম দুটি অক্ষর বের করার লজিক
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  if (!user) {
    return (
      <div className="hidden items-center gap-3 lg:flex">
        <button className="rounded-full px-5 py-2 font-medium text-[#4F8A6A] transition hover:bg-[#EDF8F1]">
          Login
        </button>

        <Link href={'/register'} className="rounded-full bg-[#4F8A6A] px-5 py-2 font-medium text-white transition hover:bg-[#3E7358]">
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-end hidden lg:block">
      <div tabIndex={0} role="button">
        <div className="flex cursor-pointer items-center gap-3 rounded-full border border-[#ECE7DE] bg-white px-2 py-1 transition hover:shadow-md">
          
          {/* ইমেজ না থাকলে ২টি অক্ষর বিশিষ্ট রাউন্ডেড অ্যাভাটার দেখাবে */}
           {user?.image ? (
                      <Image
                        src={user.image}
                        alt="user"
                        width={32}
                        height={32}
                        className="rounded-full border border-[#3E7358] w-7 h-7 sm:w-8 sm:h-8 object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#3E7358] flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                       {getInitials(user?.name)}
                      </div>
                    )}

          <div className="text-left">
            <h4 className="text-sm font-semibold text-[#2D3A30]">
              {user.name}
            </h4>

            <p className="text-xs text-gray-500">Supporter</p>
          </div>

          <FiChevronDown />
        </div>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content mt-3 w-64 rounded-2xl border border-[#ECE7DE] bg-white p-3 shadow-xl"
      >
        <li>
          <a className="flex items-center gap-3 rounded-xl p-3 hover:bg-[#EDF8F1]">
            <FiGrid />
            Dashboard
          </a>
        </li>

        <li>
          <a className="flex items-center gap-3 rounded-xl p-3 hover:bg-[#EDF8F1]">
            <FiUser />
            Profile
          </a>
        </li>

        <li>
          <a className="flex items-center gap-3 rounded-xl p-3 hover:bg-[#EDF8F1]">
            <FiSettings />
            Settings
          </a>
        </li>

        <div className="my-2 border-t border-[#ECE7DE]" />

        <li>
          <button onClick={handleSignOut} className="flex items-center gap-3 rounded-xl p-3 text-red-500 hover:bg-red-50">
            <FiLogOut />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}