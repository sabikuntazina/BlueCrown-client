export default function CampaignPreview() {
  return (
    <div className="w-[420px] rounded-[32px] border border-[#ECE7DE] bg-white p-7 shadow-[0_30px_70px_rgba(0,0,0,.08)]">

      {/* Campaign Image */}

      <div className="relative h-56 overflow-hidden rounded-3xl bg-[#DDF3E5]">

        <div className="absolute inset-0 flex items-center justify-center">

          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-lg">

            🌱

          </div>

        </div>

      </div>

      {/* Category */}

      <div className="mt-6 inline-flex rounded-full bg-[#EAF5EE] px-3 py-1 text-xs font-semibold text-[#4F8A6A]">

        Environment

      </div>

      {/* Title */}

      <h2 className="mt-4 text-2xl font-bold text-[#244034]">

        Save The Ocean

      </h2>

      <p className="mt-3 leading-7 text-gray-500">

        Help us clean beaches and protect marine life through
        community-powered funding.

      </p>

      {/* Progress */}

      <div className="mt-8">

        <div className="mb-2 flex justify-between">

          <span className="text-sm font-medium">
            Raised
          </span>

          <span className="text-sm font-bold text-[#4F8A6A]">
            780 / 1000 Credits
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-[#ECECEC]">

          <div className="h-full w-[78%] rounded-full bg-[#4F8A6A]" />

        </div>

      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between">

        <div>

          <h3 className="text-2xl font-bold text-[#244034]">
            234
          </h3>

          <p className="text-sm text-gray-500">
            Supporters
          </p>

        </div>

        <button className="rounded-xl bg-[#4F8A6A] px-6 py-3 font-semibold text-white transition hover:bg-[#3F7357]">

          Support

        </button>

      </div>

    </div>
  );
}