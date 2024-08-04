import { resolve } from '@std/path';

export type Colormap = { [key: number]: [number, number, number] };

export const width = 64;
export const height = 32;

export const asset = (file: string) =>
  resolve(new URL('.', import.meta.url).pathname, 'assets', file);

export const texture = (file: string) =>
  resolve(
    new URL('.', import.meta.url).pathname,
    '../src/main/resources/assets/pride-sheep/textures/entity/sheep',
    file,
  );

export const hex = (color: number): [number, number, number] => [
  color >> 16 & 255,
  color >> 8 & 255,
  color & 255,
];

export const colors = [
  0xff0000,
  0xffff00,
  0x00ff00,
  0x00ffff,
  0x0000ff,
  0xffbf00,
  0xff00bf,
];

export const colormap = (...mapped: number[]): Colormap =>
  Object.fromEntries(
    mapped.map((m, i) => [colors[i], hex(m)]).filter((c) => c),
  );
