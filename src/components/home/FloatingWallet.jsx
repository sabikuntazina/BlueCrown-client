import { PiCoinsFill } from "react-icons/pi";
import { HiArrowTrendingUp } from "react-icons/hi2";

export default function FloatingWallet() {
  return (
    <div
      className="
      absolute
      -left-6
      top-10
      w-64
      rounded-3xl
      border
      border-[#ECE7DE]
      bg-white/95
      backdrop-blur-md
      p-5
      animate-[float_6s_ease-in-out_infinite]
      shadow-[0_20px_50px_rgba(0,0,0,.10)]
    "
    >
      {/* Top */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            Available Credits
          </p>

          <h2 className="mt-1 text-3xl font-black text-[#244034]">
            1,250
          </h2>

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF5EE]">

          <PiCoinsFill
            size={28}
            className="text-[#4F8A6A]"
          />

        </div>

      </div>

      {/* Divider */}

      <div className="my-4 h-px bg-[#ECE7DE]" />

      {/* Bottom */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs text-gray-500">
            Todays Growth
          </p>

          <div className="mt-1 flex items-center gap-1">

            <HiArrowTrendingUp className="text-[#4F8A6A]" />

            <span className="font-semibold text-[#4F8A6A]">
              +180 Credits
            </span>

          </div>

        </div>

        <span className="rounded-full bg-[#FFF5E9] px-3 py-1 text-xs font-semibold text-[#F59E42]">
          Active
        </span>

      </div>
    </div>
  );
}