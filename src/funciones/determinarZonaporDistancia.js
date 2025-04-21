// función para determinar la zona basada en la distancia

export function determinarZonaPorDistancia(distancia, zonasDelivery) {
	if (distancia <= zonasDelivery[0].dis)
		return zonasDelivery.find((z) => z.nombre === "Zona I") || zonasDelivery[0];
	if (distancia <= zonasDelivery[1].dis)
		return (
			zonasDelivery.find((z) => z.nombre === "Zona II") || zonasDelivery[1]
		);
	if (distancia <= zonasDelivery[2].dis)
		return (
			zonasDelivery.find((z) => z.nombre === "Zona III") || zonasDelivery[2]
		);
	if (distancia <= zonasDelivery[3].dis)
		return (
			zonasDelivery.find((z) => z.nombre === "Zona IV") || zonasDelivery[3]
		);
	if (distancia <= zonasDelivery[4].dis)
		return zonasDelivery.find((z) => z.nombre === "Zona V") || zonasDelivery[4];
	if (distancia <= zonasDelivery[5].dis)
		return (
			zonasDelivery.find((z) => z.nombre === "Zona VI") || zonasDelivery[5]
		);
	if (distancia <= zonasDelivery[6].dis)
		return (
			zonasDelivery.find((z) => z.nombre === "Zona VII") || zonasDelivery[6]
		);
	if (distancia <= zonasDelivery[7].dis)
		return (
			zonasDelivery.find((z) => z.nombre === "Zona VIII") || zonasDelivery[7]
		);
	if (distancia <= zonasDelivery[8].dis)
		return (
			zonasDelivery.find((z) => z.nombre === "Zona IX") || zonasDelivery[8]
		);
	if (distancia <= zonasDelivery[9].dis)
		return zonasDelivery.find((z) => z.nombre === "Zona X") || zonasDelivery[9];
	return zonasDelivery.find((z) => z.nombre === "Zona XI") || zonasDelivery[10];
}
