import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "node:http";
import { join } from "node:path";
// Importar rutas
import qrMiaChat from "./routes/qrMiaChat.js";

dotenv.config();

// Exportar una función que crea y devuelve tanto la aplicación Express como el servidor HTTP
export const createExpressServer = () => {
	const port = process.env.PORT || 3004;

	const app = express();
	const httpServer = createServer(app);

	const publicDirectoryPath = join(process.cwd(), "public");

	app.use(express.static(publicDirectoryPath));

	// Configurar opciones de CORS
	const corsOptions = {
		origin: "*",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
		optionsSuccessStatus: 200,
	};

	// Aplicar middleware CORS con opciones
	app.use(cors(corsOptions));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// Añadir una ruta simple de verificación de salud
	app.get("/", (req, res) => {
		res.status(200).send("El servidor del Bot de WhatsApp está funcionando");
	});

	// Exponer rutas
	app.use("/api", qrMiaChat);

	// Iniciar el servidor
	httpServer.listen(port, () =>
		console.log("Servidor ejecutándose en el puerto", port)
	);

	return { app, httpServer };
};

// Mantener la exportación por defecto para compatibilidad con versiones anteriores
const startServer = () => {
	const { httpServer } = createExpressServer();
	return httpServer;
};

export default startServer;
