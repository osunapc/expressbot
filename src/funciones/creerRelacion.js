import fs from "fs";
import path from "path";
import html_to_pdf from "html-pdf-node";

import { API_URL } from "../constants/api.js";

export async function crearRelacion() {
	try {
		// Obtener todos los motorizados
		const resMotorizado = await fetch(`${API_URL}/api/motorizados`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!resMotorizado.ok) {
			throw new Error("No se pudo obtener la lista de motorizados");
		}

		const motorizados = await resMotorizado.json();

		// Filtrar motorizados que tienen envíos
		const motorizadosConEnvios = motorizados.filter(
			(motorizado) => motorizado.envios && motorizado.envios.length > 0
		);

		if (motorizadosConEnvios.length === 0) {
			return {
				success: false,
				message: "No hay motorizados con envíos asignados",
			};
		}

		// Crear directorio para PDFs si no existe
		const pdfDir = path.join(process.cwd(), "pdfs");
		if (!fs.existsSync(pdfDir)) {
			fs.mkdirSync(pdfDir, { recursive: true });
		}

		// Generar PDFs para cada motorizado con envíos
		const pdfResults = [];

		for (const motorizado of motorizadosConEnvios) {
			// Generar HTML para el motorizado actual
			const htmlContent = generateHTMLContent(
				motorizado.envios,
				motorizado.nombre
			);

			// Configurar opciones para el PDF
			const options = {
				format: "A4",
				margin: { top: 20, right: 20, bottom: 20, left: 20 },
			};

			// Crear el archivo PDF
			const pdfFileName = `relacion_${motorizado.id}_${Date.now()}.pdf`;
			const pdfPath = path.join(pdfDir, pdfFileName);

			// Generar el PDF
			await new Promise((resolve, reject) => {
				html_to_pdf
					.generatePdf({ content: htmlContent }, options)
					.then((pdfBuffer) => {
						fs.writeFileSync(pdfPath, pdfBuffer);
						pdfResults.push({
							nombre: motorizado.nombre,
							path: pdfPath,
							motorizado: motorizado,
						});
						resolve();
					})
					.catch((error) => {
						console.error(
							`Error al generar PDF para ${motorizado.nombre}:`,
							error
						);
						reject(error);
					});
			});
		}

		return {
			success: true,
			message: `Se generaron ${pdfResults.length} PDFs correctamente`,
			pdfs: pdfResults,
		};
	} catch (error) {
		console.error("Error al crear relación:", error);
		return {
			success: false,
			message: "Error al generar los PDFs",
			error: error.message,
		};
	}
}

const generateHTMLContent = (envios, Motorizado) => {
	const totalIngresos = envios.reduce(
		(sum, envio) => sum + envio.precioDelivery,
		0
	);

	// Estilos CSS mejorados
	const styles = `
      <style>
        body { 
          font-family: 'Helvetica', sans-serif; 
          padding: 20px; 
          margin: 0;
        }
        .header { 
          text-align: center; 
          margin-bottom: 20px; 
          padding: 10px;
          background-color: #f8f9fa;
          border-radius: 5px;
        }
        .title { 
          font-size: 22px; 
          font-weight: bold; 
          margin-bottom: 5px;
        }
        .summary { 
          background-color: #f5f5f5; 
          padding: 15px; 
          margin: 15px 0; 
          border-radius: 5px;
          border-left: 4px solid #28a745;
        }
        table { 
          width: 100%; 
          border-collapse: collapse; 
          margin-top: 20px;
        }
        th { 
          background-color:rgb(5, 182, 58); 
          color: white;
          padding: 10px; 
          text-align: left; 
        }
        td { 
          padding: 10px; 
          border-bottom: 1px solid #eee; 
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
      </style>
    `;

	// Fecha actual formateada en español
	const currentDate = new Date().toLocaleDateString("es-ES", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	// Contenido HTML mejorado
	return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${styles}
        </head>
        <body>
          <div class="header">
            <div class="title">Reporte de Envíos Entregados</div>
            <div>Motorizado: <strong>${Motorizado}</strong></div>
            <div>Fecha: ${currentDate}</div>
          </div>
          
          <div class="summary">
            <div><strong>Total de ingresos:</strong> $${totalIngresos.toFixed(
							2
						)}</div>
            <div><strong>Envíos entregados:</strong> ${envios.length}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Precio ($)</th>
                 <th>tasabcv</th>
                  <th>Precio (Bs)</th>
              </tr>
            </thead>
            <tbody>
              ${envios
								.map(
									(envio) => `
                <tr>
                  <td>${envio.id || "-"}</td>
                  <td>${
										envio.horaEntrega
											? new Date(envio.horaEntrega).toLocaleDateString(
													"es-ES",
													{
														day: "numeric",
														month: "long",
													}
											  )
											: "-"
									}</td>
                  <td>${
										(envio.cliente?.nombre || "") +
										" " +
										(envio.cliente?.apellido || "")
									}</td>
                  <td>$${
										envio.precioDelivery
											? envio.precioDelivery.toFixed(2)
											: "0.00"
									}</td>
                  <td>${envio.tasabcv ? envio.tasabcv.toFixed(2) : "0.00"}</td>
                  <td>${
										envio.precioDelyBs ? envio.precioDelyBs.toFixed(2) : "0.00"
									}</td>
                </tr>
              `
								)
								.join("")}
            </tbody>
          </table>
        </body>
      </html>`;
};
