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

    const leadId = `EC-SITE-${Math.floor(100000 + Math.random() * 900000)}`;

    const webhookUrl = process.env.STARTER_SITE_WEBHOOK_URL;

    if (!webhookUrl) {
      throw new Error("STARTER_SITE_WEBHOOK_URL is missing");
    }

    const highLevelResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!highLevelResponse.ok) {
      throw new Error("HighLevel did not accept the starter site lead");
    }

    return new Response(
  JSON.stringify({
    success: true,
    message: "Starter site lead sent successfully",
    leadId,
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
