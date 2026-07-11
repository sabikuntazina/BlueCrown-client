import Link from "next/link";
import AuthBanner from "./AuthBanner";

export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <section className="min-h-screen bg-[#FFF9F2]">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:gap-20 grid-cols-1 lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden bg-[#F8F5EF] lg:flex">
          <AuthBanner />
        </div>

        {/* Right Side */}
        <div className=" flex items-center justify-center py-6">

          <div className="w-full max-w-2xl">


            {/* Heading */}
            <div className="mb-10">
              <h1 className="text-4xl font-bold text-[#244034]">
                {title}
              </h1>

              <p className="mt-3 text-[#6B7280]">
                {subtitle}
              </p>
            </div>

            {/* Form */}
            {children}

          </div>

        </div>

      </div>
    </section>
  );
}