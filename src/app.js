import { createBot } from "@builderbot/bot";
import { provider } from "./provider/index.js";
import { database } from "./database/index.js";
import flow from "./flow/index.js";
import { createExpressServer } from "./http/index.js"; // Importación modificada

const main = async () => {
	// Obtener la aplicación Express y el servidor HTTP del módulo http
	const { app, httpServer } = createExpressServer();

	// Inicializar el bot con el mismo servidor HTTP
	await createBot({
		flow,
		provider,
		database,
		// Pasar la aplicación Express al bot si es necesario
		serverOptions: {
			server: httpServer,
		},
	});
};

main();
