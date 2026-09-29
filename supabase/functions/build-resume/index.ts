const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { details } = await req.json();

    if (!details) {
      return new Response(
        JSON.stringify({ error: "details are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const prompt = `You are an expert ATS-friendly resume writer.
Using the following details, create a clean, professional, ATS-optimized resume in plain text.
Use standard section headings: Professional Summary, Work Experience, Education, Skills, Projects.
Use action verbs and quantify achievements where possible. Do not use tables or columns.

Details:
${JSON.stringify(details, null, 2)}`;

    const cohereKey = Deno.env.get("COHERE_API_KEY");
    if (!cohereKey) {
      return new Response(
        JSON.stringify({ error: "AI service is not configured. Please contact support." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const aiResponse = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cohereKey}`,
      },
      body: JSON.stringify({
        model: "command-r-plus",
        message: prompt,
        temperature: 0.6,
      }),
    });

    if (!aiResponse.ok) {
      return new Response(
        JSON.stringify({ error: "Resume generation failed. Please try again." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const aiData = await aiResponse.json();
    const resumeText = (aiData.text || "").trim();

    return new Response(
      JSON.stringify({ resumeText }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
