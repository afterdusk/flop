import { render, screen } from "@testing-library/react";
import BigNumber from "bignumber.js";
import React from "react";

import * as constants from "../constants";
import * as flop from "../converter/flop";

BigNumber.set({ DECIMAL_PLACES: constants.BIGNUMBER_DECIMAL_PLACES });

const FP32_TEST_CASES = [
  // precise
  {
    DECIMAL: "4",
    STORED: "4",
    BITS: "01000000100000000000000000000000",
    HEX: "40800000",
  },
  // imprecise (round up)
  {
    DECIMAL: "0.1",
    STORED: "0.100000001490116119384765625",
    BITS: "00111101110011001100110011001101",
    HEX: "3dcccccd",
  },
  // imprecise (round up)
  {
    DECIMAL: "0.3",
    STORED: "0.300000011920928955078125",
    BITS: "00111110100110011001100110011010",
    HEX: "3e99999a",
  },
  // imprecise (round up)
  {
    DECIMAL: "-0.032",
    STORED: "-0.0320000015199184417724609375",
    BITS: "10111101000000110001001001101111",
    HEX: "bd03126f",
  },
  // infinity
  {
    DECIMAL: "999999999999999999999999999999999999999",
    STORED: constants.POSITIVE_INFINITY_STRING,
    BITS: "01111111100000000000000000000000",
    HEX: "7f800000",
  },
  // negative infinity
  {
    DECIMAL: "-999999999999999999999999999999999999999",
    STORED: constants.NEGATIVE_INFINITY_STRING,
    BITS: "11111111100000000000000000000000",
    HEX: "ff800000",
  },
  // smallest subnormal
  {
    DECIMAL:
      "-0.00000000000000000000000000000000000000000000140129846432481707092372958328991613128026194187651577175706828388979108268586060148663818836212158203125",
    STORED:
      "-0.00000000000000000000000000000000000000000000140129846432481707092372958328991613128026194187651577175706828388979108268586060148663818836212158203125",
    BITS: "10000000000000000000000000000001",
    HEX: "80000001",
  },
  // largest subnormal
  {
    DECIMAL:
      "0.0000000000000000000000000000000000000058774717541114375398436826861112283890933277838604376075437585313920862972736358642578125",
    STORED:
      "0.0000000000000000000000000000000000000058774717541114375398436826861112283890933277838604376075437585313920862972736358642578125",
    BITS: "00000000010000000000000000000000",
    HEX: "00400000",
  },
];

const FP64_TEST_CASES = [
  // precise
  {
    DECIMAL: "1234567891011.75",
    STORED: "1234567891011.75",
    BITS: "0100001001110001111101110001111110110000100001000011110000000000",
    HEX: "4271f71fb0843c00",
  },
  // imprecise (round up)
  {
    DECIMAL: "5555555555555.55555555588",
    STORED: "5555555555555.5556640625",
    BITS: "0100001010010100001101100000001110101001011000111000111000111001",
    HEX: "42943603a9638e39",
  },
];

test("generate and stringify Flop", () => {
  FP32_TEST_CASES.forEach((tc) => {
    const expected = tc.DECIMAL;
    const actual = flop.stringifyFlop(flop.generateFlop(tc.DECIMAL));
    expect(expected).toEqual(actual);
  });
  FP64_TEST_CASES.forEach((tc) => {
    const expected = tc.DECIMAL;
    const actual = flop.stringifyFlop(flop.generateFlop(tc.DECIMAL));
    expect(expected).toEqual(actual);
  });
});

test("deconstruct and stringify Flop754", () => {
  FP32_TEST_CASES.forEach((tc) => {
    const componentBits = flop.deconstructFlop754(
      flop.convertFlopToFlop754(flop.generateFlop(tc.DECIMAL), 8, 23),
      8,
      23
    );
    const bits = [
      ...componentBits.sign,
      ...componentBits.exponent,
      ...componentBits.significand,
    ];

    const expectedBits = tc.BITS;
    const actualBits = flop.stringifyBits(bits);
    expect(expectedBits).toEqual(actualBits);

    const expectedHex = tc.HEX;
    const actualHex = flop.stringifyBitsToHex(bits);
    expect(expectedHex).toEqual(actualHex);
  });
  FP64_TEST_CASES.forEach((tc) => {
    const componentBits = flop.deconstructFlop754(
      flop.convertFlopToFlop754(flop.generateFlop(tc.DECIMAL), 11, 52),
      11,
      52
    );
    const bits = [
      ...componentBits.sign,
      ...componentBits.exponent,
      ...componentBits.significand,
    ];

    const expectedBits = tc.BITS;
    const actualBits = flop.stringifyBits(bits);
    expect(expectedBits).toEqual(actualBits);

    const expectedHex = tc.HEX;
    const actualHex = flop.stringifyBitsToHex(bits);
    expect(expectedHex).toEqual(actualHex);
  });
});

test("two-way conversion", () => {
  FP32_TEST_CASES.forEach((tc) => {
    const expected = tc.STORED;
    const actual = flop.stringifyFlop(
      flop.convertFlop754ToFlop(
        flop.convertFlopToFlop754(flop.generateFlop(tc.DECIMAL), 8, 23)
      )
    );
    expect(expected).toEqual(actual);
  });
  FP64_TEST_CASES.forEach((tc) => {
    const expected = tc.STORED;
    const actual = flop.stringifyFlop(
      flop.convertFlop754ToFlop(
        flop.convertFlopToFlop754(flop.generateFlop(tc.DECIMAL), 11, 52)
      )
    );
    expect(expected).toEqual(actual);
  });
});
