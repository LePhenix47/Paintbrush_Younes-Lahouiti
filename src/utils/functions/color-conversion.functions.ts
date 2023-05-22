import { hexadecimalToDecimal } from "./number.functions";
import { getSubtring, sliceString } from "./string.functions";

/**
 * Calculates the brightness of a color from its RGB values.
 *
 * @param {number} red - The red component of the color (0-255).
 * @param {number} blue - The blue component of the color (0-255).
 * @param {number} green - The green component of the color (0-255).
 * @param {boolean} hasToBeExact - Specifies whether the exact brightness should be calculated.
 *
 * If `true`, the formula [relative luminance formula](https://en.wikipedia.org/wiki/Relative_luminance) is used.
 *
 * If `false`, the average of the RGB values is used.
 *
 *
 * @returns {number} The brightness of the color.
 */
export function getColorBrightness(
  red: number,
  blue: number,
  green: number,
  hasToBeExact: boolean = true
): number {
  const hasInvalidRGBValues: boolean =
    red < 0 || red > 255 || blue < 0 || blue > 255 || green < 0 || green > 255;

  if (hasInvalidRGBValues) {
    throw "Unexpected error: One or multiple RGB values are overflowing or underflowing";
  }

  if (hasToBeExact) {
    const brightness: number = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

    return brightness;
  }

  return (red + green + blue) / 3;
}

/**
 * Converts an RGB (Red, Blue, Green) color value to HSL (Hue, Saturation, Lightness) format.
 *
 * @param {number} red - The red component of the RGB color (0-255).
 * @param {number} green - The green component of the RGB color (0-255).
 * @param {number} blue - The blue component of the RGB color (0-255).
 *
 * @returns {string} The HSL color value.
 */
export function rgbToHsl(red: number, green: number, blue: number): string {
  // Normalize RGB values
  const normalizedRed: number = red / 255;
  const normalizedGreen: number = green / 255;
  const normalizedBlue: number = blue / 255;

  // Find the maximum and minimum values of RGB
  const max: number = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
  const min: number = Math.min(normalizedRed, normalizedGreen, normalizedBlue);

  const delta: number = max - min;
  // Calculate the lightness
  const lightness: number = (max + min) / 2;

  // Calculate the saturation
  let saturation: number;
  // Calculate the hue
  let hue: number;

  const isAchromatic: boolean = max === min;
  if (isAchromatic) {
    hue = 0; // achromatic (gray)
    saturation = 0;
  } else {
    saturation =
      lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    switch (max) {
      case normalizedRed: {
        hue =
          ((normalizedGreen - normalizedBlue) / delta +
            (normalizedGreen < normalizedBlue ? 6 : 0)) /
          6;
        break;
      }

      case normalizedGreen: {
        hue = ((normalizedBlue - normalizedRed) / delta + 2) / 6;
        break;
      }

      case normalizedBlue: {
        hue = ((normalizedRed - normalizedGreen) / delta + 4) / 6;
        break;
      }
    }
  }

  // Round the values and multiply saturation and lightness by 100
  const roundedHue: number = Math.round(hue * 360);
  const roundedSaturation: number = Math.round(saturation * 100);
  const roundedLightness: number = Math.round(lightness * 100);

  // Return the HSL color value as a string
  return `hsl(${roundedHue}, ${roundedSaturation}%, ${roundedLightness}%)`;
}

/**
 * Converts a Hexadecimal `#rrggbb` color value to RGB (Red, Blue, Green) format.
 *
 * @param {number} hexadecimal - The hexadecimal value of the color.
 *
 * @returns {string} The HSL color value.
 */
export function hexColorToRgb(hexadecimal: string): string {
  const colorArgumentIsInvalid: boolean =
    hexadecimal?.length < 6 || hexadecimal?.length > 7;
  if (colorArgumentIsInvalid) {
    throw `Error: Unexpected color argument length passed, was expecting a 6 or 7 characters long string but instead got ${hexadecimal.length}`;
  }

  let hexColor: string = hexadecimal;

  const hasHashTag: boolean = hexadecimal.length === 7;
  if (hasHashTag) {
    hexColor = sliceString(hexadecimal, 1);
  }

  let redBase16: string = getSubtring(hexColor, 0, 2);
  let greeBase16: string = getSubtring(hexColor, 2, 4);
  let blueBase16: string = getSubtring(hexColor, 4, 6);

  let base16NumbersArray: any[] = [redBase16, greeBase16, blueBase16];

  for (let i = 0; i < base16NumbersArray.length; i++) {
    let color: string = base16NumbersArray[i];
    base16NumbersArray[i] = hexadecimalToDecimal(color);
  }

  const redBase10: string = base16NumbersArray[0];
  const greenBase10: string = base16NumbersArray[1];
  const blueBase10: string = base16NumbersArray[2];

  return `rbg(${redBase10}, ${greenBase10}, ${blueBase10})`;
}
