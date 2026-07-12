import Link from "next/link";
import { FaArrowRight, FaUsers, FaRocket } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import CampaignPreview from "./CampaignPreview";
import FloatingWallet from "./FloatingWallet";
import FloatingSupporters from "./FloatingSupporters";
import FloatingAnalytics from "./FloatingAnalytics";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FFF9F2]">

      {/* Background Blur */}

      <div className="absolute -left-40 -top-32 h-96 w-96 rounded-full bg-[#EAF5EE] blur-3xl opacity-70"></div>

      <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#FFF0DE] blur-3xl opacity-80"></div>

      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2">

        {/* ================= LEFT ================= */}

        <div>

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-[#DCEBDF] bg-white px-4 py-2 shadow-sm">

            <HiOutlineSparkles className="text-[#4F8A6A]" />

            <span className="text-sm font-medium text-[#4F8A6A]">
              Community Powered Crowdfunding
            </span>

          </div>

          {/* Heading */}

          <h1 className="mt-8 text-5xl font-black leading-tight text-[#244034] lg:text-7xl">

            Grow Ideas.
            <br />

            <span className="text-[#4F8A6A]">
              Inspire People.
            </span>

          </h1>

          {/* Description */}

          <p className="mt-8 max-w-xl text-lg leading-9 text-gray-600">

            BlueCrown helps creators raise credits from supportive
            communities to transform meaningful ideas into reality.
            Every contribution plants the seed for something bigger.

          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/campaigns"
              className="inline-flex h-14 items-center gap-3 rounded-2xl bg-[#4F8A6A] px-7 font-semibold text-white transition hover:-translate-y-1 hover:bg-[#3F7357]"
            >
              Explore Campaigns

              <FaArrowRight />
            </Link>

            <Link
              href="/register"
              className="inline-flex h-14 items-center rounded-2xl border-2 border-[#F59E42] px-7 font-semibold text-[#F59E42] transition hover:bg-[#F59E42] hover:text-white"
            >
              Become a Creator
            </Link>

          </div>

          {/* Stats */}

          <div className="mt-14 grid grid-cols-3 gap-6">

            <div>

              <h2 className="text-4xl font-black text-[#244034]">
                12K+
              </h2>

              <p className="mt-2 text-gray-500">
                Supporters
              </p>

            </div>

            <div>

              <h2 className="text-4xl font-black text-[#244034]">
                850+
              </h2>

              <p className="mt-2 text-gray-500">
                Campaigns
              </p>

            </div>

            <div>

              <h2 className="text-4xl font-black text-[#244034]">
                95%
              </h2>

              <p className="mt-2 text-gray-500">
                Success
              </p>

            </div>

          </div>

        </div>

<div className="relative flex justify-center">

    <CampaignPreview />

    <FloatingWallet />

    {/* <FloatingSupporters />

    <FloatingAnalytics /> */}

</div>

      </div>

    </section>
  );
}