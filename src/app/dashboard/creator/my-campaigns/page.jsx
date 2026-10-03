"use client";

import { authClient } from "@/lib/auth-client";
import { getMyCampaigns } from "@/lib/get-apis/creator/my-campaigns";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import UpdateCampaignModal from "./UpdateCampaignModal";

export default function MyCampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // মডাল এবং সিলেক্টেড ডাটার স্টেট
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // ডাটা ফেচিং ফাংশনটি useCallback দিয়ে র‍্যাপ করা হয়েছে যাতে রেন্ডার লুপ না হয়
  const loadCampaigns = useCallback(async (userId) => {
    try {
      const res = await getMyCampaigns(userId);
      if (res && Array.isArray(res)) return res;
      if (res && Array.isArray(res.campaigns)) return res.campaigns;
      if (res && Array.isArray(res.data)) return res.data;
      return [];
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      return [];
    }
  }, []);

  // এরর দূর করার জন্য ক্লিনআপ ফ্ল্যাগসহ ইফেক্ট লজিক
  useEffect(() => {
    if (!user?.id) return;

    let isMounted = true;
    
    // সিঙ্ক্রোনাস সাইড-ইফেক্ট এড়াতে মাইক্রো-টাস্কে রাখা
    const fetchData = async () => {
      if (isMounted) setLoading(true);
      const data = await loadCampaigns(user.id);
      if (isMounted) {
        setCampaigns(data);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [user?.id, loadCampaigns]);

  const handleEditClick = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleUpdateSuccess = async () => {
    setIsModalOpen(false);
    setSelectedCampaign(null);
    
    // ডাটা রিফ্রেশ হ্যান্ডলার
    if (user?.id) {
      setLoading(true);
      const data = await loadCampaigns(user.id);
      setCampaigns(data);
      setLoading(false);
    }
  };

  const statusStyles = {
    active: "bg-[#EAF5EE] text-[#4F8A6A]",
    rejected: "bg-red-50 text-red-600 border border-red-100",
    pending: "bg-amber-50 text-amber-600 border border-amber-100",
  };

  return (
    <section className="p-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#244034]">My Campaigns</h1>
          <p className="mt-2 text-gray-500">Manage all campaigns you have created.</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex h-80 items-center justify-center">
            <span className="loading loading-spinner loading-lg text-success"></span>
          </div>
        )}

        {/* Empty */}
        {!loading && campaigns.length === 0 && (
          <div className="rounded-3xl border border-[#ECE7DE] bg-white py-24 text-center">
            <h2 className="text-2xl font-bold text-[#244034]">No Campaign Found</h2>
            <p className="mt-3 text-gray-500">Start your first campaign today.</p>
          </div>
        )}

        {/* Table */}
        {!loading && campaigns.length > 0 && (
          <div className="overflow-hidden rounded-3xl border border-[#ECE7DE] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-[#F8F5EF]">
                    <th>Campaign</th>
                    <th>Category</th>
                    <th>Goal</th>
                    <th>Raised</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => {
                    const currentStatus = (campaign.status || "pending").toLowerCase();
                    const badgeClass = statusStyles[currentStatus] || "bg-gray-100 text-gray-600";

                    return (
                      <tr key={campaign._id || campaign.id}>
                        <td>
                          <div className="flex items-center gap-4">
                            {campaign.campaignImage && (
                              <Image
                                src={campaign.campaignImage}
                                alt={campaign.campaignTitle || "Campaign"}
                                width={60}
                                height={60}
                                className="rounded-xl object-cover"
                              />
                            )}
                            <div>
                              <h3 className="font-semibold text-[#244034]">{campaign.campaignTitle}</h3>
                              <p className="max-w-xs truncate text-sm text-gray-500">{campaign.campaignStory}</p>
                            </div>
                          </div>
                        </td>
                        <td>{campaign.category}</td>
                        <td>{campaign.fundingGoal}</td>
                        <td>{campaign.raisedAmount || 0}</td>
                        <td>{campaign.deadline}</td>
                        <td>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${badgeClass}`}>
                            {campaign.status || "Pending"}
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleEditClick(campaign)}
                              className="btn btn-sm btn-ghost"
                            >
                              <HiOutlinePencilSquare size={20} />
                            </button>
                            <button className="btn btn-sm btn-ghost text-red-500">
                              <HiOutlineTrash size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* মডাল কি ওপেন আছে এবং ডাটা আছে কি না তা এখানে হ্যান্ডেল করা হলো, যাতে মডালের ভেতর ইফেক্ট না লাগে */}
      {isModalOpen && selectedCampaign && (
        <UpdateCampaignModal 
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setSelectedCampaign(null); }}
          campaignData={selectedCampaign}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </section>
  );
}