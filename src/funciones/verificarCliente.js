import { API_URL } from "../constants/api.js";


export async function verificarCliente(cedula) {
	try {
		// Convertir a número entero
		const cedulaNum = Number.parseInt(cedula);

		if (isNaN(cedulaNum)) {
			throw new Error("Cédula inválida");
		}

		// Buscar cliente por cédula
		const res = await fetch(`${API_URL}/api/clientes/${cedulaNum}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const cliente = await res.json();

		return cliente;
	} catch (error) {
		console.error("Error al verificar cliente:", error);
		return null;
	}
}
