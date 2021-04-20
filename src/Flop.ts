import BigNumber from "bignumber.js";
import * as Constants from "./Constants";

/**
 * Represents a floating-point value.
 * Precision is unbounded.
 */
export interface Flop {
  type: FlopType;
  value: BigNumber;
}

/**
 * Types of floating-point values.
 */
export enum FlopType {
  NORMAL,
  POSITIVE_INFINITY,
  NEGATIVE_INFINITY,
  NAN,
}

/**
 * Represents a floating-point value in IEEE 754 style.
 * Precision is unbounded.
 */
export interface Flop754 {
  type: Flop754Type;
  sign: boolean;
  exponent: number;
  significand: BigNumber;
}

/**
 * Types of IEEE 754 values.
 */
export enum Flop754Type {
  NORMAL,
  SUBNORMAL,
  POSITIVE_INFINITY,
  NEGATIVE_INFINITY,
  NAN,
}

/**
 * Returns a Flop object from a decimal value.
 * @param decimal string decimal value
 * @returns Flop object
 */
export const generateFlop = (decimal: string): Flop => {
  const type = FlopType.NORMAL;
  const value = new BigNumber(decimal);
  return { type, value };
};

/**
 * @returns Flop object representing zero.
 */
export const defaultFlop = (): Flop => {
  const type = FlopType.NORMAL;
  const value = new BigNumber(0);
  return { type, value };
};

/**
 * Returns a Flop754 object from constituent boolean arrays representing bits.
 * @param sign sign bit
 * @param exponent exponent bits
 * @param significand significand bits
 * @returns Flop754 object
 */
export const generateFlop754 = (
  sign: boolean[],
  exponent: boolean[],
  significand: boolean[]
): Flop754 => {
  // TODO: Set this globally
  BigNumber.set({ DECIMAL_PLACES: Constants.BIGNUMBER_DECIMAL_PLACES });

  const type = exponent.some((e) => e)
    ? exponent.every((e) => e)
      ? significand.every((e) => !e)
        ? sign[0]
          ? Flop754Type.NEGATIVE_INFINITY
          : Flop754Type.POSITIVE_INFINITY
        : Flop754Type.NAN
      : Flop754Type.NORMAL
    : Flop754Type.SUBNORMAL;
  const signBit = sign[0];
  const adjustedExponent =
    (type === Flop754Type.SUBNORMAL
      ? 1
      : parseInt(stringifyBits(exponent), 2)) -
    getExponentBias(exponent.length);
  const adjustedSignificand = new BigNumber(
    (type === Flop754Type.SUBNORMAL ? "." : "1.") + stringifyBits(significand),
    2
  );

  return {
    type,
    sign: signBit,
    exponent: adjustedExponent,
    significand: adjustedSignificand,
  };
};

/**
 * @returns Flop754 object representing zero.
 */
export const defaultFlop754 = (): Flop754 => {
  const type = Flop754Type.SUBNORMAL;
  const sign = false;
  const exponent = 0;
  const significand = new BigNumber(0);
  return { type, sign, exponent, significand };
};

/**
 * Deconstructs a Flop754 object into constituent boolean objects representing bits.
 * @param flop754 Flop754 object to be deconstructed
 * @param exponentWidth bit width of exponent segment
 * @param significandWidth bit width of significand segment
 * @returns variable for sign and arrays for exponent, significand
 */
// TODO: Implement the correct rounding mode
export const deconstructFlop754 = (
  flop754: Flop754,
  exponentWidth: number,
  significandWidth: number
): {
  sign: boolean[];
  exponent: boolean[];
  significand: boolean[];
} => {
  const sign = Array.of(flop754.sign);
  const exponent = bitsFromString(
    (() => {
      switch (flop754.type) {
        case Flop754Type.POSITIVE_INFINITY:
        case Flop754Type.NEGATIVE_INFINITY:
        case Flop754Type.NAN:
          return "1".repeat(exponentWidth);
        case Flop754Type.SUBNORMAL:
          return "";
        case Flop754Type.NORMAL:
          return (flop754.exponent + getExponentBias(exponentWidth)).toString(
            2
          );
      }
    })().padStart(exponentWidth, "0")
  );
  const significand = bitsFromString(
    (flop754.significand.toString(2).split(".")[1] ?? "")
      .padEnd(significandWidth, "0")
      .substring(0, significandWidth)
  );

  return { sign, exponent, significand };
};

/**
 * Converts a Flop754 object to a Flop object.
 * @param flop754 object to be converted
 * @returns resulting Flop object
 */
export const convertFlop754ToFlop = (flop754: Flop754): Flop => {
  // TODO: Set this globally
  BigNumber.set({ DECIMAL_PLACES: Constants.BIGNUMBER_DECIMAL_PLACES });

  const type = (() => {
    switch (flop754.type) {
      case Flop754Type.POSITIVE_INFINITY:
        return FlopType.POSITIVE_INFINITY;
      case Flop754Type.NEGATIVE_INFINITY:
        return FlopType.NEGATIVE_INFINITY;
      case Flop754Type.NAN:
        return FlopType.NAN;
      case Flop754Type.NORMAL:
      case Flop754Type.SUBNORMAL:
        return FlopType.NORMAL;
    }
  })();
  const exponent = new BigNumber(2).exponentiatedBy(flop754.exponent);
  const value = flop754.significand.times(exponent);
  const signedValue = flop754.sign ? value.negated() : value;

  return { type, value: signedValue };
};

/**
 * Converts a Flop object to a Flop754 object.
 * @param flop object to be converted
 * @returns resulting Flop754 object
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const convertFlopToFlop754 = (flop: Flop): Flop754 => {
  // TODO: Extract sign, convert to binary, normalize
  return {
    type: Flop754Type.NORMAL,
    sign: false,
    exponent: 0,
    significand: new BigNumber(0),
  };
};

/**
 * Gets the difference between two Flop objects.
 * @param accurate Flop value subtracted from
 * @param stored Flop object being subtracted
 * @returns resulting value as Flop object
 */
export const calculateError = (accurate: Flop, stored: Flop): Flop => {
  // TODO: Handle arithmetic with non-normal numbers
  const value = accurate.value.minus(stored.value);
  return { type: stored.type, value };
};

/**
 * Converts Flop object to decimal string.
 * @param flop object to convert
 * @returns decimal string
 */
export const stringifyFlop = (flop: Flop): string => {
  switch (flop.type) {
    case FlopType.POSITIVE_INFINITY:
      return Constants.POSITIVE_INFINITY_STRING;
    case FlopType.NEGATIVE_INFINITY:
      return Constants.NEGATIVE_INFINITY_STRING;
    case FlopType.NAN:
      return Constants.NAN_STRING;
    case FlopType.NORMAL:
      return flop.value.toFixed();
  }
};

/**
 * Converts bit array to binary string.
 * @param bits boolean array representing bits
 * @returns binary string
 */
export const stringifyBits = (bits: boolean[]): string => {
  return bits.map((e) => (e ? "1" : "0")).join("");
};

/**
 * Converts binary string to bit array.
 * @param bitString binary string
 * @returns boolean array representing bits
 */
export const bitsFromString = (bitString: string): boolean[] => {
  return bitString.split("").map((e) => (e === "1" ? true : false));
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
