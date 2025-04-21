import BotWhatsapp from "@bot-whatsapp/bot";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import "dotenv/config";
import context from "../contextAi/contextAi.js";

const ai = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

export default BotWhatsapp.addKeyword(["audio"]).addAnswer(
	"🎧 Dame un segundo para escucharte...",
	null,
	async (ctx, { flowDynamic, fallBack }) => {
		try {
			// **Asume que ctx.message.audio.localPath contiene la ruta al archivo de audio**
			const audioFilePath = ctx.message?.audio?.localPath;

			if (!audioFilePath || !fs.existsSync(audioFilePath)) {
				return fallBack("No se pudo acceder al archivo de audio.");
			}

			const audioBytes = fs.readFileSync(audioFilePath);
			const audioPart = {
				inline_data: {
					data: Buffer.from(audioBytes).toString("base64"),
					mime_type: "audio/ogg", // Ajusta el tipo MIME según el formato real
				},
			};

			const promptTranscribe = "Genera una transcripción de este audio.";
			const responseTranscribe = await model.generateContent({
				contents: [promptTranscribe, audioPart],
			});
			const transcripcion = responseTranscribe.response?.text();

			if (transcripcion) {
				console.log("Audio transcrito:", transcripcion);
				const preguntaUsuario = transcripcion;
				const promptConContexto = `${context} Pregunta del usuario: ${preguntaUsuario}`;
				const responseGemini = await model.generateContent({
					contents: promptConContexto,
				});
				const respuestaFinal = responseGemini.response?.text();

				if (respuestaFinal) {
					await flowDynamic([{ body: respuestaFinal }]);
				} else {
					return fallBack(
						"No obtuve una respuesta de Gemini para esa consulta."
					);
				}
			} else {
				return fallBack("No se pudo transcribir el audio.");
			}
		} catch (error) {
			console.error("Error al procesar el audio:", error);
			return fallBack("Ocurrió un error al procesar el audio.");
		}
	}
);
