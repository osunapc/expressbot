 async function obtenerPrecioDolar() {
const API_URL = "https://pydolarve.org/api/v1/dollar"; 
    	try {
			const respuesta = await fetch(API_URL);
			if (!respuesta.ok) {
				throw new Error(`Error al obtener datos: ${respuesta.status}`);
			}
			const datos = await respuesta.json();
			const precio = parseFloat(datos.monitors?.bcv?.price);

			if (isNaN(precio) || precio <= 0) {
				alert("Precio BCV inválido, intentando de nuevo...");
				
			} else {
                return precio;
			}
		} catch (err) {
			console.error("Error al obtener precio:", err);
		
	};
}

export default obtenerPrecioDolar;