const htmlqrC = async (req, res) => {
	const imagePath = "/api/qr-image"; // La ruta para la imagen

	res.writeHead(200, { "Content-Type": "text/html" });
	res.end(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Código QR</title>
            <style>
                body {
                    font-family: sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    background-color:rgb(10, 173, 38);
                }
                .qr-container {
                    background-color: #fff;
                    padding: 10px;
                    margin: 10px
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
                .logo {
                    width: 35%;
                    height: auto;
                    margin-top: 25px;
                    padding: 16px;
                }
                .imgqr {
                    max-width: 100%;
                    height: auto;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                h1 {
                    color: #333;
                    margin-bottom: 15px;
                }
            </style>
        </head>
        <body>
            <div class="qr-container">
                <img class="logo" src="/assets/osunadigital.png" alt="logo Osuna Digital">
                <h1>Escanea este código QR</h1>
                <img class="imgqr" src="${imagePath}" alt="Código QR">
                <p>Utiliza tu aplicación de WhatsApp Bussines para escanearlo.</p>
            </div>
        </body>
        </html>
    `);
};

export default htmlqrC;
