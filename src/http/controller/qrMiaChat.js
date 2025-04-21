import { createReadStream } from "node:fs";
import { join } from "node:path";

const qrMiaChatC = async (req, res) => {
	const PATCH_QR = join(process.cwd(), "bot.qr.png");
	const fileStream = createReadStream(PATCH_QR);

	res.writeHead(200, { "Content-Type": "image/png" });
	fileStream.pipe(res);
};



export default qrMiaChatC;
