import BigNumber from "bignumber.js";

/**
 * Represents a floating-point value.
 * Precision is unbounded.
 */
export interface Flop {
  value: BigNumber;
}

/**
 * Represents a floating-point value in IEEE 754 style.
 * Precision is unbounded.
 */
export interface Flop754 {
  sign: boolean;
  exponent: number;
  significand: BigNumber;
}

/**
 * Returns a Flop object from a decimal value.
 * @param decimal string decimal value
 * @returns Flop object
 */
export const generateFlop = (decimal: string): Flop => {
  const value = new BigNumber(decimal);
  return { value };
};

/**
 * Returns a Flop754 object from constituent boolean arrays representing bits.
 * @param sign sign bit
 * @param exponent exponent bits
 * @param significand significand bits
 * @returns Flop754 object
 */
export const generateFlop754 = (
  sign: boolean,
  exponent: boolean[],
  significand: boolean[]
): Flop754 => {
  const bias = getExponentBias(exponent.length);
  const parsedExponent = parseInt(stringifyBits(exponent), 2) - bias;
  const parsedSignificand = new BigNumber("1." + stringifyBits(significand), 2);

  return {
    sign,
    exponent: parsedExponent,
    significand: parsedSignificand,
  };
};

/**
 * Converts a Flop754 object to a Flop object.
 * @param flop754 object to be converted
 * @returns resulting Flop object
 */
export const convertFlop754ToFlop = (flop754: Flop754): Flop => {
  const coeff = new BigNumber(2).exponentiatedBy(flop754.exponent);
  let value = flop754.significand.times(coeff);
  value = flop754.sign ? value.negated() : value;
  return { value };
};

/**
 * Converts a Flop object to a Flop754 object.
 * @param flop object to be converted
 * @returns resulting Flop754 object
 */
// eslint-disable-next-line no-unused-vars
export const convertFlopToFlop754 = (flop: Flop): Flop754 => {
  // TODO: Extract sign, convert to binary, normalize
  return { sign: false, exponent: 0, significand: new BigNumber(0) };
};

/**
 * Gets the difference between two Flop objects.
 * @param accurate Flop value subtracted from
 * @param stored Flop object being subtracted
 * @returns resulting value as Flop object
 */
export const calculateError = (accurate: Flop, stored: Flop): Flop => {
  const value = accurate.value.minus(stored.value);
  return { value };
};

/**
 * Converts Flop object to decimal string.
 * @param flop object to convert
 * @returns decimal string
 */
export const stringifyFlop = (flop: Flop): string => {
  return flop.value.toString();
};

/**
 * Converts bit array to binary string.
 * @param flop object to convert
 * @returns binary string
 */
export const stringifyBits = (bits: boolean[]): string => {
  return bits.map((e) => (e ? "1" : "0")).join("");
};

/**
 * Gets the exponent range of a IEEE 754-style exponent segment.
 * @param width number of bits of exponent segment
 * @returns minimum and maximum exponents (of 2)
 */
export const getExponentRange = (
  width: number
): { min: number; max: number } => {
  const range = Math.pow(2, width);
  const min = -(range / 2 - 2);
  const max = range / 2 - 1;
  return { min, max };
};

/**
 * Gets the exponent bias in an IEEE 754-style exponent segment.
 * @param width number of bits of exponent segment
 * @returns exponent bias
 */
export const getExponentBias = (width: number): number => {
  const range = Math.pow(2, width);
  return range / 2 - 1;
};
