import {
  HiArrowTrendingUp,
  HiChartBar,
} from "react-icons/hi2";

export default function FloatingAnalytics() {
  return (
    <div
      className="
      absolute
      -top-6
      right-0
     w-60
      rounded-3xl
      border
      border-[#ECE7DE]
      bg-white/95
      backdrop-blur-md
      p-5
      shadow-[0_20px_60px_rgba(0,0,0,.10)]
      animate-[float_8s_ease-in-out_infinite]
    "
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            Funding Growth
          </p>

          <h2 className="mt-1 text-3xl font-black text-[#244034]">
            +32%
          </h2>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF8F1]">

          <HiArrowTrendingUp
            size={24}
            className="text-[#4F8A6A]"
          />

        </div>

      </div>

      {/* Graph */}

      <div className="mt-6 flex h-20 items-end justify-between">

        <div className="h-7 w-4 rounded-full bg-[#D8EEDF]" />

        <div className="h-11 w-4 rounded-full bg-[#CBE6D4]" />

        <div className="h-14 w-4 rounded-full bg-[#BFE0CB]" />

        <div className="h-9 w-4 rounded-full bg-[#CBE6D4]" />

        <div className="h-16 w-4 rounded-full bg-[#A9D4BA]" />

        <div className="h-12 w-4 rounded-full bg-[#BFE0CB]" />

        <div className="h-20 w-4 rounded-full bg-[#4F8A6A]" />

      </div>

      {/* Footer */}

      <div className="mt-6 rounded-2xl bg-[#F8FAF8] p-4">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs text-gray-500">
              This Week
            </p>

            <h3 className="mt-1 text-xl font-bold text-[#244034]">
              +460 Credits
            </h3>

          </div>

          <HiChartBar
            size={28}
            className="text-[#4F8A6A]"
          />

        </div>

      </div>
    </div>
  );
}