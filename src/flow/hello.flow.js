import BotWhatsapp from "@bot-whatsapp/bot";

export default BotWhatsapp.addKeyword([
	"hola",
	"ole",
	"alo",
	"holaaaa",
	"buen dia",
	"buenas",
])
	.addAnswer("🙌 Hola, ¿cómo estás?", { delay: 5000 })
	.addAnswer("¿En qué puedo ayudarte?");
