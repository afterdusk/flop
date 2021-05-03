# [IEEE 754-Style Floating-Point Converter](https://flop.evanau.dev)

![main-branch](https://github.com/afterdusk/flop/actions/workflows/main.yml/badge.svg?branch=main)
![Website](https://img.shields.io/website?down_color=red&down_message=offline&up_color=brightgreen&up_message=online&url=https%3A%2F%2Fflop.evanau.dev)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/afterdusk/flop?label=version)

Floating-point converter for _FP32_, _FP64_, _FP16_, _bfloat16_, _TensorFloat-32_ and arbitrary IEEE 754-style floating-point types.

This is a website for hands-on exploration of floating-point types, and a convenience tool for sanity checks and low-level debugging.

## Features

- Decimal to float representation conversion, and vice versa
- Wide range of IEEE 754-style types, including that of arbitrary exponent and significand width
- Configurable rounding modes for different use cases (e.g. truncation for deep learning)

## Contributing

Please open an issue if you encounter a bug, have questions, or would like to make a suggestion. Pull requests are also welcome.

### Local Development

This project will require `nodejs` and `yarn`. The following yarn scripts should help you get started on local development.

#### `yarn install`

Install the npm packages this project depends on.

#### `yarn start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits and you will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode. See [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
