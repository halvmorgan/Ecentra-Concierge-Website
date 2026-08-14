export default async (req) => {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const formData = await req.json();

    const webhookUrl = "https://services.leadconnectorhq.com/hooks/8wtMUEAdUnx0Y7nVe93R/webhook-trigger/QwIz6v9ENOnJZV4rvHng";

    if (!webhookUrl) {
      throw new Error("HIGHLEVEL_WEBHOOK_URL is missing");
    }

    const highLevelResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!highLevelResponse.ok) {
      throw new Error("HighLevel did not accept the lead");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Lead sent successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Something went wrong",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
