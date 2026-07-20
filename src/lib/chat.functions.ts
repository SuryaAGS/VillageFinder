import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const chatWithAI = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => {
    const i = input as { message?: unknown };

    const message =
      typeof i.message === "string"
        ? i.message.trim().slice(0, 1000)
        : "";

    if (!message) {
      throw new Error("Message is required");
    }

    return { message };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      throw new Error("OpenRouter API key not found.");
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b:free",
          messages: [
            {
              role: "system",
              content:
                "You are VillageFinder AI. Help villagers find nearby products, shops, answer shopping questions, and provide clear, friendly responses.",
            },
            {
              role: "user",
              content: data.message,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter Error: ${errorText}`);
    }

    const json = await response.json();

    const reply =
      json.choices?.[0]?.message?.content ??
      "Sorry, I couldn't generate a response.";

    return {
      reply,
    };
  });