import Link from "next/link";
import { GiQueenCrown } from "react-icons/gi";

export default function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3.5 focus:outline-none select-none"
    >
      {/* Logo Icon Container */}
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#ECE7DE] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#4F8A6A]/30 group-hover:shadow-[0_8px_20px_rgba(79,138,106,0.08)]">
        
        {/* Soft Organic Glow */}
        <div className="absolute inset-0 rounded-xl bg-[#4F8A6A] opacity-0 blur-md transition-all duration-300 group-hover:opacity-5" />

        {/* Crown Icon */}
        <GiQueenCrown className="relative text-2xl text-[#4F8A6A] transition-all duration-300 group-hover:scale-105 group-hover:text-[#3d6e53]" />
      </div>

      {/* Brand Text Identity */}
      <div className="flex flex-col justify-center">
        <h2 className="font-serif text-xl font-bold tracking-tight text-[#244034] transition-colors duration-300 group-hover:text-[#4F8A6A]">
          Blue<span className="text-[#4F8A6A] font-sans font-semibold group-hover:text-[#244034] transition-colors duration-300">Crown</span>
        </h2>
        
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8D9B90] mt-0.5 font-sans">
          Crowdfunding
        </p>
      </div>
    </Link>
  );
}