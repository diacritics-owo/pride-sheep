import { decode, encode } from 'pngs';
import {
  asset,
  Colormap,
  colormap,
  height,
  texture,
  width,
} from './helpers.ts';

const original = decode(await Deno.readFile(asset('original.png'))).image;
const four = decode(await Deno.readFile(asset('four.png'))).image;
const five = decode(await Deno.readFile(asset('five.png'))).image;
const six = decode(await Deno.readFile(asset('six.png'))).image;
const seven = decode(await Deno.readFile(asset('seven.png'))).image;

const map = (colormap: Colormap, image: Uint8Array) => {
  const mapped = new Uint8Array(width * height * 4);

  for (let i = 0; i < image.length; i += 4) {
    const color = parseInt(
      [image[i], image[i + 1], image[i + 2]].map((n) =>
        n.toString(16).padStart(2, '0')
      ).join(''),
      16,
    );

    if (color in colormap) {
      const multiply = colormap[color].map((n) => n / 255);

      mapped[i] = original[i] * multiply[0];
      mapped[i + 1] = original[i + 1] * multiply[1];
      mapped[i + 2] = original[i + 2] * multiply[2];
    } else {
      mapped[i] = original[i];
      mapped[i + 1] = original[i + 1];
      mapped[i + 2] = original[i + 2];
    }

    mapped[i + 3] = original[i + 3];
  }

  return mapped;
};

const bisexual = colormap(
  0xd70071,
  0xd70071,
  0x9c4e97,
  0x0035aa,
  0x0035aa,
);
const genderqueer = colormap(
  0xb57edc,
  0xb57edc,
  0xffffff,
  0xffffff,
  0x4a8122,
  0x4a8122,
);
const pansexual = colormap(
  0xfe218b,
  0xfe218b,
  0xfed700,
  0xfed700,
  0x21b0fe,
  0x21b0fe,
);

const asexual = colormap(0x000000, 0x9e9e9e, 0xffffff, 0x5e1984);
const nonbinary = colormap(0xfcf431, 0xffffff, 0x9d59d2, 0x000000);

const trans = colormap(0x55cdfd, 0xf6aab7, 0xffffff, 0xf6aab7, 0x55cdfd);
const genderfluid = colormap(0xfa4288, 0xffffff, 0x71197f, 0x000000, 0x071195);
const aromantic = colormap(0x3da542, 0xa7d379, 0xffffff, 0xa9a9a9, 0x000000);

const pride = colormap(
  0xff1e26,
  0xfe941e,
  0xffff00,
  0x06bd00,
  0x001a98,
  0x760088,
);

const gay = colormap(
  0x078d70,
  0x26ceaa,
  0x98e8c1,
  0xffffff,
  0x7bade2,
  0x5049cc,
  0x3d1a78,
);
const lesbian = colormap(
  0xd62900,
  0xef7627,
  0xff9b55,
  0xffffff,
  0xd461a6,
  0xb55690,
  0xa50062,
);
const aroace = colormap(
  0x000000,
  0xbcc4c7,
  0xffffff,
  0xa5fa5e,
  0xffffff,
  0xbcc4c7,
  0x000000,
);

const write = (
  name: string,
  colormap: Colormap,
  image: Uint8Array,
): Promise<void> =>
  Deno.writeFile(
    texture(`${name}.png`),
    encode(map(colormap, image), width, height),
  );

write('bisexual', bisexual, five);
write('genderqueer', genderqueer, six);
write('pansexual', pansexual, six);
write('asexual', asexual, four);
write('nonbinary', nonbinary, four);
write('trans', trans, five);
write('genderfluid', genderfluid, five);
write('aromantic', aromantic, five);
write('pride', pride, six);
write('gay', gay, seven);
write('lesbian', lesbian, seven);
write('aroace', aroace, seven);
