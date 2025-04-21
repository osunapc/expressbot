import BotWhatsapp from "@bot-whatsapp/bot";
import "dotenv/config";
import obtenerPrecioDolar from "../funciones/bcv.js";
import { calcularDistanciaEnKm } from "../funciones/calcularDistancia.js";
import { determinarZonaPorDistancia } from "../funciones/determinarZonaporDistancia.js";
import { verificarCliente } from "../funciones/verificarCliente.js";
import { crearEnvio } from "../funciones/crearEnvio.js";
import { obtenerFarmacias } from "../funciones/obtenerFarmacias.js";
import { obtenerZonasDelivery } from "../funciones/obtenerZonasDelivery.js";
/* 
// Flujo para confirmación final
const flujoConfirmacion = addKeyword([
	"SI",
	"si",
	"Si",
	"sí",
	"Sí",
	"NO",
	"no",
	"No",
]).addAnswer(
	["Procesando tu respuesta..."],
	{ capture: true },
	async (ctx, { flowDynamic, fallBack }) => {
		try {
			const respuesta = ctx.body.trim().toLowerCase();

			// Verificar si tenemos los datos del envío en el contexto
			if (!ctx.envioData) {
				return fallBack(
					"❌ No se encontraron los datos del envío. Por favor, inicia el proceso nuevamente con *crear envio*."
				);
			}

			if (respuesta === "si" || respuesta === "sí") {
				// Crear el envío en la base de datos
				const envioCreado = await crearEnvio(ctx.envioData);

				await flowDynamic([
					"✅ *¡Pedido confirmado!*",
					"",
					`Tu pedido ha sido registrado con el número: *#${envioCreado.id}*`,
					"",
					"Un motorizado será asignado pronto y te notificaremos cuando esté en camino.",
					"",
					"Gracias por usar nuestro servicio de delivery. 🛵",
				]);
			} else if (respuesta === "no") {
				await flowDynamic([
					"❌ *Pedido cancelado*",
					"",
					"Has cancelado el pedido. Si deseas crear uno nuevo, escribe *crear envio*.",
				]);
			} else {
				return fallBack(
					"❌ Por favor, responde *SI* para confirmar o *NO* para cancelar."
				);
			}
		} catch (error) {
			console.error("Error al confirmar pedido:", error);
			return fallBack(
				"❌ Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente."
			);
		}
	}
);

const flujoSi = addKeyword(["si"]).addAnswer(
	["Procesando tu respuesta..."],
	async (ctx, { flowDynamic, fallBack }) => {
		if (ctx.fromMe) return;
		if (ctx.isGroup) return;
		console.log("Datos del envío guardados entrantes:", ctx.envioData);

		// Verificar si tenemos los datos del envío en el contexto
		if (!ctx.envioData) {
			return fallBack(
				"❌ No se encontraron los datos del envío. Por favor, inicia el proceso nuevamente con *crear envio*."
			);
		}
		// Crear el envío en la base de datos
		const envioCreado = await crearEnvio(ctx.envioData);

		await flowDynamic([
			"✅ *¡Pedido confirmado!*",
			"",
			`Tu pedido ha sido registrado con el número: *#${envioCreado.id}*`,
			"",
			"Un motorizado será asignado pronto y te notificaremos cuando esté en camino.",
			"",
			"Gracias por usar nuestro servicio de delivery. 🛵",
		]);
	}
);
const flujoNo = addKeyword(["no"]).addAnswer([
	"❌ *Pedido cancelado*",
	"",
	"Has cancelado el pedido. Si deseas crear uno nuevo, escribe *crear envio*.",
]); */
let datosEnvioTemporal = null;
// Plantilla del formulario
const formularioEnvio = `📝 *Nuevo Pedido de Delivery* 🛵

Por favor, completa los siguientes datos para tu pedido:

1. *Cédula Cliente:* 
2. *Dirección Exacta de Entrega:*
3. *Coordenadas de Entrega (Latitud,Longitud):*
4. *Farmacia de Salida:*
5. *¿Necesitas que retiremos un producto extra de otra farmacia?* (Sí/No)
6. *Si respondiste "Sí", ¿nombre de la farmacia extra?:*
7. *¿Necesitas punto de venta?* (Sí/No)
8. *¿Es extra urbano?* (Sí/No)
9. *Número de Factura:*
10. *Monto de Factura:* 
11. *Observaciones Adicionales:*
12. *Nombre del Operador:*
13. *cliente paga el delivery?:*(si/no)
14. *Si respondiste "Sí", ¿cantidad que paga?:*
15. *es reparto interno o bancario* (si/no)

Ejemplo de respuesta:
1. 12345678
2. Calle Principal, Edificio Central, Apto 5
3. 10.491016,-66.849287
4. Farmacia Central
5. No
6. -
7. Sí
8. No
9. 12345
10. 25.50
11. Llamar al llegar
12. Juan Pérez
13. no
14. 0
15. si`;

