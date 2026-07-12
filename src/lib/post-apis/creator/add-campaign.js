const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const postCampaign = async (campaignData) => {
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
