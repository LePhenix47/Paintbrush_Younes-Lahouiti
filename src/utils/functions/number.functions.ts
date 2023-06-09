import { error } from "./console.functions";
import { splitString } from "./string.functions";

/**
 * Generates a random number within a specified range.
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @param {boolean} includeMin - Whether to include the minimum value in the range.
 * @param {boolean} includeMax - Whether to include the maximum value in the range.
 *
 * @returns {number} A random number within the specified range.
 */
export function getRandomNumber(
  min: number = 0,
  max: number = 1,
  includeMin: boolean = true,
  includeMax: boolean = true
): number {
  const hasInvalidArgument: boolean = min > max || max < min;
  if (hasInvalidArgument) {
    throw new Error(
      `Unexpected error occured in the passed argument values: min > max or max < min`
    );
  }

  const mustIncludeBoth: boolean = includeMin && includeMax;

  const mustIncludeOnlyMin: boolean = includeMin && !includeMax;

  const mustIncludeOnlyMax: boolean = !includeMin && includeMax;

  if (mustIncludeBoth) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else if (mustIncludeOnlyMin) {
    return Math.floor(Math.random() * (max - min)) + min;
  } else if (mustIncludeOnlyMax) {
    return Math.floor(Math.random() * (max - min)) + min + 1;
  } else {
    //We don't include either
    return Math.floor(Math.random() * (max - min - 1)) + min + 1;
  }
}

/**
 * Calculates the nth root of a number.
 *
 * By default acts as a square root `√(x)`
 *
 * @param {number} value - The value for which to calculate the nth root.
 * @param {number} [base=2] - The degree of the root.
 *
 *  @returns {number} The nth root of the value.
 */
export function nthRoot(value: number, base: number = 2): number {
  //We check that the value is negative AND  that the base is pair
  const valueOfRootIsInvalid: boolean = value < 0 && base % 2 === 0;
  if (valueOfRootIsInvalid) {
    // Negative values cannot have an even root
    //∛(-27) = 3 but √(-16) = undefined
    error("The root of the value passed is invalid");
    return NaN;
  }

  //ⁿ√(x) = x^(1/n)
  return value ** (1 / base);
}

/**
 * Calculates the logarithm of a value with a specified base.
 * By default acts as a natural logarithm `logₑ(x)` aka `Ln(x)`
 *
 * @param {number} value - The value for which to calculate the logarithm.
 * @param {number} [base= Math.E] - The base of the logarithm. Default is Euler's number.
 *
 *  @returns {number | NaN} The logarithm of the value or Not A Number `NaN` if the arguments passed are invalid
 */
export function logarithm(value: number, base: number = Math.E): number {
  //We check that the base is positive but also different than 1
  //since log(1) = 0 and logₙ(x) = log(x)/log(n), a base of 1 would give a division by 0
  const baseIsInvalid: boolean = base <= 0 || base === 1;
  if (baseIsInvalid) {
    error("The base of the logarithm is invalid");
    return NaN;
  }

  //Logarithmic functions cannot have a negative or null value
  const valueIsInvalid: boolean = value <= 0;
  if (valueIsInvalid) {
    error("The value passed is negative or null");
    return NaN;
  }

  return Math.log(value) / Math.log(base);
}

/**
 * Converts a hexadecimal string to its decimal equivalent.
 * @param {string} hexadecimal - The hexadecimal string to convert.
 * @returns {number} The decimal representation of the hexadecimal value.
 */
export function hexadecimalToDecimal(hexadecimal: string): number {
  return Number(`0x${hexadecimal}`);
}

/**
 * Converts a decimal value to its hexadecimal equivalent.
 * @param {number} decimal - The decimal value to convert.
 * @returns {string} The hexadecimal representation of the decimal value.
 */
export function decimalToHexadecimal(decimal: number): string {
  return decimal.toString(16);
}
