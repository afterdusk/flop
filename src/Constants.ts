// app
export const APP_TITLE = "IEEE 754-Style Floating-Point Converter";
export const POSITIVE_INFINITY_STRING = "infinity";
export const NEGATIVE_INFINITY_STRING = "-infinity";
export const NAN_STRING = "NaN";
export const HEX_PREFIX_STRING = "0x";
export const UI_ACKNOWLEDGEMENT_URL =
  "https://www.h-schmidt.net/FloatConverter/IEEE754.html";
export const UI_ACKNOWLEDGEMENT_TEXT = {
  pre: "Converter UI from ",
  link: "h-schmidt's floating-point converter",
  post: ".",
};
export const BIGNUM_ACKNOWLEDGEMENT_URL =
  "https://mikemcl.github.io/bignumber.js/";
export const BIGNUM_ACKNOWLEDGEMENT_TEXT = {
  pre: "Conversion routines powered by the ",
  link: "bignumber.js",
  post: " library.",
};
export const ISSUES_CONTRIBUTION_URL = "https://github.com/afterdusk/flop";
export const ISSUES_CONTRIBUTION_TEXT = {
  pre: "If you find any issues, please report them on the ",
  link: "GitHub repo",
  post: ". Contributions are also welcome 😊",
};
export const BUILD_SOURCE_URL = `https://github.com/afterdusk/flop/tree/${process.env.REACT_APP_GIT_SHA}`;
export const BUILD_SOURCE_TEXT = {
  pre: `Version ${process.env.REACT_APP_VERSION}, Build `,
  link: `${process.env.REACT_APP_GIT_SHA}`,
  post: "",
};

// styling
export const BACKGROUND_COLOR = "#0e171c";
export const ACCENT_COLOR = "#039cfd";

// bignumber.js
export const BIGNUMBER_DECIMAL_PLACES = 3000;

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
