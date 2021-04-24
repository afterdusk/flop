// styling
export const BACKGROUND_COLOR = "#282c34";

// app
export const APP_TITLE = "IEEE 754-Style Floating-Point Converter";
export const POSITIVE_INFINITY_STRING = "infinity";
export const NEGATIVE_INFINITY_STRING = "-infinity";
export const NAN_STRING = "NaN";
export const HEX_PREFIX_STRING = "0x";

// bignumber.js
export const BIGNUMBER_DECIMAL_PLACES = 300;

// formats
export const FP64 = {
  name: "FP64",
  exponentWidth: 11,
  significandWidth: 52,
};

export const FP32 = {
  name: "FP32",
  exponentWidth: 8,
  significandWidth: 23,
};

export const FP16 = {
  name: "FP16",
  exponentWidth: 5,
  significandWidth: 10,
};

export const BF16 = {
  name: "bfloat16",
  exponentWidth: 8,
  significandWidth: 7,
};

export const TF32 = {
  name: "TensorFloat-32",
  exponentWidth: 8,
  significandWidth: 10,
};
