"use client";

import { IoClose } from "react-icons/io5";
import NavLinks from "./NavLinks";


export default function MobileMenu({ isOpen, setIsOpen }) {
  return (
    <div
      className={`fixed inset-0 z-[999] transition-all duration-300 ${
        isOpen
          ? "visible bg-black/30 opacity-100"
          : "invisible opacity-0"
      }`}
    >
      <div
        className={`absolute right-0 top-0 h-full w-80 bg-[#FFF9F2] shadow-2xl transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#ECE7DE] p-5">
          <h2 className="text-xl font-bold text-[#244034]">
            BlueCrown
          </h2>

          <button onClick={() => setIsOpen(false)}>
            <IoClose className="text-3xl" />
          </button>
        </div>

        <div className="p-5">
          <NavLinks />
        </div>
      </div>
    </div>
  );
}