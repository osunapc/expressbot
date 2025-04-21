import { Router} from "express";
import  htmlqrC  from "../controller/htmlQr.js"; 
import qrMiaChatC from "../controller/qrMiaChat.js"; 

const router = Router();

// Ruta para mostrar la página HTML con la imagen
router.get("/qr", htmlqrC );

// Nueva ruta para servir la imagen directamente
router.get("/qr-image", qrMiaChatC);

export default router;
