import { io } from "socket.io-client";
import { API_URL } from "../constants/api.js";

const socket = io(API_URL);

export async function crearEnvio(envioData) {
	return new Promise((resolve, reject) => {
		try {
			// Emitir el evento de creación de envío a través de Socket.IO
			socket.emit("client:crearEnvio", envioData, (response) => {
				if (response.success) {
					console.log(
						"Envío creado correctamente:",
						response.data || response.id
					);
					resolve(response.data || response.id); // Resuelve la promesa con los datos del envío
				} else {
					console.error("Error del servidor:", response.error);
					reject(new Error(response.error || "Error al crear envío"));
				}
			});
		} catch (error) {
			console.error("Error al crear envío:", error);
			reject(error);
		}
	});
}
