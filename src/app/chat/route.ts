import OpenAI from "openai";

// Assign API key to variable
const apiKey = process.env.OPEN_AI_KEY;
// Initialise OpenAI API
const openai = new OpenAI({ apiKey: apiKey });

function setCorsHeaders(response: Response) {
  response.headers.set("Access-Control-Allow-Origin", "*"); // Cambia '*' por el dominio permitido en producción
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

export async function GET() {
  const response = new Response(JSON.stringify({ hola: "test" }));
  return setCorsHeaders(response);
}

export async function POST(req: Request) {
  const { messages } = await req.json();
  const openaiResponse = await openai.chat.completions.create({
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

  const response = new Response(JSON.stringify(openaiResponse));
  return setCorsHeaders(response);
}

// Manejo de opciones para solicitudes preflight
export async function OPTIONS() {
  const response = new Response(null, { status: 204 });
  return setCorsHeaders(response);
}
