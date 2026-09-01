
// utils/scientificCalculator.ts

// =============================================
// TYPES
// =============================================

export type AngleMode = 'DEG' | 'RAD';

// =============================================
// FACTORIAL
// =============================================

export const factorial = (value: number): number => {
  if (value < 0) {
    throw new Error('Factorial requires a positive number');
  }

  if (!Number.isInteger(value)) {
    throw new Error('Factorial requires a whole number');
  }

  if (value > 170) {
    throw new Error('Number too large');
  }

  let result = 1;

  for (let i = 2; i <= value; i++) {
    result *= i;
  }

  return result;
};

// =============================================
// ANGLE CONVERSION
// =============================================

const toRadians = (value: number): number => {
  return (value * Math.PI) / 180;
};

const fromRadians = (value: number): number => {
  return (value * 180) / Math.PI;
};

// =============================================
// SIN
// =============================================

export const calculateSin = (
  value: number,
  mode: AngleMode,
): number => {
  const angle =
    mode === 'DEG'
      ? toRadians(value)
      : value;

  return Math.sin(angle);
};

// =============================================
// COS
// =============================================

export const calculateCos = (
  value: number,
  mode: AngleMode,
): number => {
  const angle =
    mode === 'DEG'
      ? toRadians(value)
      : value;

  return Math.cos(angle);
};

// =============================================
// TAN
// =============================================

export const calculateTan = (
  value: number,
  mode: AngleMode,
): number => {
  const angle =
    mode === 'DEG'
      ? toRadians(value)
      : value;

  return Math.tan(angle);
};

// =============================================
// INVERSE SIN
// =============================================

export const calculateAsin = (
  value: number,
  mode: AngleMode,
): number => {
  if (value < -1 || value > 1) {
    throw new Error('Invalid asin value');
  }

  const result = Math.asin(value);

  return mode === 'DEG'
    ? fromRadians(result)
    : result;
};

// =============================================
// INVERSE COS
// =============================================

export const calculateAcos = (
  value: number,
  mode: AngleMode,
): number => {
  if (value < -1 || value > 1) {
    throw new Error('Invalid acos value');
  }

  const result = Math.acos(value);

  return mode === 'DEG'
    ? fromRadians(result)
    : result;
};

// =============================================
// INVERSE TAN
// =============================================

export const calculateAtan = (
  value: number,
  mode: AngleMode,
): number => {
  const result = Math.atan(value);

  return mode === 'DEG'
    ? fromRadians(result)
    : result;
};

// =============================================
// SQUARE ROOT
// =============================================

export const calculateSqrt = (
  value: number,
): number => {
  if (value < 0) {
    throw new Error(
      'Cannot calculate square root of negative number',
    );
  }

  return Math.sqrt(value);
};

// =============================================
// SQUARE
// =============================================

export const calculateSquare = (
  value: number,
): number => {
  return value * value;
};

// =============================================
// POWER
// =============================================

export const calculatePower = (
  base: number,
  exponent: number,
): number => {
  return Math.pow(base, exponent);
};

// =============================================
// LOG BASE 10
// =============================================

export const calculateLog = (
  value: number,
): number => {
  if (value <= 0) {
    throw new Error(
      'Log requires a positive number',
    );
  }

  return Math.log10(value);
};

// =============================================
// NATURAL LOG
// =============================================

export const calculateLn = (
  value: number,
): number => {
  if (value <= 0) {
    throw new Error(
      'Ln requires a positive number',
    );
  }

  return Math.log(value);
};

// =============================================
// CONSTANTS
// =============================================

export const PI = Math.PI;

export const E = Math.E;

// =============================================
// FORMAT RESULT
// =============================================

export const formatScientificResult = (
  value: number,
): string => {
  if (!Number.isFinite(value)) {
    throw new Error('Invalid result');
  }

  return Number(
    value.toFixed(10),
  ).toString();
};

