const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const updateMyCampaign=async(id,campaignData)=>{
    const res = await fetch(
          `${baseUrl}/api/my/campaigns/update/${id}`,{
      method: 'PATCH',
      headers: {
        'Content-type' : 'application/json'
      },
      body : JSON.stringify(campaignData)
    }

        );

         const data = await res.json();
  return data;
}