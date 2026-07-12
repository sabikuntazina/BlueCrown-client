import { FaHeart } from "react-icons/fa";

export default function FloatingSupporters() {
  return (
    <div
      className="
      absolute
      -right-6
      bottom-10
      w-72
      rounded-3xl
      border
      border-[#ECE7DE]
      bg-white/95
      backdrop-blur-md
      p-5
      shadow-[0_20px_50px_rgba(0,0,0,.10)]
      animate-[float_7s_ease-in-out_infinite]
    "
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            New Supporters
          </p>

          <h3 className="mt-1 text-xl font-bold text-[#244034]">
            234 Joined
          </h3>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF3F3]">

          <FaHeart className="text-[#EF4444]" />

        </div>

      </div>

      {/* Avatar Stack */}

      <div className="mt-5 flex items-center">

        <div className="flex -space-x-3">

          <img
            src="https://i.pravatar.cc/100?img=11"
            alt=""
            className="h-11 w-11 rounded-full border-2 border-white object-cover"
          />

          <img
            src="https://i.pravatar.cc/100?img=21"
            alt=""
            className="h-11 w-11 rounded-full border-2 border-white object-cover"
          />

          <img
            src="https://i.pravatar.cc/100?img=32"
            alt=""
            className="h-11 w-11 rounded-full border-2 border-white object-cover"
          />

          <img
            src="https://i.pravatar.cc/100?img=48"
            alt=""
            className="h-11 w-11 rounded-full border-2 border-white object-cover"
          />

        </div>

        <span className="ml-4 text-sm text-gray-500">
          +230 others supported today
        </span>

      </div>

      {/* Live Status */}

      <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#F8F9F8] px-4 py-3">

        <div className="flex items-center gap-2">

          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#22C55E]"></span>

          <span className="text-sm font-medium text-[#244034]">
            Live Activity
          </span>

        </div>

        <span className="text-sm font-semibold text-[#4F8A6A]">
          +18 min ago
        </span>

      </div>
    </div>
  );
}