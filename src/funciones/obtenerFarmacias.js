import { ciudades } from "../libs/data.js";

export async function obtenerFarmacias(ciudad) {
	try {
		// Encontrar la ciudad que coincide con el parámetro
		const ciudadEncontrada = ciudades.find((c) => c.nombre === ciudad);

		if (!ciudadEncontrada) {
			console.log(`No se encontró la ciudad ${ciudad}`); 
			return [];
		}

		// Devolver las farmacias de esa ciudad
        const farmacias = ciudadEncontrada.farmacias;

		return farmacias || [];
	} catch (error) {
		console.error("Error al obtener farmacias:", error);
		return [];
	}
}
