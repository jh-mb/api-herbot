import OpenAI from "openai";

// Assign API key to variable
const apiKey = process.env.OPEN_AI_KEY;
// Initialise OpenAI API
const openai = new OpenAI({ apiKey: apiKey });

export async function GET() {
  return new Response(JSON.stringify({ hola: "test" }));
}

export async function POST(req: Request) {
  // The 'messages' variable contains the conversation history
  const { messages } = await req.json();
  // Here is where we communicate with the OpenAI API to create our chatbot.
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Actua como un asesor de ventas que vende autos y motos, tu nombre en Mike.",
      },
      ...messages,
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 300,
  });

  return new Response(JSON.stringify(response));
}
