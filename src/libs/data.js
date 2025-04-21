//import {  ZonaDelivery } from "@/types";

/* export const zonasDelivery: ZonaDelivery[] = [
	{ id: 1, nombre: "Zona I", precio: 1.2 },
	{ id: 2, nombre: "Zona II", precio: 1.5 },
	{ id: 3, nombre: "Zona III", precio: 2.0 },
	{ id: 4, nombre: "Zona IV", precio: 2.5 },
	{ id: 5, nombre: "Zona V", precio: 3.0 },
	{ id: 6, nombre: "Zona VI", precio: 4.0 },
	{ id: 7, nombre: "Zona VII", precio: 5.0 },
	{ id: 8, nombre: "Zona VIII", precio: 6.0 },
	{ id: 9, nombre: "Zona IX", precio: 7.0 },
	{ id: 10, nombre: "Zona X", precio: 9.0 },
	{ id: 11, nombre: "Zona XI", precio: 10.0 },
	{ id: 12, nombre: "zona 0", precio: 0 },
]; */

export const ciudades = [
	{
		nombre: "Merida",
		coordenadas: { latitud: 8.6, longitud: -71.15 },
		farmacias: [
			{
				id: 1,
				nombre: "F-04", //M-milagrosa
				latitud: 8.58082354578621,
				longitud: -71.16800804602464,
				ciudad: "Merida",
			},
			{
				id: 2,
				nombre: "F-80", //M-milagrosa
				latitud: 8.617274465594676,
				longitud: -71.13833490171551,
				ciudad: "Merida",
			},
			{
				id: 3,
				nombre: "F-90", //M-hospital
				latitud: 8.584002518866315,
				longitud: -71.15649924644335,
				ciudad: "Merida",
			},
			{
				id: 4,
				nombre: "F-06", //E-valmorca 06-DON SILVINO"
				latitud: 8.548939160419087,
				longitud: -71.23271630784694,
				ciudad: "Merida",
			},

			{
				id: 13,
				nombre: "F-13.", //13-TERRACOTA",
				latitud: 8.5445746,
				longitud: -71.2359144,
				ciudad: "Merida",
			},
			{
				id: 16,
				nombre: "F-16.", //16-VILLAS",
				latitud: 8.559112,
				longitud: -71.200259,
				ciudad: "Merida",
			},
			{
				id: 27,
				nombre: "F-27.", //27-LA INMACULADA",
				latitud: 8.596574,
				longitud: -71.144138,
				ciudad: "Merida",
			},
			{
				id: 28,
				nombre: "F-28.", //28-EXPRESS",
				latitud: 8.6031018,
				longitud: -71.1397635,
				ciudad: "Merida",
			},
			{
				id: 30,
				nombre: "F-30.", //30-STA ANA",
				latitud: 8.6132455,
				longitud: -71.1423738,
				ciudad: "Merida",
			},
			{
				id: 42,
				nombre: "F-42.", //42-PEDREGOSA",
				latitud: 8.570577,
				longitud: -71.193348,
				ciudad: "Merida",
			},
			{
				id: 43,
				nombre: "F-43.", //43-MONASTERIO",
				latitud: 8.595712,
				longitud: -71.147735,
				ciudad: "Merida",
			},
			{
				id: 44,
				nombre: "F-44.", // 44-FARMAGLOBAL",
				latitud: 8.5725798,
				longitud: -71.1684643,
				ciudad: "Merida",
			},
			{
				id: 74,
				nombre: "F-74.", //74-GLOBAL FAMILY",
				latitud: 8.547439,
				longitud: -71.243401,
				ciudad: "Merida",
			},

			{
				id: 80,
				nombre: "F-80.", //80-FARMABIEN 8B 8°",
				latitud: 8.6170442,
				longitud: -71.1383833,
				ciudad: "Merida",
			},
			{
				id: 89,
				nombre: "F-89.", // 89-CARVALO",
				latitud: 8.5901111,
				longitud: -71.15425,
				ciudad: "Merida",
			},
			{
				id: 90,
				nombre: "F-90.", // 90-FARMABIEN 8B 9°",
				latitud: 8.583986,
				longitud: -71.156414,
				ciudad: "Merida",
			},
			{
				id: 91,
				nombre: "F-91.", // 91- LOS PINOS NEVADOS",
				latitud: 8.5957727,
				longitud: -71.1446354,
				ciudad: "Merida",
			},
			{
				id: 98,
				nombre: "F-98.", //AGUA BENDITA",
				latitud: 8.5818454,
				longitud: -71.1731587,
				ciudad: "Merida",
			},
			{
				id: 100,
				nombre: "DR-01",
				latitud: 8.564114,
				longitud: -71.20665,
				ciudad: "Merida",
			},
		],
		zonasDelivery: [
			{ id: 1, nombre: "Zona I", precio: 1.2, dis: 2.5 },
			{ id: 2, nombre: "Zona II", precio: 1.5, dis: 4.5 },
			{ id: 3, nombre: "Zona III", precio: 2.0, dis: 6.5 },
			{ id: 4, nombre: "Zona IV", precio: 2.5, dis: 8.5 },
			{ id: 5, nombre: "Zona V", precio: 3.0, dis: 10.5 },
			{ id: 6, nombre: "Zona VI", precio: 4.0, dis: 12.5 },
			{ id: 7, nombre: "Zona VII", precio: 5.0, dis: 14.5 },
			{ id: 8, nombre: "Zona VIII", precio: 6.0, dis: 16.5 },
			{ id: 9, nombre: "Zona IX", precio: 7.0, dis: 18.5 },
			{ id: 10, nombre: "Zona X", precio: 9.0, dis: 20.5 },
			{ id: 11, nombre: "Zona XI", precio: 10.0, dis: 22.5 },
			{ id: 12, nombre: "zona 0", precio: 0, dis: 0 },
		],
	},
	{
		nombre: "Carora",
		coordenadas: { latitud: 10.1746313, longitud: -70.0834589 },
		farmacias: [
			{
				id: 1,
				nombre: "F-88", //M-carora vilma del carmen II
				latitud: 10.1746672,
				longitud: -70.0808702,
				ciudad: "Carora",
			},
		],
		zonasDelivery: [
			{ id: 1, nombre: "Zona I", precio: 1.2, dis: 3.5 },
			{ id: 2, nombre: "Zona II", precio: 1.5, dis: 5.5 },
			{ id: 3, nombre: "Zona III", precio: 2.5, dis: 7.5 },
			{ id: 4, nombre: "Zona IV", precio: 3.0, dis: 9.5 },
			{ id: 5, nombre: "Zona V", precio: 3.5, dis: 11.5 },
			{ id: 6, nombre: "Zona VI", precio: 4.5, dis: 13.5 },
			{ id: 7, nombre: "Zona VII", precio: 5.5, dis: 15.5 },
			{ id: 8, nombre: "Zona VIII", precio: 6.5, dis: 17.5 },
			{ id: 9, nombre: "Zona IX", precio: 7.5, dis: 19.5 },
			{ id: 10, nombre: "Zona X", precio: 9.5, dis: 21.5 },
			{ id: 11, nombre: "Zona XI", precio: 10.5, dis: 23.5 },
			{ id: 12, nombre: "zona 0", precio: 0, dis: 0 },
		],
	},
];
