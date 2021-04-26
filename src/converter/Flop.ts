import BigNumber from "bignumber.js";
import * as Constants from "../Constants";

/**
 * Represents a floating-point value.
 * Precision and range is unbounded.
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
 * Precision and range is implicitly bounded by exponent and
 * significand widths used during intialization, but otherwise
 * the interface imposes no bounds.
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
 * @param exponentWidth of the target type
 * @returns Flop754 object representing zero
 */
export const defaultFlop754 = (exponentWidth: number): Flop754 => {
  const type = Flop754Type.SUBNORMAL;
  const sign = false;
  const exponent = getExponentRange(exponentWidth).min;
  const significand = new BigNumber(0);
  return { type, sign, exponent, significand };
};

/**
 * @param flop754 object to return exponent of
 * @returns exponent value as a string
 */
export const getExponent = (flop754: Flop754): string => {
  return flop754.exponent.toFixed();
};

/**
 * @param flop754 object to return significand of
 * @returns significand value as a string
 */
export const getSignificand = (flop754: Flop754): string => {
  return flop754.significand.toFixed();
};

/**
 * @param flop754 object to test subnormal status
 * @returns true if value is subnormal
 */
export const isSubnormal = (flop754: Flop754): boolean => {
  return flop754.type === Flop754Type.SUBNORMAL;
};

/**
 * Deconstructs a Flop754 object into constituent boolean objects representing bits.
 * @param flop754 Flop754 object to be deconstructed
 * @param exponentWidth bit width of exponent segment
 * @param significandWidth bit width of significand segment
 * @returns variable for sign and arrays for exponent, significand
 */
// TODO: Handle implicit assumption that significand in flop754 fits width
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
    (() => {
      switch (flop754.type) {
        case Flop754Type.POSITIVE_INFINITY:
        case Flop754Type.NEGATIVE_INFINITY:
          return "0".repeat(significandWidth);
        case Flop754Type.NAN:
        case Flop754Type.SUBNORMAL:
        case Flop754Type.NORMAL:
          return flop754.significand.toString(2).split(".")[1] ?? "";
      }
    })()
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
 * @param exponentWidth exponent bit size of target IEEE 754 type
 * @param significandWidth significand bit size of target IEEE 754 type
 * @returns resulting Flop754 object
 */
