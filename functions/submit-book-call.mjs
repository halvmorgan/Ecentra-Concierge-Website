export default async (req) => {
  try {
    const formData = await req.json();

    const leadId = `EC-CALL-${Math.floor(100000 + Math.random() * 900000)}`;

    const payload = {
      id: leadId,
      type: "book_call",
      status: "new",
      createdAt: new Date().toISOString(),
      data: {
        name: formData.name || "",
        businessName: formData.businessName || "",
        phone: formData.phone || "",
        email: formData.email || "",
        industry: formData.industry || "",
        preferredDate: formData.preferredDate || "",
        preferredTime: formData.preferredTime || "",
        timezone: formData.timezone || "",
        interest: formData.interest || "",
        notes: formData.notes || "",
        source: "Direct Booking Calendar",
      },
    };

    const webhookUrl = "https://services.leadconnectorhq.com/hooks/8wtMUEAdUnx0Y7nVe93R/webhook-trigger/acaace7e-41aa-4aa6-9936-385d15df9380";

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
        message: "Strategy call request submitted successfully",
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
        error: "Unable to submit strategy call request",
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
