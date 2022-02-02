/**
 * this script will gives you nearest color in tailwind colors
 */

// deno run --unstable --allow-read --allow-env ./tailwind-color.ts
import { createRequire } from 'https://deno.land/std@0.123.0/node/module.ts';
import { nearest, differenceCiede2000, parse } from 'https://deno.land/x/culori@v2.0.3/index.js';

type HexColor = string;

type TailwindColors = {
  [key: string]:
    | HexColor
    | {
        [key: string]: HexColor;
      };
};

function getTailwindColors() {
  const require = createRequire(import.meta.url);
  const colors: TailwindColors = require('tailwindcss/colors');
  const colorsByName: { [key: string]: HexColor } = {};

  for (const key of Object.keys(colors)) {
    const descriptor = Object.getOwnPropertyDescriptor(colors, key);
    if (descriptor && descriptor.value) {
      const value = colors[key];

      if (typeof value === 'string') {
        colorsByName[key] = value;
      } else {
        for (const [subKey, subValue] of Object.entries(value)) {
          colorsByName[`${key}-${subKey}`] = subValue;
        }
      }
    }
  }

  return colorsByName;
}

let colors: ReturnType<typeof getTailwindColors> = {};

try {
  colors = getTailwindColors();
} catch (e) {
  console.error('Can not find tailwindcss, please run this script in your tailwind project!')
}

const nearestNamedColors = nearest(
  Object.keys(colors).filter((name) => !!parse(colors[name])),
  differenceCiede2000(),
  (name: string) => colors[name]
);

const inputColor = parse(Deno.args[0]);

console.log('inputColor -> ', inputColor);

console.log('Cloest Tailwind Colors -> ', nearestNamedColors(inputColor, 3));

