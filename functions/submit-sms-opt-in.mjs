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
        name: formData.name || "",
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

    const webhookUrl = "PASTE_YOUR_HIGHLEVEL_WEBHOOK_URL_HERE";

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
