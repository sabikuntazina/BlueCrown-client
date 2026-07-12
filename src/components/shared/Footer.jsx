import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-[#ECE7DE] bg-[#F8F5EF]">
      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* Top */}

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}

          <div>

   
             <Logo></Logo>

            

            <p className="mt-6 max-w-sm leading-7 text-gray-500">
              BlueCrown is a community-powered crowdfunding platform
              where creators raise credits and supporters help turn
              meaningful ideas into reality.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-5 text-lg font-bold text-[#244034]">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-500">

              <li>
                <Link
                  href="/"
                  className="transition hover:text-[#4F8A6A]"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/campaigns"
                  className="transition hover:text-[#4F8A6A]"
                >
                  Campaigns
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition hover:text-[#4F8A6A]"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-[#4F8A6A]"
                >
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Resources */}

          <div>

            <h3 className="mb-5 text-lg font-bold text-[#244034]">
              Resources
            </h3>

            <ul className="space-y-3 text-gray-500">

              <li>
                <Link
                  href="/faq"
                  className="transition hover:text-[#4F8A6A]"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="transition hover:text-[#4F8A6A]"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="transition hover:text-[#4F8A6A]"
                >
                  Terms & Conditions
                </Link>
              </li>

            </ul>

          </div>

          {/* Social */}

          <div>

            <h3 className="mb-5 text-lg font-bold text-[#244034]">
              Connect
            </h3>

            <p className="mb-6 text-gray-500">
              Follow us on social platforms.
            </p>

            <div className="flex gap-3">

              <Link
                href="https://linkedin.com"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#ECE7DE] bg-white transition hover:border-[#4F8A6A] hover:bg-[#4F8A6A] hover:text-white"
              >
                <FaLinkedinIn size={18} />
              </Link>

              <Link
                href="https://github.com"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#ECE7DE] bg-white transition hover:border-[#4F8A6A] hover:bg-[#4F8A6A] hover:text-white"
              >
                <FaGithub size={18} />
              </Link>

              <Link
                href="https://facebook.com"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#ECE7DE] bg-white transition hover:border-[#4F8A6A] hover:bg-[#4F8A6A] hover:text-white"
              >
                <FaFacebookF size={18} />
              </Link>

              <Link
                href="https://x.com"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#ECE7DE] bg-white transition hover:border-[#4F8A6A] hover:bg-[#4F8A6A] hover:text-white"
              >
                <FaXTwitter size={18} />
              </Link>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#ECE7DE] pt-6 text-sm text-gray-500 md:flex-row">

          <p>
            © {new Date().getFullYear()} BlueCrown. All rights reserved.
          </p>

          <p>
            Built with ❤️ for creators & supporters.
          </p>

        </div>

      </div>
    </footer>
  );
}