export default async (req) => {
  try {
    const formData = await req.json();

    const leadId = `EC-QUIZ-${Math.floor(100000 + Math.random() * 900000)}`;

    const payload = {
      contactName: formData.contactName || "",
      phone: formData.phone || "",
      email: formData.email || "",
      businessName: formData.businessName || "",
      industry: formData.industry || "",
      biggestProblem: formData.biggestProblem || "",
      weeklyLeads: formData.weeklyLeads || "",
      answeringMethod: formData.answeringMethod || "",
      recommendedProducts: formData.recommendedProducts || {},
      leadId,
    };

    const webhookUrl = "https://services.leadconnectorhq.com/hooks/EeaJk29wNmjpYB3MQAZu/webhook-trigger/ca409431-6e3f-445d-b1eb-0c44bab290e4";
          

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!webhookResponse.ok) {
      throw new Error("HighLevel webhook failed");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Revenue Loss & Profit Report unlocked successfully",
        leadId,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Unable to submit quiz report",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
