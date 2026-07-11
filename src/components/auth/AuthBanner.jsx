import {
  FaLeaf,
  FaUsers,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";

export default function AuthBanner() {
  return (
    <div className=" my-10 h-full  px-10">

      {/* Badge */}

      <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#EAF5EE] px-4 py-2 text-sm font-semibold text-[#4F8A6A]">
        🌿 HopeBloom Theme
      </span>

      {/* Heading */}

      <h1 className="text-5xl font-bold leading-tight text-[#244034]">
        Grow Dreams,
        <br />
        Together.
      </h1>

      <p className="mt-5 max-w-md text-lg leading-8 text-gray-600">
        Every contribution empowers creators to transform meaningful
        ideas into successful campaigns and build a stronger
        community.
      </p>

      {/* Small Cards */}

      <div className="mt-10 space-y-4">

        <div className="flex items-center gap-4 rounded-2xl border border-[#ECE7DE] bg-white p-5 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#EEF8F1]">
            <FaUsers className="text-2xl text-[#4F8A6A]" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#244034]">
              12K+
            </h3>

            <p className="text-gray-500">
              Active Supporters
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-[#ECE7DE] bg-white p-5 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FFF4E9]">
            <FaRocket className="text-2xl text-[#F59E42]" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#244034]">
              850+
            </h3>

            <p className="text-gray-500">
              Successful Campaigns
            </p>
          </div>
        </div>

      </div>

      {/* Progress */}

      <div className="mt-10 rounded-2xl border border-[#ECE7DE] bg-white p-6 shadow-sm">

        <div className="mb-3 flex justify-between">

          <span className="font-semibold text-[#244034]">
            Community Funding
          </span>

          <span className="font-bold text-[#4F8A6A]">
            82%
          </span>

        </div>

        <progress
          className="progress progress-success w-full"
          value="82"
          max="100"
        />

        <div className="mt-6 flex items-center justify-between text-sm text-gray-600">

          <div className="flex items-center gap-2">
            <FaLeaf className="text-[#4F8A6A]" />
            Community
          </div>

          <div className="flex items-center gap-2">
            <FaShieldAlt className="text-[#4F8A6A]" />
            Secure
          </div>

          <div className="flex items-center gap-2">
            <FaUsers className="text-[#4F8A6A]" />
            Trusted
          </div>

        </div>

      </div>

    </div>
  );
}