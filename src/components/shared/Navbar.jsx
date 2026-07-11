"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

 const { data: session } = authClient.useSession();
 
 
 const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login"
        }
      }
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FFF9F2]/95 shadow-sm backdrop-blur-lg border-b border-[#ECE7DE]"
          : "bg-[#FFF9F2]"
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 px-5 flex items-center justify-between">
        {/* LEFT */}

        <Logo />

        {/* CENTER */}

        <div className="hidden lg:block">
          <NavLinks />
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-3">

          {/* Credits */}

          <div className="hidden md:flex items-center gap-2 rounded-full bg-[#EEF8F1] px-4 py-2">
            <span className="text-lg">🌿</span>

            <span className="text-sm font-semibold text-[#4F8A6A]">
              240 Credits
            </span>
          </div>

          {/* Notification */}

          <button className="relative w-11 h-11 rounded-full border border-[#ECE7DE] bg-white flex justify-center items-center hover:bg-[#EEF8F1] transition">

            <IoNotificationsOutline className="text-2xl text-[#4F8A6A]" />

            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#F59E42]" />
          </button>

          {/* User */}

          <UserMenu session={session} handleSignOut={handleSignOut} />

          {/* Mobile */}

          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden w-11 h-11 rounded-full border border-[#ECE7DE] flex justify-center items-center bg-white"
          >
            <HiOutlineMenuAlt3 className="text-2xl text-[#4F8A6A]" />
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </header>
  );
}