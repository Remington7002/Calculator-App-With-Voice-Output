
// utils/calculator.ts

// ---------------------------------------------
// SUPPORTED OPERATORS
// ---------------------------------------------

const operators = ['+', '−', '×', '÷'];

// ---------------------------------------------
// OPERATOR PRECEDENCE
// ---------------------------------------------

const precedence: Record<string, number> = {
  '+': 1,
  '−': 1,
  '×': 2,
  '÷': 2,
};

// ---------------------------------------------
// CHECK IF VALUE IS AN OPERATOR
// ---------------------------------------------

export const isOperator = (value: string): boolean => {
  return operators.includes(value);
};

// ---------------------------------------------
// PERFORM CALCULATION
// ---------------------------------------------

const calculateOperation = (
  firstNumber: number,
  secondNumber: number,
  operator: string,
): number => {
  switch (operator) {
    case '+':
      return firstNumber + secondNumber;

    case '−':
      return firstNumber - secondNumber;

    case '×':
      return firstNumber * secondNumber;

    case '÷':
      if (secondNumber === 0) {
        throw new Error('Cannot divide by zero');
      }

      return firstNumber / secondNumber;

    default:
      throw new Error('Unknown operator');
  }
};

// ---------------------------------------------
// TOKENIZE EXPRESSION
// ---------------------------------------------

const tokenize = (expression: string): string[] => {
  const tokens: string[] = [];

  let currentNumber = '';

  for (let i = 0; i < expression.length; i++) {
    const character = expression[i];

    // Number or decimal
    if (/[0-9.]/.test(character)) {
      currentNumber += character;
      continue;
    }

    // Operator
    if (isOperator(character)) {
      if (currentNumber !== '') {
        tokens.push(currentNumber);
        currentNumber = '';
      }

      tokens.push(character);
    }
  }

  // Add last number
  if (currentNumber !== '') {
    tokens.push(currentNumber);
  }

  return tokens;
};

// ---------------------------------------------
// INFIX → POSTFIX
// ---------------------------------------------

const convertToPostfix = (
  tokens: string[],
): string[] => {
  const output: string[] = [];

  const operatorStack: string[] = [];

  tokens.forEach(token => {

    // Number
    if (!isOperator(token)) {
      output.push(token);
      return;
    }

    // Operator
    while (
      operatorStack.length > 0 &&
      precedence[
        operatorStack[operatorStack.length - 1]
      ] >= precedence[token]
    ) {
      output.push(
        operatorStack.pop()!,
      );
    }

    operatorStack.push(token);
  });

  // Empty operator stack
  while (operatorStack.length > 0) {
    output.push(
      operatorStack.pop()!,
    );
  }

  return output;
};

// ---------------------------------------------
// EVALUATE POSTFIX
// ---------------------------------------------

const evaluatePostfix = (
  tokens: string[],
): number => {

  const stack: number[] = [];

  tokens.forEach(token => {

    // Number
    if (!isOperator(token)) {

      const number = Number(token);

      if (!Number.isFinite(number)) {
        throw new Error('Invalid number');
      }

      stack.push(number);

      return;
    }

    // Need two numbers
    if (stack.length < 2) {
      throw new Error('Invalid expression');
    }

    const secondNumber = stack.pop()!;

    const firstNumber = stack.pop()!;

    const result = calculateOperation(
      firstNumber,
      secondNumber,
      token,
    );

    stack.push(result);
  });

  if (stack.length !== 1) {
    throw new Error('Invalid expression');
  }

  return stack[0];
};

// ---------------------------------------------
// MAIN CALCULATOR FUNCTION
// ---------------------------------------------

export const calculateExpression = (
  expression: string,
): string => {

  if (
    !expression ||
    expression.trim() === ''
  ) {
    return '0';
  }

  const tokens = tokenize(expression);

  if (tokens.length === 0) {
    throw new Error(
      'Invalid expression',
    );
  }

  const postfix =
    convertToPostfix(tokens);

  const result =
    evaluatePostfix(postfix);

  if (!Number.isFinite(result)) {
    throw new Error(
      'Invalid result',
    );
  }

  // Fix floating-point problems.
  //
  // Example:
  // 0.1 + 0.2
  //
  // JavaScript normally gives:
  // 0.30000000000000004
  //
  // We return:
  // 0.3

  return Number(
    result.toFixed(10),
  ).toString();
};
