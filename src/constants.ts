// app
export const APP_TITLE = "IEEE 754-Style Floating-Point Converter";
export const GA_UA_ID = "UA-165443113-2";
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
  pre: "Please report any issues on the ",
  link: "GitHub repo",
  post: ". Contributions are also welcome 😊",
};
export const BUILD_SOURCE_URL = `https://github.com/afterdusk/flop/tree/${process.env.REACT_APP_GIT_SHA}`;
export const BUILD_SOURCE_TEXT = {
  pre: `Version ${process.env.REACT_APP_VERSION}, Build `,
  link: `${process.env.REACT_APP_GIT_SHA}`,
  post: "",
};
export const IS_TEST_ENV = process.env.NODE_ENV === "test";
export const DECIMAL_INPUT_FIELD_NAME = "Decimal Input";
export const VALUE_STORED_FIELD_NAME = "Value Stored";
export const ERROR_FIELD_NAME = "Error";
export const BIT_REPRESENTATION_FIELD_NAME = "Binary Representation";
export const HEX_REPRESENTATION_FIELD = "Hex Representation";
export const ROUNDING_MODE_FIELD_NAME = "Rounding Mode";
export const NOTATION_FIELD_NAME = "Result Notation";
export const FIXED_SIGN_FIELD_NAME = "Sign Length";
export const CUSTOM_EXPONENT_FIELD_NAME = "Exponent Length";
export const CUSTOM_SIGNIFICAND_FIELD_NAME = "Significand Length";
export const TOTAL_WIDTH_FIELD_NAME = "Total Length";
export const CLIPBOARD_TOOLTIP_STRING = "Copy to Clipboard";
export const CLIPBOARD_BUTTON_STRING = "Copy";
export const POSITIVE_INFINITY_STRING = "infinity";
export const NEGATIVE_INFINITY_STRING = "-infinity";
export const NAN_STRING = "NaN";
export const HEX_PREFIX_STRING = "0x";

// local storage
export const DECIMAL_INPUT_STORAGE_KEY = "-input";
export const FLOP_STORAGE_KEY = "-flop";
export const FLOP754_STORAGE_KEY = "-flop754";
export const ROUNDING_STORAGE_KEY = "-rounding";
export const NOTATION_STORAGE_KEY = "-notation";
export const CUSTOM_EXPONENT_KEY = "custom-exponent";
export const CUSTOM_SIGNIFICAND_KEY = "custom-significand";

// styling
export const BACKGROUND_COLOR = "#0e171c";
export const ACCENT_COLOR = "#039cfd";
export const MAIN_FONT_FAMILY = `'Roboto', sans-serif;`;
export const MONOSPACED_FONT_FAMILY = `'Roboto Mono', monospace`;

// bignumber.js
export const BIGNUMBER_DECIMAL_PLACES = 3000;

// rounding
export enum ROUNDING_MODE {
  halfToEven,
  towardZero,
}

// formats
export const FP32 = {
  name: "FP32",
  exponentWidth: 8,
  significandWidth: 23,
  urlPath: "/float-converter",
  pageTitle: "Float Converter",
};
export const FP64 = {
  name: "FP64",
  exponentWidth: 11,
  significandWidth: 52,
  urlPath: "/double-converter",
  pageTitle: "Double Converter",
};
export const FP16 = {
  name: "FP16",
  exponentWidth: 5,
  significandWidth: 10,
  urlPath: "/half-precision-converter",
  pageTitle: "Half Precision Converter",
};
export const BF16 = {
  name: "bfloat16",
  exponentWidth: 8,
  significandWidth: 7,
  urlPath: "/brainfloat-converter",
  pageTitle: "Brain Float Converter",
};
export const TF32 = {
  name: "TensorFloat-32",
  exponentWidth: 8,
  significandWidth: 10,
  urlPath: "/tensorfloat-converter",
  pageTitle: "TensorFloat Converter",
};
export const FORMATS = [FP32, FP64, FP16, BF16, TF32];
export const DEFAULT_FORMAT_INDEX = 0;
export const CUSTOM = {
  name: "Custom",
  minExponentWidth: 2,
  maxExponentWidth: 11,
  minSignificandWidth: 1,
  maxSignificandWidth: 52,
  urlPath: "/arbitrary-float-converter",
  pageTitle: "Arbitrary Float Converter",
};
