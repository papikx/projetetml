import fs from 'fs';
import pngToIco from 'png-to-ico';
import path from 'path';
import { fileURLToPath } from 'url';
import { Jimp } from 'jimp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const src = path.join(__dirname, 'assets/image/app_icon.png');
const dest = path.join(__dirname, 'assets/image/app_icon.ico');

async function convert() {
    try {
        const image = await Jimp.read(src);
        image.resize({ w: 256, h: 256 });
        const pngBuffer = await image.getBuffer('image/png');
        const icoBuffer = await pngToIco(pngBuffer);
        fs.writeFileSync(dest, icoBuffer);
        console.log('Icon converted successfully to ' + dest);
    } catch (err) {
        console.error('Error converting icon:', err);
        process.exit(1);
    }
}

convert();
