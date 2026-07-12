import Link from "next/link";

export default function DashboardFooter() {
  return (
    <footer className="bg-[#FDFBF7] border-t border-[#ECE7DE] px-4 sm:px-8 py-5">
      <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        {/* Left */}
        <div>
          <p className="font-semibold text-[#244034]">
            © 2026 BlueCrown
          </p>
          <p className="mt-0.5 text-sm text-gray-500">
            Grow Dreams Together 🌿
          </p>
        </div>

        {/* Center */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm">
          <Link href="/privacy-policy" className="text-gray-500 transition hover:text-[#4F8A6A]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-gray-500 transition hover:text-[#4F8A6A]">
            Terms
          </Link>
          <Link href="/contact" className="text-gray-500 transition hover:text-[#4F8A6A]">
            Support
          </Link>
        </div>

        {/* Right */}
        <div className="md:self-center">
          <span className="rounded-full bg-[#EAF5EE] px-3 py-1 text-xs font-semibold text-[#4F8A6A]">
            Version 1.0.0
          </span>
        </div>
      </div>
    </footer>
  );
}