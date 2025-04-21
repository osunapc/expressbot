// Flujo para crear cliente
import BotWhatsapp from "@bot-whatsapp/bot";
import { crearCiente } from "../funciones/crearCliente.js";

export default BotWhatsapp.addKeyword([
	"crear cliente",
	"nuevo cliente",
	"registrar cliente",
]).addAnswer(
	[
		"📝 *Registro de Nuevo Cliente* 👤",
		"",
		"Por favor, completa los siguientes datos para registrar al cliente:",
		"",
		"1. *Cédula:*",
		"2. *Nombre:*",
		"3. *Apellido:*",
		"4. sector",
		"5. *Dirección Principal:*",
		"6. *Dirección Alternativa (opcional):*",
		"7. *Teléfono:*",
		"8. *tag* (opcional)",
		"9. *Ciudad:*",
		"",
		"Ejemplo de respuesta:",
		"1. 12345678",
		"2. Juan",
		"3. Pérez",
		"4. los curos",
		"5. Calle Principal, Edificio Central, Apto 5",
		"6. Urbanización Las Flores, Casa 10",
		"7. +584141234567",
		"8. buen cliente",
		"9. Merida",
	],
	{ capture: true },
	async (ctx, { flowDynamic, fallBack }) => {
		try {
			if (ctx.fromMe) return;

			// Obtener el texto completo del mensaje
			const respuestaCompleta = ctx.body.trim();

			// Dividir la respuesta en líneas
			const lineas = respuestaCompleta.split("\n");

			// Objeto para almacenar los datos del cliente
			const datosCliente = {};

			// Procesar cada línea para extraer la información
			for (let i = 0; i < lineas.length; i++) {
				const linea = lineas[i].trim();

				// Ignorar líneas vacías
				if (!linea) continue;

				// Buscar el número al inicio de la línea (1., 2., etc.)
				const match = linea.match(/^(\d+)\.?\s*(.*)$/);

				if (match) {
					const numero = Number.parseInt(match[1]);
					const valor = match[2].trim();

					switch (numero) {
						case 1:
							datosCliente.ci = Number.parseInt(valor);
							break;
						case 2:
							datosCliente.nombre = valor;
							break;
						case 3:
							datosCliente.apellido = valor;
							break;
						case 4:
							datosCliente.sector = valor; 
							break;
						case 5:
							datosCliente.direccion = valor; 
							break;
						case 6:
							datosCliente.direccion2 = valor !== "-" ? valor : null;
							break;
						case 7:
							datosCliente.telefono = valor;
							break;
							
						case 8:
							datosCliente.tag = valor;
							break;
						case 9:
							datosCliente.ciudad = valor;
							break;
					}
				}
			}

			// Verificar que se hayan proporcionado los datos mínimos necesarios
			if (!datosCliente.ci || isNaN(datosCliente.ci)) {
				return fallBack("❌ Por favor, proporciona una cédula válida.");
			}

			if (!datosCliente.nombre) {
				return fallBack("❌ Por favor, proporciona el nombre del cliente.");
			}

			if (!datosCliente.apellido) {
				return fallBack("❌ Por favor, proporciona el apellido del cliente.");
			}

			if (!datosCliente.direccion) {
				return fallBack(
					"❌ Por favor, proporciona la dirección principal del cliente."
				);
			}

			if (!datosCliente.telefono) {
				return fallBack("❌ Por favor, proporciona el teléfono del cliente.");
			}

			// Verificar si el cliente ya existe
			const clienteExistente = await verificarCliente(datosCliente.ci);

			if (clienteExistente) {
				return fallBack(
					"❌ Ya existe un cliente con la cédula *" +
						datosCliente.ci +
						"*.\n\nSi deseas actualizar sus datos, usa el comando *actualizar cliente*."
				);
			}
			const data = {
				cedula: datosCliente.ci,
				nombre: datosCliente.nombre,
				apellido: datosCliente.apellido,
				direccion: datosCliente.direccion,
				direccion2: datosCliente.direccion2,
				telefono: datosCliente.telefono,
				tag: datosCliente.tag,
				ciudad: datosCliente.ciudad,
			};
			

			// Crear el cliente en la base de datos
			try {
				const nuevoCliente = await crearCiente(data);

				await flowDynamic([
					"✅ *¡Cliente registrado con éxito!*",
					"",
					`*ID:* ${nuevoCliente.id}`,
					`*Nombre:* ${nuevoCliente.nombre} ${nuevoCliente.apellido}`,
					`*Cédula:* ${nuevoCliente.ci}`,
					`*Teléfono:* ${nuevoCliente.telefono}`,
					`*Dirección:* ${nuevoCliente.direccion}`,
					nuevoCliente.direccion2
						? `*Dirección alternativa:* ${nuevoCliente.direccion2}`
						: "",
					`*Ciudad:* ${nuevoCliente.ciudad || "No especificada"}`,
					"",
					"Ahora puedes crear un envío para este cliente con el comando *crear envio*.",
				]);
			} catch (error) {
				console.error("Error al crear cliente:", error);
				return fallBack(
					"❌ Ocurrió un error al registrar el cliente. Por favor, intenta nuevamente."
				);
			}
		} catch (error) {
			console.error("Error al procesar formulario de cliente:", error);
			return fallBack(
				"❌ Ocurrió un error al procesar tu solicitud. Por favor, verifica los datos e intenta nuevamente."
			);
		}
	}
);
