// Función para generar el contenido HTML del PDF
import { Envio } from "@/types";

export const generateHTMLContent = (envios, Motorizado) => {

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
