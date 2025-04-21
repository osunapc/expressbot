import { API_URL } from "../constants/api.js";

export async function crearCiente(clienteData) {
	try {
		const res = await fetch(`${API_URL}/api/clientes`, {
			method: "POST",
			body: JSON.stringify(clienteData),
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
		});

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const nuevoCliente = await res.json();

		return nuevoCliente;
	} catch (error) {
		console.error("Error al crear envío:", error);
	}
}
