const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getMyCampaigns=async(id)=>{
    const res = await fetch(
          `${baseUrl}/api/my-campaigns/${id}`
        );

         const data = await res.json();
  return data;
}