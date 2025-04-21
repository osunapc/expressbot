import BotWhatsapp from "@bot-whatsapp/bot";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
import context from "../contextAi/contextAi.js";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

export default BotWhatsapp.addKeyword(["", { regex: false }]).addAnswer(
	"Dame un segundo...",
	{ capture: true },
	async (ctx, { flowDynamic, fallBack }) => {
		try {
			if (ctx.fromMe) return;
			if (ctx.isGroup) return;
			const preguntaUsuario = ctx.body;

			if (!preguntaUsuario?.trim()) return fallBack();
			const promptConContexto = `${context} Pregunta del usuario: ${preguntaUsuario}`;

			const result = await model.generateContent(promptConContexto);
			const respuestaGemini = result.response?.text();

			if (respuestaGemini) {
				await flowDynamic([{ body: respuestaGemini, delay: 3000 }]);
			} else {
				return fallBack("No entendi tu pregunta, puedes explicarme .");
			}
		} catch (error) {
			console.error("Error al consultar Gemini (desarrollo web):", error);
			return fallBack("Ocurrió un error al procesar tu consulta.");
		}
	}
);
