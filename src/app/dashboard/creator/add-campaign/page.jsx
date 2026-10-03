"use client";

import { useState } from "react";
import {
  FaBullhorn,
  FaImage,
  FaPlus,
  FaGift,
} from "react-icons/fa";
import {
  MdCategory,
  MdOutlineDescription,
} from "react-icons/md";
import {
  HiCurrencyDollar,
  HiMiniCalendarDays,
} from "react-icons/hi2";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

// --- API Helper Function (ভুল ঠিক করা হয়েছে) ---
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const postCampaign = async (campaignData) => {
  const res = await fetch(`${baseUrl}/api/add/campaigns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(campaignData),
  });
  const data = await res.json();
  return data;
};

export default function AddCampaignPage() {
  // --- 1. State Declarations ---
  const [image, setImage] = useState(null);
  const [customFields, setCustomFields] = useState([]);
  const [customField, setCustomField] = useState({
    key: "",
    value: "",
  });

  const [loading, setLoading] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user)

  const reservedFields = [
    "campaignTitle",
    "campaignStory",
    "category",
    "fundingGoal",
    "minimumContribution",
    "deadline",
    "rewardInfo",
    "campaignImage",
  ];

  // --- 2. Helper Functions ---
  const toCamelCase = (text) => {
    return text
      .trim()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(" ")
      .filter(Boolean)
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("");
  };

  const addMoreFieldFunction = () => {
    if (!customField.key.trim() || !customField.value.trim()) return;

    const key = toCamelCase(customField.key);

    // Reserved Check
    if (reservedFields.includes(key)) {
      toast.error("This field name is reserved.");
      return;
    }

    setCustomFields([
      ...customFields,
      {
        label: customField.key,
        key,
        value: customField.value,
      },
    ]);

    setCustomField({
      key: "",
      value: "",
    });
  };

  const uploadImageToImgBB = async () => {
    if (!image) return "";

    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const campaign = Object.fromEntries(formData.entries());

      // Upload image & error handling
      const imageUrl = await uploadImageToImgBB();
      if (!imageUrl) {
        toast.error("Please upload a campaign cover image.");
        setLoading(false);
        return;
      }
      campaign.campaignImage = imageUrl;

      // number convert
      campaign.fundingGoal = Number(campaign.fundingGoal);
      campaign.minimumContribution = Number(campaign.minimumContribution);

      // merge dynamic fields
      customFields.forEach((field) => {
        campaign[field.key] = field.value;
      });

      campaign.creatorId = user?.id;
      campaign.creatorName = user?.name;
      campaign.creatorImage = user?.image;
      campaign.creatorRole = user?.role;
      campaign.status="pending"

      const res = await postCampaign(campaign);

      if (res?.insertedId || res?.acknowledged) {
        toast.success("Campaign Ready ✔");
        e.target.reset();
        // রিঅ্যাক্ট স্টেট ক্লিয়ার করা হয়েছে
        setImage(null);
        setCustomFields([]);
      } else {
        toast.error("Something went wrong on the server.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to submit campaign.");
    } finally {
      setLoading(false);
    }
  };

  // --- 3. UI Template Return ---
  return (
    <section className="min-h-screen bg-[#FFF9F2] p-8">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#244034]">
            Create New Campaign
          </h1>
          <p className="mt-2 text-gray-500">
            Share your idea with the community and start receiving support from
            contributors around the world.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="rounded-3xl border border-[#ECE7DE] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,.05)]">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-xl bg-[#EAF5EE] p-3">
                <FaBullhorn className="text-xl text-[#4F8A6A]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#244034]">
                  Basic Information
                </h2>
                <p className="text-sm text-gray-500">
                  Tell supporters what your campaign is about.
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              {/* Campaign Title */}
              <div>
                <label className="mb-2 block font-semibold text-[#244034]">
                  Campaign Title
                </label>
                <div className="relative">
                  <FaBullhorn className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    required
                    name="campaignTitle"
                    type="text"
                    placeholder="Help us build a solar-powered water pump"
                    className="h-12 w-full rounded-xl border border-[#ECE7DE] pl-12 pr-4 outline-none transition focus:border-[#4F8A6A]"
                  />
                </div>
              </div>

              {/* Story */}
              <div>
                <label className="mb-2 block font-semibold text-[#244034]">
                  Campaign Story
                </label>
                <div className="relative">
                  <MdOutlineDescription className="absolute left-4 top-5 text-gray-400" />
                  <textarea
                    required
                    rows={6}
                    name="campaignStory"
                    placeholder="Describe your campaign in detail..."
                    className="w-full rounded-xl border border-[#ECE7DE] py-3 pl-12 pr-4 outline-none transition focus:border-[#4F8A6A]"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block font-semibold text-[#244034]">
                  Category
                </label>
                <div className="relative">
                  <MdCategory className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    required
                    name="category"
                    className="h-12 w-full rounded-xl border border-[#ECE7DE] bg-white pl-12 pr-4 outline-none transition focus:border-[#4F8A6A]"
                  >
                    <option value="">Select Category</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Community">Community</option>
                    <option value="Art">Art</option>
                    <option value="Environment">Environment</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Funding */}
          <div className="rounded-3xl border border-[#ECE7DE] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,.05)]">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-xl bg-[#FFF3E7] p-3">
                <HiCurrencyDollar className="text-2xl text-[#F59E42]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#244034]">
                  Funding Information
                </h2>
                <p className="text-sm text-gray-500">
                  Set your funding goal and campaign deadline.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Funding Goal */}
              <div>
                <label className="mb-2 block font-semibold text-[#244034]">
                  Funding Goal
                </label>
                <div className="relative">
                  <HiCurrencyDollar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    required
                    type="number"
                    name="fundingGoal"
                    placeholder="5000"
                    className="h-12 w-full rounded-xl border border-[#ECE7DE] pl-12 pr-4 outline-none transition focus:border-[#4F8A6A]"
                  />
                </div>
              </div>

              {/* Minimum Contribution */}
              <div>
                <label className="mb-2 block font-semibold text-[#244034]">
                  Minimum Contribution
                </label>
                <div className="relative">
                  <HiCurrencyDollar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    required
                    type="number"
                    name="minimumContribution"
                    placeholder="100"
                    className="h-12 w-full rounded-xl border border-[#ECE7DE] pl-12 pr-4 outline-none transition focus:border-[#4F8A6A]"
                  />
                </div>
              </div>

              {/* Deadline */}
              <div className="md:col-span-2">
                <label className="mb-2 block font-semibold text-[#244034]">
                  Campaign Deadline
                </label>
                <div className="relative">
                  <HiMiniCalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    required
                    type="date"
                    name="deadline"
                    className="h-12 w-full rounded-xl border border-[#ECE7DE] pl-12 pr-4 outline-none transition focus:border-[#4F8A6A]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reward Information */}
          <div className="rounded-3xl border border-[#ECE7DE] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,.05)]">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-xl bg-[#FFF8E8] p-3">
                <FaGift className="text-xl text-[#F59E42]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#244034]">
                  Reward Information
                </h2>
                <p className="text-sm text-gray-500">
                  Tell supporters what they will receive after contributing.
                </p>
              </div>
            </div>

            <label className="mb-2 block font-semibold text-[#244034]">
              Reward Details
            </label>
            <textarea
              required
              rows={5}
              name="rewardInfo"
              placeholder="Example: Early access, Exclusive T-shirt, Digital Certificate..."
              className="w-full rounded-xl border border-[#ECE7DE] p-4 outline-none transition focus:border-[#4F8A6A]"
            />
          </div>

          {/* Campaign Cover */}
          <div className="rounded-3xl border border-[#ECE7DE] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,.05)]">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-xl bg-[#EAF5EE] p-3">
                <FaImage className="text-xl text-[#4F8A6A]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#244034]">
                  Campaign Cover Image
                </h2>
                <p className="text-sm text-gray-500">
                  Upload an attractive image for your campaign.
                </p>
              </div>
            </div>

            <input
              required
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="file-input file-input-bordered w-full"
            />

            {image && (
              <div className="mt-6 overflow-hidden rounded-2xl border border-[#ECE7DE]">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="h-72 w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Additional Details */}
          <div className="rounded-3xl border border-[#ECE7DE] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,.05)]">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#244034]">
                  Additional Details
                </h2>
                <p className="text-sm text-gray-500">
                  Add custom information for your campaign.
                </p>
              </div>

              <button
                type="button"
                onClick={addMoreFieldFunction}
                className="btn border-none bg-[#4F8A6A] text-white hover:bg-[#3E7258]"
              >
                <FaPlus />
                Add Field
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Field Name (Example: productCountry)"
                value={customField.key}
                onChange={(e) =>
                  setCustomField({
                    ...customField,
                    key: e.target.value,
                  })
                }
                className="input input-bordered w-full"
              />

              <input
                type="text"
                placeholder="Field Value"
                value={customField.value}
                onChange={(e) =>
                  setCustomField({
                    ...customField,
                    value: e.target.value,
                  })
                }
                className="input input-bordered w-full"
              />
            </div>

            {customFields.length > 0 && (
              <div className="mt-8 space-y-3">
                {customFields.map((field, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl border border-[#ECE7DE] bg-[#FFFDF9] p-4"
                  >
                    <div>
                      <p className="font-semibold text-[#244034]">
                        {field.key} ({field.label})
                      </p>
                      <p className="text-sm text-gray-500">{field.value}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setCustomFields(
                          customFields.filter((_, i) => i !== index)
                        )
                      }
                      className="text-sm font-semibold text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#4F8A6A] px-10 py-4 font-semibold text-white transition w-full hover:bg-[#3E7258] disabled:bg-gray-400"
            >
              {loading ? "Publishing..." : "Publish Campaign"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}