// TODO: Cleanup and optimize
export const convertFlopToFlop754 = (
  flop: Flop,
  exponentWidth: number,
  significandWidth: number
): Flop754 => {
  // extract sign
  const sign = flop.value.isNegative();

  // convert to binary, normalize
  const { min: minExponentRange, max: maxExponentRange } = getExponentRange(
    exponentWidth
  );

  let integer: BigNumber = flop.value.abs().integerValue(BigNumber.ROUND_DOWN);
  let fractional: BigNumber = flop.value.abs().minus(integer);
  let exponent = 0;

  const one = new BigNumber("1");
  const two = new BigNumber("2");
  const half = new BigNumber("0.5");

  while (integer.isGreaterThan(one)) {
    const rem = integer.modulo(two);
    integer = integer.idiv(two);
    fractional = fractional.div(two);
    exponent++;
    if (!rem.isZero()) {
      fractional = fractional.plus(half);
    }
  }

  while (integer.isZero() && exponent > minExponentRange) {
    fractional = fractional.times(two);
    const excess = fractional.integerValue(BigNumber.ROUND_DOWN);
    if (!excess.isZero()) {
      fractional = fractional.minus(excess);
      integer = integer.plus(excess);
    }
    exponent--;
  }

  // TODO: Fix this abomination
  ({ exponent, integer, fractional } = roundHalfToEven(
    exponent,
    integer,
    fractional,
    significandWidth
  ));
  let significand = integer.plus(fractional);

  // set type
  let type: Flop754Type = Flop754Type.NORMAL;
  if (integer.isZero()) {
    type = Flop754Type.SUBNORMAL;
  }
  if (exponent > maxExponentRange) {
    type = sign ? Flop754Type.NEGATIVE_INFINITY : Flop754Type.POSITIVE_INFINITY;
    exponent = maxExponentRange + 1;
    significand = one;
  }

  // TODO: Is this necessary?
  // override type assignment if FlopType is set
  switch (flop.type) {
    case FlopType.POSITIVE_INFINITY:
      type = Flop754Type.POSITIVE_INFINITY;
      break;
    case FlopType.NEGATIVE_INFINITY:
      type = Flop754Type.NEGATIVE_INFINITY;
      break;
    case FlopType.NAN:
      type = Flop754Type.NAN;
      break;
  }

  return {
    type,
    sign,
    exponent,
    significand,
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
 * Converts bit array to hexadecimal string.
 * @param bits boolean array representing bits (length should be in multiple of 4)
 * @returns hexadecimal string
 */
export const stringifyBitsToHex = (bits: boolean[]): string => {
  return Array.from(Array(Math.floor(bits.length / 4)).keys())
    .map((i) => i * 4)
    .map((i) => bits.slice(i, i + 4))
    .map((e) => stringifyBits(e))
    .map((e) => parseInt(e, 2).toString(16))
    .join("");
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
 * Converts hexadecimal string to bit array.
 * @param hexString hexadecimal string
 * @returns boolean array representing bits
 */
export const bitsFromHexString = (hexString: string): boolean[] => {
  return hexString
    .split("")
    .map((e) => parseInt(e, 16).toString(2).padStart(4, "0"))
    .map((e) => e.split(""))
    .flat(1)
    .map((e) => (e === "1" ? true : false));
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

// http://pages.cs.wisc.edu/~markhill/cs354/Fall2008/notes/flpt.apprec.html
// https://stackoverflow.com/questions/8981913/how-to-perform-round-to-even-with-floating-point-numbers
// TODO: Cleanup and add docs
export const roundHalfToEven = (
  exponent: number,
  integer: BigNumber,
  fractional: BigNumber,
  significandWidth: number
): { exponent: number; integer: BigNumber; fractional: BigNumber } => {
  const fractionalBits = fractional.toString(2).split(".")[1] ?? "";
  // TODO: Is there a better way to handle this?
  if (fractionalBits.length <= significandWidth) {
    return { exponent, integer, fractional };
  }

  const G =
    fractionalBits.substring(significandWidth, significandWidth + 1) ?? "0";
  const R =
    fractionalBits.substring(significandWidth + 1, significandWidth + 2) ?? "0";
  const S = fractionalBits.length > significandWidth + 3 ? "1" : "0";

  if (G === "1") {
    // 111, 101, 110
    if (R === "1" || S === "1") {
      return roundHalfUp(exponent, integer, fractional, significandWidth);
    }

    const LSB = fractionalBits.substring(
      significandWidth - 1,
      significandWidth
    );

    // (1)100
    if (LSB === "1") {
      return roundHalfUp(exponent, integer, fractional, significandWidth);
    }
  }

  // 0XX, (0)100
  return {
    exponent,
    integer,
    fractional: new BigNumber(
      "." + fractionalBits.substring(0, significandWidth),
      2
    ),
  };
};

// TODO: Cleanup and add docs
export const roundHalfUp = (
  exponent: number,
  integer: BigNumber,
  fractional: BigNumber,
  significandWidth: number
): { exponent: number; integer: BigNumber; fractional: BigNumber } => {
  const fractionalBits = fractional.toString(2).split(".")[1] ?? "";
  // TODO: Is there a better way to handle this?
  if (fractionalBits.length <= significandWidth) {
    return { exponent, integer, fractional };
  }

  let newExponent = exponent;
  let newInteger = integer;
  let newFractional = new BigNumber(
    "." + fractionalBits.substring(0, significandWidth),
    2
  );
  newFractional = newFractional.plus(
    new BigNumber("." + "1".padStart(significandWidth, "0"), 2)
  );

  const excess = newFractional.integerValue(BigNumber.ROUND_DOWN);
  if (!excess.isZero()) {
    newFractional = newFractional.minus(excess);
    // handle subnormal numbers
    if (newInteger.isZero()) {
      newInteger = new BigNumber("1");
    } else {
      newExponent++;
    }
  }

  return {
    exponent: newExponent,
    integer: newInteger,
    fractional: newFractional,
  };
};