// Flujo principal para crear un envío
export default BotWhatsapp.addKeyword([
	"crear envio",
	"crear pedido",
	"nuevo envio",
]).addAnswer(
	formularioEnvio,
	{ capture: true },
	async (ctx, { flowDynamic, fallBack }) => {
		try {
			if (ctx.fromMe) return;

			// Obtener el texto completo del mensaje
			const respuestaCompleta = ctx.body.trim();

			// Dividir la respuesta en líneas
			const lineas = respuestaCompleta.split("\n");

			// Objeto para almacenar los datos del formulario
			const datosFormulario = {};

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
							datosFormulario.cedulaCliente = valor;
							break;
						case 2:
							datosFormulario.direccionEntrega = valor;
							break;
						case 3:
							// Extraer coordenadas
							const coordenadas = valor.split(",");
							if (coordenadas.length === 2) {
								datosFormulario.latitud = Number.parseFloat(
									coordenadas[0].trim()
								);
								datosFormulario.longitud = Number.parseFloat(
									coordenadas[1].trim()
								);
							}
							break;
						case 4:
							datosFormulario.farmaciaSalida = valor;
							break;
						case 5:
							datosFormulario.retirarProductoExtra =
								valor.toLowerCase() === "sí" || valor.toLowerCase() === "si";
							break;
						case 6:
							datosFormulario.nombreFarmaciaExtra =
								valor !== "-" ? valor : null;
							break;
						case 7:
							datosFormulario.llevarPunto =
								valor.toLowerCase() === "sí" || valor.toLowerCase() === "si";
							break;
						case 8:
							datosFormulario.extraUrbano =
								valor.toLowerCase() === "sí" || valor.toLowerCase() === "si";
							break;
						case 9:
							datosFormulario.numeroFactura = Number.parseInt(valor) || 0;
							break;
						case 10:
							datosFormulario.montoFactura = Number.parseFloat(valor) || 0;
							break;
						case 11:
							datosFormulario.observaciones = valor;
							break;
						case 12:
							datosFormulario.operador = valor;
							break;
						case 13:
							datosFormulario.clientePagaDelivery =
								valor.toLowerCase() === "sí" || valor.toLowerCase() === "si";
							break;
						case 14:
							datosFormulario.cantidadPaga = Number.parseFloat(valor) || 0;
							break;
						case 15:
							datosFormulario.repartoInternoBancario =
								valor.toLowerCase() === "sí" || valor.toLowerCase() === "si";
							break;
					}
				}
			}

			// Verificar que se hayan proporcionado los datos mínimos necesarios
			if (!datosFormulario.cedulaCliente) {
				return fallBack("❌ Por favor, proporciona la cédula del cliente.");
			}

			if (!datosFormulario.direccionEntrega) {
				return fallBack("❌ Por favor, proporciona la dirección de entrega.");
			}

			if (isNaN(datosFormulario.latitud) || isNaN(datosFormulario.longitud)) {
				return fallBack(
					"❌ Por favor, proporciona coordenadas válidas en formato latitud,longitud."
				);
			}

			if (!datosFormulario.farmaciaSalida) {
				return fallBack("❌ Por favor, indica la farmacia de salida.");
			}

			// Verificar si el cliente existe
			const cliente = await verificarCliente(datosFormulario.cedulaCliente);

			if (!cliente) {
				return fallBack(
					"❌ El cliente con cédula *" +
						datosFormulario.cedulaCliente +
						"* no existe en nuestra base de datos.\n\nPor favor, primero debes crear el cliente con el comando *crear cliente*."
				);
			}

			// Obtener farmacias disponibles
			const farmacias = await obtenerFarmacias(cliente.ciudad);
			console.log("estas son las farmacias", farmacias);

			// Buscar la farmacia seleccionada
			const farmaciaSeleccionada = farmacias.find(
				(f) =>
					f.nombre.toLowerCase() ===
					datosFormulario.farmaciaSalida.toLowerCase()
			);

			if (!farmaciaSeleccionada) {
				return fallBack(
					"❌ La farmacia indicada no está disponible. Por favor, selecciona una de las siguientes farmacias:\n\n" +
						farmacias.map((f) => f.nombre).join("\n")
				);
			}

			// Si se solicitó retirar producto extra, verificar la farmacia extra
			let farmaciaExtra = null;
			if (
				datosFormulario.retirarProductoExtra &&
				datosFormulario.nombreFarmaciaExtra
			) {
				farmaciaExtra = farmacias.find(
					(f) =>
						f.nombre.toLowerCase() ===
						datosFormulario.nombreFarmaciaExtra.toLowerCase()
				);

				if (!farmaciaExtra) {
					return fallBack(
						"❌ La farmacia extra indicada no está disponible. Por favor, selecciona una de las siguientes farmacias:\n\n" +
							farmacias.map((f) => f.nombre).join("\n")
					);
				}
			}

			// Calcular distancia
			const distancia = calcularDistanciaEnKm(
				farmaciaSeleccionada.latitud,
				farmaciaSeleccionada.longitud,
				datosFormulario.latitud,
				datosFormulario.longitud
			);

			// Obtener zonas de delivery
			const zonasDelivery = await obtenerZonasDelivery(cliente.ciudad);

			// Determinar zona por distancia
			const zonaSeleccionada = determinarZonaPorDistancia(
				distancia,
				zonasDelivery
			);

			// Calcular precio base del delivery
			let precioDelivery = zonaSeleccionada.precio;

			// Añadir costos adicionales
			if (datosFormulario.llevarPunto) {
				precioDelivery += 1.0;
			}

			if (datosFormulario.extraUrbano) {
				precioDelivery += 0.5;
			}

			if (datosFormulario.retirarProductoExtra) {
				precioDelivery += 1.0;
			}
			if (datosFormulario.clientePagaDelivery) {
				precioDelivery -= cantidadPaga;
			}
			if (datosFormulario.repartoInternoBancario && precioDelivery === 1.2) {
				precioDelivery += 0.3;
			}
			// Obtener precio del dólar BCV
			const precioBCV = await obtenerPrecioDolar();

			// Calcular precio en bolívares
			const precioBs = precioDelivery * precioBCV;

			// Crear el objeto de envío
			const envioData = {
				clienteId: cliente.id,
				direccion: datosFormulario.direccionEntrega,
				precioDelivery: precioDelivery,
				tasabcv: precioBCV,
				precioDelyBs: precioBs,
				motorizadoId: null,
				farmacia: farmaciaSeleccionada.nombre,
				horaEntrega: null,
				rechazadoPor: null,
				llevarPunto: datosFormulario.llevarPunto ? true : false,
				farmaciaExtra: datosFormulario.retirarProductoExtra
					? datosFormulario.nombreFarmaciaExtra
					: null,
				observaciones: datosFormulario.observaciones,
				ciudad: cliente.ciudad.trim(),
				operador: datosFormulario.operador || "Botexpress",
				pagocliente: datosFormulario.clientePagaDelivery ? true : false,
				valorpagocliente: datosFormulario.clientePagaDelivery
					? datosFormulario.pagocliente
					: 0,
				r_interno: datosFormulario.repartoInternoBancario ? true : false,
				factura: datosFormulario.numeroFactura || 0,
				montoFactura: datosFormulario.montoFactura || 0,
			};
			// Guardar los datos en la variable temporal
			datosEnvioTemporal = envioData;

			// Preparar resumen del pedido
			const resumen = [
				"📋 *RESUMEN DEL PEDIDO* 📋",
				"",
				`*Cliente:* ${cliente.nombre} ${cliente.apellido}`,
				`*Teléfono:* ${cliente.telefono}`,
				`*Dirección:* ${datosFormulario.direccionEntrega}`,
				"",
				`*Farmacia:* ${farmaciaSeleccionada.nombre}`,
				`*Distancia:* ${distancia.toFixed(2)} km`,
				`*Zona:* ${zonaSeleccionada.nombre}`,
				"",
			];

			// Añadir servicios adicionales al resumen
			if (datosFormulario.llevarPunto) {
				resumen.push("✅ Llevar punto de venta (+$1.00)");
			}

			if (datosFormulario.retirarProductoExtra) {
				resumen.push(
					`✅ Recoger producto de ${datosFormulario.nombreFarmaciaExtra} (+$1.00)`
				);
			}

			if (datosFormulario.extraUrbano) {
				resumen.push("✅ Extra urbano (+$0.50)");
			}

			// Añadir información de factura
			if (datosFormulario.numeroFactura > 0) {
				resumen.push("");
				resumen.push(`*Factura #:* ${datosFormulario.numeroFactura}`);
				resumen.push(
					`*Monto factura:* $${datosFormulario.montoFactura.toFixed(2)}`
				);
			}

			// Añadir observaciones
			if (datosFormulario.observaciones) {
				resumen.push("");
				resumen.push(`*Observaciones:* ${datosFormulario.observaciones}`);
			}

			// Añadir precio final
			resumen.push("");
			resumen.push(`*Precio Delivery:* $${precioDelivery.toFixed(2)}`);
			resumen.push(
				`*Precio en Bs:* ${precioBs.toFixed(2)} (Tasa BCV: ${precioBCV})`
			);
			resumen.push("");

			await flowDynamic([resumen.join("\n")]);

			await flowDynamic([
				"¿Confirmas este pedido? Responde *SI* para confirmar o *NO* para cancelar.",
			]);

			addAnswer(
				[], // No se necesita palabras clave específicas aquí, ya que capturará cualquier respuesta siguiente
				{ capture: true },
				async (ctx, { flowDynamic, fallBack }) => {
					const respuestaConfirmacion = ctx.body.trim().toLowerCase();
					if (
						respuestaConfirmacion === "si" ||
						respuestaConfirmacion === "sí"
					) {
						// Lógica para confirmar el pedido (crearEnvio)
						const envioCreado = await crearEnvio(datosEnvioTemporal);
						await flowDynamic(["✅ *¡Pedido confirmado!*"]);
					} else if (respuestaConfirmacion === "no") {
						await flowDynamic([
							"❌ *Pedido cancelado*",
							"puedes iniciar un nuevo envio escribiendo Crear envio",
						]);
					} else {
						return fallBack(
							"❌ Por favor, responde *SI* para confirmar o *NO* para cancelar."
						);
					}
				}
			);

			return;
		} catch (error) {
			console.error("Error al procesar formulario:", error);
			return fallBack(
				"❌ Ocurrió un error al procesar tu solicitud. Por favor, verifica los datos e intenta nuevamente."
			);
		}
	}
);
