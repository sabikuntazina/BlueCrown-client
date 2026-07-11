"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Explore",
    href: "/campaigns",
  },
  {
    title: "Categories",
    href: "/categories",
  },
  {
    title: "How It Works",
    href: "/how-it-works",
  },
  {
    title: "About",
    href: "/about",
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-2">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`rounded-full px-5 py-2.5 text-lg font-medium transition-all duration-300
                ${
                  active
                    ? "bg-[#EDF8F1] text-[#4F8A6A]"
                    : "text-[#5D665F] hover:bg-[#EDF8F1] hover:text-[#4F8A6A]"
                }`}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}