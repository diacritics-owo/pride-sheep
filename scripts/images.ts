import { decode, encode } from 'pngs';
import { asset, image, texture, width } from './helpers.ts';

const sheep = decode(await Deno.readFile(asset('sheep.png'))).image;

[
  'aroace',
  'aromantic',
  'asexual',
  'bisexual',
  'gay',
  'genderfluid',
  'genderqueer',
  'intersex',
  'lesbian',
  'nonbinary',
  'pansexual',
  'trans',
  'pride',
  'progress',
].forEach(async (s) => {
  const wool = decode(await Deno.readFile(texture(`${s}.png`))).image;
  const merged = new Uint8Array(sheep.length + wool.length);

  merged.set(sheep);
  merged.set(wool, sheep.length);

  await Deno.writeFile(image(`textures/${s}.png`), encode(merged, width, width));
});
