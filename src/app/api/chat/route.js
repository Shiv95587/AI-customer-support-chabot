// src/app/api/chat/route.js

export async function POST(request) {
  if (request.method === "POST") {
    try {
      const OPENROUTER_API_KEY = `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`; // Use environment variable for API key
      const { message } = await request.json();

      if (!OPENROUTER_API_KEY) {
        return new Response(
          JSON.stringify({ error: "API key not configured" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "meta-llama/llama-3.1-8b-instruct:free",
            messages: [{ role: "user", content: message }],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return new Response(JSON.stringify(errorData), {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        });
      }

      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error processing request:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } else {
    return new Response(
      JSON.stringify({ message: "Only POST requests are allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
