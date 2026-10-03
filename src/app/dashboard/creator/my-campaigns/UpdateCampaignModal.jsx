"use client";

import { useState } from "react";
import Image from "next/image";

import { toast } from "react-toastify";
import { updateMyCampaign } from "@/lib/post-apis/update-apis/creator/update-my-campaign";

export default function UpdateCampaignModal({ isOpen, onClose, campaignData, onUpdateSuccess }) {
  // ইনিশিয়াল স্টেট ডিফাইন
  const [formData, setFormData] = useState(() => {
    if (!campaignData) return {
      campaignTitle: "",
      category: "",
      fundingGoal: "",
      minimumContribution: "",
      deadline: "",
      campaignImage: "",
      campaignStory: "",
      rewardInfo: ""
    };

    return {
      ...campaignData,
      deadline: campaignData.deadline ? campaignData.deadline.split("T")[0] : "",
    };
  });

  const [isUpdating, setIsUpdating] = useState(false);

  // মডাল ওপেন না থাকলে কিছুই রেন্ডার হবে না
  if (!isOpen) return null;

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await updateMyCampaign(campaignData._id || campaignData.id, formData);
      
      if (response) {
        toast.success("Campaign updated successfully!");
        onUpdateSuccess(); 
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Something went wrong while updating!");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="modal modal-open modal-bottom sm:modal-middle z-50">
      <div className="modal-box max-w-3xl bg-white rounded-3xl p-8 border border-[#ECE7DE] shadow-xl relative">
        
        {/* Close Button */}
        <button 
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-6 top-6 text-gray-500 border border-[#ECE7DE]"
        >
          ✕
        </button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#244034]">Update Campaign</h1>
          <p className="text-sm text-gray-500">Edit your campaign details below</p>
        </div>

        <form onSubmit={handleUpdateSubmit} className="space-y-6">
          <div className="form-control w-full">
            <label className="label font-semibold text-[#244034]">Campaign Title</label>
            <input
              type="text"
              name="campaignTitle"
              value={formData.campaignTitle || ""}
              onChange={handleFormChange}
              className="input input-bordered w-full rounded-xl focus:border-[#244034] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="form-control w-full">
              <label className="label font-semibold text-[#244034]">Category</label>
              <select
                name="category"
                value={formData.category || ""}
                onChange={handleFormChange}
                className="select select-bordered w-full rounded-xl focus:border-[#244034] focus:outline-none"
                required
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

            <div className="form-control w-full">
              <label className="label font-semibold text-[#244034]">Funding Goal ($)</label>
              <input
                type="number"
                name="fundingGoal"
                value={formData.fundingGoal || ""}
                onChange={handleFormChange}
                className="input input-bordered w-full rounded-xl focus:border-[#244034] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="form-control w-full">
              <label className="label font-semibold text-[#244034]">Minimum Contribution ($)</label>
              <input
                type="number"
                name="minimumContribution"
                value={formData.minimumContribution || ""}
                onChange={handleFormChange}
                className="input input-bordered w-full rounded-xl focus:border-[#244034] focus:outline-none"
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-semibold text-[#244034]">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline || ""}
                onChange={handleFormChange}
                className="input input-bordered w-full rounded-xl focus:border-[#244034] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label font-semibold text-[#244034]">Campaign Image URL</label>
            <input
              type="url"
              name="campaignImage"
              value={formData.campaignImage || ""}
              onChange={handleFormChange}
              className="input input-bordered w-full rounded-xl focus:border-[#244034] focus:outline-none"
              required
            />
            {formData.campaignImage && (
              <div className="relative mt-4 h-44 w-full overflow-hidden rounded-2xl border border-[#ECE7DE]">
                <Image
                  src={formData.campaignImage}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label font-semibold text-[#244034]">Campaign Story</label>
            <textarea
              name="campaignStory"
              value={formData.campaignStory || ""}
              onChange={handleFormChange}
              rows={4}
              className="textarea textarea-bordered w-full rounded-xl focus:border-[#244034] focus:outline-none"
              required
            ></textarea>
          </div>

          <div className="form-control w-full">
            <label className="label font-semibold text-[#244034]">Reward Information</label>
            <input
              type="text"
              name="rewardInfo"
              value={formData.rewardInfo || ""}
              onChange={handleFormChange}
              className="input input-bordered w-full rounded-xl focus:border-[#244034] focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn rounded-xl border border-[#ECE7DE] bg-white px-6 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="btn rounded-xl bg-[#244034] px-8 text-white hover:bg-[#1b3027]"
            >
              {isUpdating ? <span className="loading loading-spinner loading-sm"></span> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop bg-black/40" onClick={onClose}></div>
    </div>
  );
}