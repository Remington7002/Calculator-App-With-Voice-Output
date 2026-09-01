import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Tts from 'react-native-tts';

import CalculatorButton from './android/components/CalculatorButton';

import {
  calculateExpression,
} from './android/utils/calculator';

import {
  initializeDatabase,
  saveCalculation,
  getCalculations,
  deleteCalculation,
  clearHistory,
} from './src/database/database';

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

  // HISTORY STATE

  const [history, setHistory] =
    useState<any[]>([]);

  const [showHistory, setShowHistory] =
    useState(false);


  // =============================================
  // DATABASE INITIALIZATION
  // =============================================

  useEffect(() => {
    initializeDatabase();
    loadHistory();
  }, []);


  // =============================================
  // LOAD HISTORY
  // =============================================

 const loadHistory = () => {
  try {
    const data = getCalculations();

    setHistory(data._array);
  } catch (error) {
    console.error(
      'Error loading history:',
      error,
    );
  }
};

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

      // SAVE CALCULATION

      saveCalculation(
        fullExpression,
        result,
      );

      loadHistory();

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

    if (
      display === 'Error' ||
      !display
    ) {
      return;
    }

    const numberWords: {
      [key: string]: string;
    } = {

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

    const spokenNumber =
      String(display)
        .split('')
        .map(
          char =>
            numberWords[char] || char,
        )
        .join(' ');

    Tts.stop();

    Tts.speak(
      `The answer is ${spokenNumber}`,
    );
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

          result = calculateSqrt(
            value,
          );

          break;

        case 'square':

          result = calculateSquare(
            value,
          );

          break;

        case 'log':

          result = calculateLog(
            value,
          );

          break;

        case 'ln':

          result = calculateLn(
            value,
          );

          break;

        case 'factorial':

          result = factorial(
            value,
          );

          break;

        default:

          return;
      }

      const formattedResult =
        formatScientificResult(
          result,
        );

      setDisplay(
        formattedResult,
      );

      setExpression(
        `${operation}(${display})`,
      );

      setCalculated(true);

      // SAVE SCIENTIFIC CALCULATION

      saveCalculation(
        `${operation}(${display})`,
        formattedResult,
      );

      loadHistory();

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

    const result =
      formatScientificResult(PI);

    setDisplay(result);

    setExpression('');

    setCalculated(false);
  };


  // =============================================
  // E
  // =============================================

  const handleE = () => {

    const result =
      formatScientificResult(E);

    setDisplay(result);

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
  // DELETE HISTORY ITEM
  // =============================================

  const handleDeleteHistory = (
    id: number,
  ) => {

    try {

      deleteCalculation(id);

      loadHistory();

    } catch (error) {

      console.error(
        'Error deleting history:',
        error,
      );
    }
  };


  // =============================================
  // CLEAR HISTORY
  // =============================================

  const handleClearHistory = () => {

    try {

      clearHistory();

      loadHistory();

    } catch (error) {

      console.error(
        'Error clearing history:',
        error,
      );
    }
  };


  // =============================================
  // DISPLAY
  // =============================================

  const renderDisplay = () => {

    return (

      <View
        style={styles.displayContainer}
      >

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
  // HISTORY BUTTON
  // =============================================

  const renderHistoryButton = () => {

    return (

      <View
        style={styles.historyContainer}
      >

        <TouchableOpacity
          style={styles.historyModeButton}
          onPress={() => {
            loadHistory();
            setShowHistory(true);
          }}
        >

          <Text
            style={styles.historyButtonText}
          >
            HISTORY
          </Text>

        </TouchableOpacity>

      </View>
    );
  };


  // =============================================
  // HISTORY SCREEN
  // =============================================

  const renderHistory = () => {

    if (!showHistory) {
      return null;
    }

    return (

      <View
        style={styles.historyOverlay}
      >

        <View
          style={styles.historyContainer}
        >

          {/* HEADER */}

          <View
            style={styles.historyHeader}
          >

            <Text
              style={styles.historyTitle}
            >
              Calculation History
            </Text>

            <TouchableOpacity
              onPress={() =>
                setShowHistory(false)
              }
            >

              <Text
                style={styles.closeButton}
              >
                ✕
              </Text>

            </TouchableOpacity>

          </View>


          {/* HISTORY LIST */}

          <FlatList
            data={history}
            keyExtractor={item =>
              item.id.toString()
            }
            showsVerticalScrollIndicator={false}

            ListEmptyComponent={

              <View
                style={
                  styles.emptyHistoryContainer
                }
              >

                <Text
                  style={styles.emptyHistory}
                >
                  No calculations yet
                </Text>

              </View>
            }

            renderItem={({
              item,
            }) => (

              <View
                style={styles.historyItem}
              >

                <View
                  style={
                    styles.historyTextContainer
                  }
                >

                  <Text
                    style={
                      styles.historyExpression
                    }
                    numberOfLines={1}
                  >
                    {item.expression}
                  </Text>

                  <Text
                    style={
                      styles.historyResult
                    }
                    numberOfLines={1}
                  >
                    = {item.result}
                  </Text>

                  <Text
                    style={
                      styles.historyDate
                    }
                  >
                    {item.created_at
                      ? new Date(
                          item.created_at,
                        ).toLocaleString()
                      : ''}
                  </Text>

                </View>


                <TouchableOpacity
                  style={
                    styles.deleteHistoryButton
                  }
                  onPress={() =>
                    handleDeleteHistory(
                      item.id,
                    )
                  }
                >

                  <Text
                    style={
                      styles.deleteHistoryText
                    }
                  >
                    🗑
                  </Text>

                </TouchableOpacity>

              </View>
            )}
          />


          {/* CLEAR HISTORY */}

          {history.length > 0 && (

            <TouchableOpacity
              style={
                styles.clearHistoryButton
              }
              onPress={
                handleClearHistory
              }
            >

              <Text
                style={
                  styles.clearHistoryText
                }
              >
                CLEAR HISTORY
              </Text>

            </TouchableOpacity>

          )}

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
          style={styles.topButtonsRow}
        >

          <View
            style={styles.modeButton}
          >

            <CalculatorButton
              title="SCI"
              onPress={
                toggleScientificMode
              }
              variant="special"
            />

          </View>

          <View
            style={styles.historyModeButton}
          >

            <CalculatorButton
              title="HIST"
              onPress={() => {
                loadHistory();
                setShowHistory(true);
              }}
              variant="special"
            />

          </View>

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
          style={styles.topButtonsRow}
        >

          <View
            style={styles.modeButton}
          >

            <CalculatorButton
              title="BASIC"
              onPress={
                toggleScientificMode
              }
              variant="special"
            />

          </View>

          <View
            style={styles.historyModeButton}
          >

            <CalculatorButton
              title="HIST"
              onPress={() => {
                loadHistory();
                setShowHistory(true);
              }}
              variant="special"
            />

          </View>

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
              applyScientificFunction(
                'factorial',
              )
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


      {renderHistory()}

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
historyButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '700',
  textAlign: 'center',
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
  // TOP BUTTONS
  // ===========================================

  topButtonsRow: {
    flexDirection: 'row',

    justifyContent: 'flex-end',

    alignItems: 'center',

    gap: 8,

    height: 48,

    marginBottom: 3,
  },


  modeButton: {
    height: 48,

    width: '28%',
  },


  historyModeButton: {
    height: 48,

    width: '28%',
  },


  // ===========================================
  // HISTORY OVERLAY
  // ===========================================

  historyOverlay: {
    position: 'absolute',

    top: 0,

    left: 0,

    right: 0,

    bottom: 0,

    backgroundColor: 'rgba(0,0,0,0.85)',

    zIndex: 100,
  },


  historyContainer: {
    flex: 1,

    backgroundColor: '#1C1C1C',

    marginTop: 50,

    borderTopLeftRadius: 25,

    borderTopRightRadius: 25,

    paddingHorizontal: 18,

    paddingTop: 20,

    paddingBottom: 15,
  },


  historyHeader: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 15,
  },


  historyTitle: {
    color: '#FFFFFF',

    fontSize: 24,

    fontWeight: '700',
  },


  closeButton: {
    color: '#FFFFFF',

    fontSize: 28,

    fontWeight: '600',

    paddingHorizontal: 8,
  },


  // ===========================================
  // HISTORY ITEMS
  // ===========================================

  historyItem: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    backgroundColor: '#292929',

    borderRadius: 14,

    paddingHorizontal: 15,

    paddingVertical: 12,

    marginBottom: 10,
  },


  historyTextContainer: {
    flex: 1,

    marginRight: 10,
  },


  historyExpression: {
    color: '#AAAAAA',

    fontSize: 17,

    marginBottom: 3,
  },


  historyResult: {
    color: '#FFFFFF',

    fontSize: 22,

    fontWeight: '600',
  },


  historyDate: {
    color: '#777777',

    fontSize: 11,

    marginTop: 5,
  },


  deleteHistoryButton: {
    width: 45,

    height: 45,

    justifyContent: 'center',

    alignItems: 'center',

    borderRadius: 10,

    backgroundColor: '#333333',
  },


  deleteHistoryText: {
    fontSize: 20,
  },


  // ===========================================
  // EMPTY HISTORY
  // ===========================================

  emptyHistoryContainer: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    paddingTop: 100,
  },


  emptyHistory: {
    color: '#888888',

    fontSize: 17,

    textAlign: 'center',
  },


  // ===========================================
  // CLEAR HISTORY
  // ===========================================

  clearHistoryButton: {
    backgroundColor: '#333333',

    borderRadius: 14,

    paddingVertical: 15,

    alignItems: 'center',

    marginTop: 10,
  },


  clearHistoryText: {
    color: '#FFFFFF',

    fontSize: 16,

    fontWeight: '700',
  },

});


export default App;

