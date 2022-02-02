/**
 * this script will gives you nearest color in tailwind colors
 */
import { nearest, differenceCiede2000, parse } from 'https://deno.land/x/culori@v2.0.3/index.js'
import tailwindColorConfig from 'https://esm.sh/tailwindcss/colors'

function getTailwindColors(): { [key: string]: string } {
  const colorsByName: { [key: string]: string } = {}

  for (const key of Object.keys(tailwindColorConfig)) {
    const descriptor = Object.getOwnPropertyDescriptor(tailwindColorConfig, key)

    if (descriptor && descriptor.value) {
      const value = tailwindColorConfig[key as keyof typeof tailwindColorConfig]

      if (typeof value === 'string') {
        colorsByName[key] = value
      } else {
        for (const [subKey, subValue] of Object.entries(value)) {
          colorsByName[`${key}-${subKey}`] = subValue
        }
      }
    }
  }

  return colorsByName
}

const colors = getTailwindColors()
const nearestNamedColors = nearest(
  Object.keys(colors).filter((name) => !!parse(colors[name])),
  differenceCiede2000(),
  (name: string) => colors[name]
)

const inputColor = parse(Deno.args[0])

if (!inputColor) {
  console.log('Please provide a valid color')
  Deno.exit(1)
}

console.log('inputColor -> ', inputColor)
console.log('Nearest Tailwind Colors -> ', nearestNamedColors(inputColor, 3))
