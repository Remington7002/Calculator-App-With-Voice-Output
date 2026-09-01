
import React, { useState } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';

import Tts from 'react-native-tts';

import CalculatorButton from './android/components/CalculatorButton';

import {
  calculateExpression,
} from './android/utils/calculator';

import {
  AngleMode,
  calculateSin,
  calculateCos,
  calculateTan,
  calculateAsin,
  calculateAcos,
  calculateAtan,
  calculateSqrt,
  calculateSquare,
  calculateLog,
  calculateLn,
  factorial,
  PI,
  E,
  formatScientificResult,
} from './android/utils/scientificCalculator';


const App = () => {

  // =============================================
  // STATE
  // =============================================

  const [display, setDisplay] = useState('0');

  const [expression, setExpression] =
    useState('');

  const [calculated, setCalculated] =
    useState(false);

  const [scientificMode, setScientificMode] =
    useState(false);

  const [angleMode, setAngleMode] =
    useState<AngleMode>('DEG');


  // =============================================
  // NUMBER
  // =============================================

  const handleNumber = (number: string) => {

    if (calculated) {

      setDisplay(number);
      setExpression('');
      setCalculated(false);

      return;
    }

    if (display === '0') {

      setDisplay(number);

      return;
    }

    if (display.length >= 15) {
      return;
    }

    setDisplay(display + number);
  };


  // =============================================
  // DECIMAL
  // =============================================

  const handleDecimal = () => {

    if (calculated) {

      setDisplay('0.');
      setExpression('');
      setCalculated(false);

      return;
    }

    if (display.includes('.')) {
      return;
    }

    setDisplay(display + '.');
  };


  // =============================================
  // OPERATOR
  // =============================================

  const handleOperator = (operator: string) => {

    if (display === 'Error') {
      return;
    }

    if (calculated) {

      setExpression(
        display + operator,
      );

      setDisplay('0');

      setCalculated(false);

      return;
    }

    if (expression === '') {

      setExpression(
        display + operator,
      );

      setDisplay('0');

      return;
    }

    setExpression(
      expression +
      display +
      operator,
    );

    setDisplay('0');
  };


  // =============================================
  // EQUALS
  // =============================================

  const handleEquals = () => {

    if (
      display === 'Error' ||
      expression === ''
    ) {
      return;
    }

    const fullExpression =
      expression + display;

    try {

      const result =
        calculateExpression(
          fullExpression,
        );

      setDisplay(result);

      setExpression(
        fullExpression + '=',
      );

      setCalculated(true);

    } catch {

      setDisplay('Error');

      setExpression('');

      setCalculated(true);
    }
  };


  // =============================================
  // CLEAR
  // =============================================

  const handleClear = () => {

    setDisplay('0');

    setExpression('');

    setCalculated(false);
  };


  // =============================================
  // DELETE
  // =============================================

  const handleDelete = () => {

    if (calculated) {

      setDisplay('0');

      setExpression('');

      setCalculated(false);

      return;
    }

    if (display.length <= 1) {

      setDisplay('0');

      return;
    }

    setDisplay(
      display.slice(0, -1),
    );
  };


  // =============================================
  // PERCENTAGE
  // =============================================

  const handlePercentage = () => {

    if (display === 'Error') {
      return;
    }

    const number =
      parseFloat(display);

    if (isNaN(number)) {
      return;
    }

    setDisplay(
      (number / 100).toString(),
    );
  };


  // =============================================
  // SPEAKER
  // =============================================

 const handleSpeak = () => {
  if (display === 'Error' || !display) {
    return;
  }

  const numberWords: { [key: string]: string } = {
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    '.': 'point',
    '-': 'negative',
  };

  const spokenNumber = String(display)
    .split('')
    .map(char => numberWords[char] || char)
    .join(' ');

  Tts.stop();

  Tts.speak(`The answer is ${spokenNumber}`);
};


  // =============================================
  // SCIENTIFIC FUNCTION
  // =============================================

  const applyScientificFunction = (
    operation: string,
  ) => {

    if (display === 'Error') {
      return;
    }

    const value =
      parseFloat(display);

    if (isNaN(value)) {
      return;
    }

    try {

      let result: number;

      switch (operation) {

        case 'sin':

          result = calculateSin(
            value,
            angleMode,
          );

          break;

        case 'cos':

          result = calculateCos(
            value,
            angleMode,
          );

          break;

        case 'tan':

          result = calculateTan(
            value,
            angleMode,
          );

          break;

        case 'asin':

          result = calculateAsin(
            value,
            angleMode,
          );

          break;

        case 'acos':

          result = calculateAcos(
            value,
            angleMode,
          );

          break;

        case 'atan':

          result = calculateAtan(
            value,
            angleMode,
          );

          break;

        case 'sqrt':

          result = calculateSqrt(value);

          break;

        case 'square':

          result = calculateSquare(value);

          break;

        case 'log':

          result = calculateLog(value);

          break;

        case 'ln':

          result = calculateLn(value);

          break;

        case 'factorial':

          result = factorial(value);

          break;

        default:
          return;
      }

      setDisplay(
        formatScientificResult(result),
      );

      setExpression(
        `${operation}(${display})`,
      );

      setCalculated(true);

    } catch {

      setDisplay('Error');

      setExpression('');

      setCalculated(true);
    }
  };


  // =============================================
  // PI
  // =============================================

  const handlePi = () => {

    setDisplay(
      formatScientificResult(PI),
    );

    setExpression('');

    setCalculated(false);
  };


  // =============================================
  // E
  // =============================================

  const handleE = () => {

    setDisplay(
      formatScientificResult(E),
    );

    setExpression('');

    setCalculated(false);
  };


  // =============================================
  // ANGLE MODE
  // =============================================

  const toggleAngleMode = () => {

    setAngleMode(
      previous =>
        previous === 'DEG'
          ? 'RAD'
          : 'DEG',
    );
  };


  // =============================================
  // SCIENTIFIC MODE
  // =============================================

  const toggleScientificMode = () => {

    setScientificMode(
      previous => !previous,
    );
  };


  // =============================================
  // DISPLAY
  // =============================================

  const renderDisplay = () => {

    return (

      <View style={styles.displayContainer}>

        <Text
          style={styles.expression}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {expression || ' '}
        </Text>

        <Text
          style={styles.result}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {display}
        </Text>

        <View
          style={styles.speakerContainer}
        >

          <CalculatorButton
            title="🔊"
            onPress={handleSpeak}
            flex={0}
            variant="special"
          />

        </View>

      </View>
    );
  };


  // =============================================
  // BASIC CALCULATOR
  // =============================================

  const renderBasicCalculator = () => {

    return (

      <View style={styles.keypad}>

        {/* SCI BUTTON */}

        <View
          style={styles.modeButton}
        >

          <CalculatorButton
            title="SCI"
            onPress={toggleScientificMode}
            variant="special"
          />

        </View>


        {/* ROW 1 */}

        <View style={styles.row}>

          <CalculatorButton
            title="AC"
            onPress={handleClear}
            variant="special"
          />

          <CalculatorButton
            title="⌫"
            onPress={handleDelete}
            variant="special"
          />

          <CalculatorButton
            title="%"
            onPress={handlePercentage}
            variant="special"
          />

          <CalculatorButton
            title="÷"
            onPress={() =>
              handleOperator('÷')
            }
            variant="operator"
          />

        </View>


        {/* ROW 2 */}

        <View style={styles.row}>

          <CalculatorButton
            title="7"
            onPress={() =>
              handleNumber('7')
            }
          />

          <CalculatorButton
            title="8"
            onPress={() =>
              handleNumber('8')
            }
          />

          <CalculatorButton
            title="9"
            onPress={() =>
              handleNumber('9')
            }
          />

          <CalculatorButton
            title="×"
            onPress={() =>
              handleOperator('×')
            }
            variant="operator"
          />

        </View>


        {/* ROW 3 */}

        <View style={styles.row}>

          <CalculatorButton
            title="4"
            onPress={() =>
              handleNumber('4')
            }
          />

          <CalculatorButton
            title="5"
            onPress={() =>
              handleNumber('5')
            }
          />

          <CalculatorButton
            title="6"
            onPress={() =>
              handleNumber('6')
            }
          />

          <CalculatorButton
            title="−"
            onPress={() =>
              handleOperator('−')
            }
            variant="operator"
          />

        </View>


        {/* ROW 4 */}

        <View style={styles.row}>

          <CalculatorButton
            title="1"
            onPress={() =>
              handleNumber('1')
            }
          />

          <CalculatorButton
            title="2"
            onPress={() =>
              handleNumber('2')
            }
          />

          <CalculatorButton
            title="3"
            onPress={() =>
              handleNumber('3')
            }
          />

          <CalculatorButton
            title="+"
            onPress={() =>
              handleOperator('+')
            }
            variant="operator"
          />

        </View>


        {/* ROW 5 */}

        <View style={styles.row}>

          <CalculatorButton
            title="0"
            onPress={() =>
              handleNumber('0')
            }
          />

          <CalculatorButton
            title="."
            onPress={handleDecimal}
          />

          <CalculatorButton
            title="00"
            onPress={() =>
              handleNumber('00')
            }
          />

          <CalculatorButton
            title="="
            onPress={handleEquals}
            variant="equals"
          />

        </View>

      </View>
    );
  };


  // =============================================
  // SCIENTIFIC CALCULATOR
  // =============================================

  const renderScientificCalculator = () => {

    return (

      <View
        style={styles.scientificKeypad}
      >

        {/* BASIC/SCIENTIFIC TOGGLE */}

        <View
          style={styles.modeButton}
        >

          <CalculatorButton
            title="BASIC"
            onPress={toggleScientificMode}
            variant="special"
          />

        </View>


        {/* ROW 1 */}

        <View style={styles.row}>

          <CalculatorButton
            title={angleMode}
            onPress={toggleAngleMode}
            variant="special"
          />

          <CalculatorButton
            title="sin"
            onPress={() =>
              applyScientificFunction('sin')
            }
            variant="function"
          />

          <CalculatorButton
            title="cos"
            onPress={() =>
              applyScientificFunction('cos')
            }
            variant="function"
          />

          <CalculatorButton
            title="tan"
            onPress={() =>
              applyScientificFunction('tan')
            }
            variant="function"
          />

        </View>


        {/* ROW 2 */}

        <View style={styles.row}>

          <CalculatorButton
            title="asin"
            onPress={() =>
              applyScientificFunction('asin')
            }
            variant="function"
          />

          <CalculatorButton
            title="acos"
            onPress={() =>
              applyScientificFunction('acos')
            }
            variant="function"
          />

          <CalculatorButton
            title="atan"
            onPress={() =>
              applyScientificFunction('atan')
            }
            variant="function"
          />

          <CalculatorButton
            title="√"
            onPress={() =>
              applyScientificFunction('sqrt')
            }
            variant="function"
          />

        </View>


        {/* ROW 3 */}

        <View style={styles.row}>

          <CalculatorButton
            title="x²"
            onPress={() =>
              applyScientificFunction('square')
            }
            variant="function"
          />

          <CalculatorButton
            title="log"
            onPress={() =>
              applyScientificFunction('log')
            }
            variant="function"
          />

          <CalculatorButton
            title="ln"
            onPress={() =>
              applyScientificFunction('ln')
            }
            variant="function"
          />

          <CalculatorButton
            title="x!"
            onPress={() =>
              applyScientificFunction('factorial')
            }
            variant="function"
          />

        </View>


        {/* ROW 4 */}

        <View style={styles.row}>

          <CalculatorButton
            title="π"
            onPress={handlePi}
            variant="function"
          />

          <CalculatorButton
            title="e"
            onPress={handleE}
            variant="function"
          />

          <CalculatorButton
            title="AC"
            onPress={handleClear}
            variant="special"
          />

          <CalculatorButton
            title="⌫"
            onPress={handleDelete}
            variant="special"
          />

        </View>


        {/* ROW 5 */}

        <View style={styles.row}>

          <CalculatorButton
            title="7"
            onPress={() =>
              handleNumber('7')
            }
          />

          <CalculatorButton
            title="8"
            onPress={() =>
              handleNumber('8')
            }
          />

          <CalculatorButton
            title="9"
            onPress={() =>
              handleNumber('9')
            }
          />

          <CalculatorButton
            title="÷"
            onPress={() =>
              handleOperator('÷')
            }
            variant="operator"
          />

        </View>


        {/* ROW 6 */}

        <View style={styles.row}>

          <CalculatorButton
            title="4"
            onPress={() =>
              handleNumber('4')
            }
          />

          <CalculatorButton
            title="5"
            onPress={() =>
              handleNumber('5')
            }
          />

          <CalculatorButton
            title="6"
            onPress={() =>
              handleNumber('6')
            }
          />

          <CalculatorButton
            title="×"
            onPress={() =>
              handleOperator('×')
            }
            variant="operator"
          />

        </View>


        {/* ROW 7 */}

        <View style={styles.row}>

          <CalculatorButton
            title="1"
            onPress={() =>
              handleNumber('1')
            }
          />

          <CalculatorButton
            title="2"
            onPress={() =>
              handleNumber('2')
            }
          />

          <CalculatorButton
            title="3"
            onPress={() =>
              handleNumber('3')
            }
          />

          <CalculatorButton
            title="−"
            onPress={() =>
              handleOperator('−')
            }
            variant="operator"
          />

        </View>


        {/* ROW 8 */}

        <View style={styles.row}>

          <CalculatorButton
            title="0"
            onPress={() =>
              handleNumber('0')
            }
          />

          <CalculatorButton
            title="."
            onPress={handleDecimal}
          />

          <CalculatorButton
            title="00"
            onPress={() =>
              handleNumber('00')
            }
          />

          <CalculatorButton
            title="+"
            onPress={() =>
              handleOperator('+')
            }
            variant="operator"
          />

        </View>


        {/* ROW 9 */}

        <View style={styles.row}>

          <CalculatorButton
            title="%"
            onPress={handlePercentage}
            variant="special"
          />

          <CalculatorButton
            title="="
            onPress={handleEquals}
            variant="equals"
            flex={2}
          />

        </View>

      </View>
    );
  };


  // =============================================
  // MAIN UI
  // =============================================

  return (

    <SafeAreaView
      style={styles.container}
    >

      <StatusBar
        barStyle="light-content"
      />


      {renderDisplay()}


      {scientificMode
        ? renderScientificCalculator()
        : renderBasicCalculator()
      }

    </SafeAreaView>
  );
};


