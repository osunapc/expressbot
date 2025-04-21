import { addKeyword } from "@builderbot/bot";
import { crearRelacion } from "../funciones/creerRelacion.js";

export default addKeyword([
	"crear relacion",
	"nueva relacion",
	"relacion",
	"generar pdfs",
]).addAnswer(
	["Dame un segundo mientras se crean los PDFs de los motorizados..."],
	null,
	async (ctx, { flowDynamic, state }) => {
		try {
			await flowDynamic("Procesando información de envíos...");

			const resultado = await crearRelacion();

			if (!resultado.success) {
				return await flowDynamic(`❌ Error: ${resultado.message}`);
			}

			if (resultado.pdfs.length === 0) {
				return await flowDynamic(
					"No se encontraron motorizados con envíos para generar PDFs."
				);
			}

			await flowDynamic(
				`✅ Se han generado ${resultado.pdfs.length} PDFs correctamente.`
			);

			// Enviar cada PDF
			for (const pdf of resultado.pdfs) {
				await flowDynamic(`📄 Enviando PDF para: ${pdf.nombre}`, {
					relay: 5000,
				});
				const mediaPath = pdf.path;
				await flowDynamic({
					media: mediaPath,
					caption: `Relación de envíos para ${pdf.nombre}`,
				});
			}

			await flowDynamic("✅ Todos los PDFs han sido enviados correctamente.");
		} catch (error) {
			console.error("Error en el flujo de generación de PDFs:", error);
			await flowDynamic(
				"❌ Ocurrió un error al generar los PDFs. Por favor, intenta nuevamente."
			);
		}
	}
);
