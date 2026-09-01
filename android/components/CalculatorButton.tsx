
import React from 'react';

import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

interface CalculatorButtonProps {
  title: string;

  onPress: (
    event: GestureResponderEvent,
  ) => void;

  flex?: number;

  variant?:
    | 'number'
    | 'operator'
    | 'function'
    | 'equals'
    | 'special';
}

const CalculatorButton: React.FC<
  CalculatorButtonProps
> = ({
  title,
  onPress,
  flex = 1,
  variant = 'number',
}) => {

  return (
    <TouchableOpacity
      style={[
        styles.button,

        { flex },

        variant === 'number' &&
          styles.numberButton,

        variant === 'operator' &&
          styles.operatorButton,

        variant === 'function' &&
          styles.functionButton,

        variant === 'equals' &&
          styles.equalsButton,

        variant === 'special' &&
          styles.specialButton,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >

      <Text
        style={styles.buttonText}
      >
        {title}
      </Text>

    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({

  button: {
    height: 55,

    margin: 3,

    justifyContent: 'center',

    alignItems: 'center',

    borderRadius: 12,
  },

  numberButton: {
    backgroundColor: '#333333',
  },

  operatorButton: {
    backgroundColor: '#FF9500',
  },

  functionButton: {
    backgroundColor: '#505050',
  },

  equalsButton: {
    backgroundColor: '#FF9500',
  },

  specialButton: {
    backgroundColor: '#666666',
  },

  buttonText: {
    fontSize: 20,

    color: '#FFFFFF',

    fontWeight: '500',
  },

});

export default CalculatorButton;



