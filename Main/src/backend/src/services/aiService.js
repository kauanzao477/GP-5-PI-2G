import axios from "axios";

export const improveTextWithAI = async (formData) => {
  const prompt = `
Melhore os textos abaixo para um site profissional.
Deixe mais persuasivo, claro e organizado.

Dados:
${JSON.stringify(formData, null, 2)}

Retorne JSON estruturado com os mesmos campos.
`;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "Você é um especialista em copywriting." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
    }
  );

  const content = response.data.choices[0].message.content;

  return JSON.parse(content);
};