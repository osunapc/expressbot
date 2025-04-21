import { ciudades } from "../libs/data.js";

export async function obtenerZonasDelivery(ciudad) {
	try {
		// Encontrar la ciudad que coincide con el parámetro
		const ciudadEncontrada = ciudades.find((c) => c.nombre === ciudad);

		if (!ciudadEncontrada) {
			console.log(`No se encontró la ciudad ${ciudad}`);
			return [];
		}

		// Devolver las farmacias de esa ciudad
		const zonasDelivery = ciudadEncontrada.zonasDelivery;

		return zonasDelivery || [];
	} catch (error) {
		console.error("Error al obtener zonas de delivery:", error);
		return [];
	}
}