// =============================================
// STYLES
// =============================================

const styles = StyleSheet.create({

  container: {
    flex: 1,

    backgroundColor: '#111111',
  },


  // ===========================================
  // DISPLAY
  // ===========================================

  displayContainer: {
    flex: 1,

    justifyContent: 'flex-end',

    alignItems: 'flex-end',

    paddingHorizontal: 15,

    paddingBottom: 5,
  },

  expression: {
    fontSize: 20,

    color: '#888888',

    marginBottom: 5,
  },

  result: {
    fontSize: 48,

    color: '#FFFFFF',

    fontWeight: '600',
  },


  // ===========================================
  // SPEAKER
  // ===========================================

  speakerContainer: {
    width: 65,

    height: 55,

    marginTop: 3,
  },


  // ===========================================
  // BASIC KEYPAD
  // ===========================================

  keypad: {
    height: 430,

    paddingHorizontal: 8,

    paddingBottom: 8,
  },


  // ===========================================
  // SCIENTIFIC KEYPAD
  // ===========================================

  scientificKeypad: {
    height: 590,

    paddingHorizontal: 6,

    paddingBottom: 5,
  },


  // ===========================================
  // ROW
  // ===========================================

  row: {
    flexDirection: 'row',

    flex: 1,
  },


  // ===========================================
  // MODE BUTTON
  // ===========================================

  modeButton: {
    height: 48,

    width: '28%',

    alignSelf: 'flex-end',

    marginBottom: 3,
  },

});


export default App;

