export default async (req) => {
  try {
    const formData = await req.json();

    const leadId = `EC-SMS-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date().toISOString();

    const payload = {
      id: leadId,
      type: "sms_opt_in",
      status: "new",
      createdAt: now,
      data: {
        name: formData.name || `${formData.firstName || ""} ${formData.lastName || ""}`.trim(),
firstName: formData.firstName || (formData.name ? formData.name.trim().split(/\s+/)[0] : ""),
lastName: formData.lastName || (formData.name ? formData.name.trim().split(/\s+/).slice(1).join(" ") : ""),
        phone: formData.phone || "",
        email: formData.email || "",
        businessName: formData.businessName || "",
        websiteUrl: formData.websiteUrl || "",
        optInMethod: "web_form",
        consentGiven: Boolean(formData.consentGiven),
        consentTimestamp: formData.consentTimestamp || now,
        ipAddress: formData.ipAddress || "",
        optInCategories: formData.optInCategories || [],
        notes: formData.notes || "",
      },
    };

    const webhookUrl = "https://services.leadconnectorhq.com/hooks/8wtMUEAdUnx0Y7nVe93R/webhook-trigger/82a00830-cc15-437f-a14d-6a480954dee2";

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
        message: "SMS opt-in submitted successfully",
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
        error: "Unable to submit SMS opt-in",
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
