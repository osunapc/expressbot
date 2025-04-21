import BotWhatsapp from "@bot-whatsapp/bot";
import helloFlow from "./hello.flow.js";
import graciasFlow from "./gracias.flow.js";
import audioFlow from "./audio.flow.js";
import aiFlow from "./ai.flow.js";
import crearClienteFlow from "./crearCiente.flow.js";
import envioFlow from "./envio.flow.js";
import relacionFlow from "./relacion.flow.js";

export default BotWhatsapp.createFlow([
    helloFlow, 
    graciasFlow,
    //audioFlow,
    //aiFlow,
    crearClienteFlow,
    envioFlow,
    relacionFlow

]);
