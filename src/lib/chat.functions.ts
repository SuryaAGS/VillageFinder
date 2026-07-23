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
  .handler(async ({ data, context }) => {
    console.log("Context:", context);
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      throw new Error("OpenRouter API key not found.");
    }

    try {
      const { data: shops, error } = await context.supabase
  .from("shops")
  .select(`
    id,
    name,
    village,
    category,
    is_open,
    inventory (
      name,
      price,
      unit,
      status
    )
  `);

if (error) {
  console.error("========== SUPABASE ERROR ==========");
  console.error(error);
  console.error("====================================");
} else {
  console.log("========== SHOPS DATA ==========");
  console.log(JSON.stringify(shops, null, 2));
  console.log("================================");
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
    content: `
You are VillageFinder AI.

You are the official shopping assistant.

Use ONLY the shop information below.

If the requested product is available, ALWAYS reply EXACTLY in this format:

✅ <Product Name> is available.

🏪 Shop: <Shop Name>
📍 Village: <Village Name>
💰 Price: ₹<Price>/<Unit>
📦 Stock: Available

Do NOT use Markdown.
Do NOT use **bold**.
Do NOT use bullet points.
Do NOT write "status: in".
Convert:
- in → Available
- out → Out of Stock

If multiple shops have the product, list each one separately.

If the product is not found, reply exactly:

❌ Sorry, I couldn't find that product in nearby shops.

Never invent shops or prices.

Nearby shops:

${JSON.stringify(shops ?? [], null, 2)}
`,
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

        console.error("========== OPENROUTER ERROR ==========");
        console.error("Status:", response.status);
        console.error("Status Text:", response.statusText);
        console.error(errorText);
        console.error("======================================");

        throw new Error(`OpenRouter Error: ${errorText}`);
      }

      const json = await response.json();

      console.log("OpenRouter Success:", json);

      const reply =
        json.choices?.[0]?.message?.content ??
        "Sorry, I couldn't generate a response.";

      return {
        reply,
      };
    } catch (err) {
      console.error("========== FETCH ERROR ==========");
      console.error(err);
      console.error("=================================");

      throw err;
    }
  });