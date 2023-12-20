import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import commonStyles from '../commonStyles.js';

// START OF REDUCER SETUP
const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

// END OF REDUCER SETUP

const AuthInput = (props) => {
  const { onInputChange, id, initialValue, initialValid } = props;

  const [inputState, dispatchInputState] = useReducer(inputReducer, {
    value: initialValue ? initialValue : '',
    isValid: initialValid ? initialValid : '',
    touched: false,
  });

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const onTextChangeHandler = (text) => {
    // TEXT VALIDATION HERE
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let updatedIsValid = true;

    if (props.required && text.trim().length === 0) {
      updatedIsValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      updatedIsValid = false;
    }
    if (props.min != null && +text < props.min) {
      updatedIsValid = false;
    }
    if (props.max != null && +text > props.max) {
      updatedIsValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      updatedIsValid = false;
    }

    dispatchInputState({
      type: INPUT_CHANGE,
      value: text,
      isValid: updatedIsValid,
    });
  };

  const onLostFocusHandler = () => {
    dispatchInputState({ type: INPUT_BLUR });
  };

  return (
    <View style={{ ...styles.inputContainer, ...props.style }}>
      <TextInput
        {...props}
        style={styles.input}
        placeholder={props.placeholder}
        value={inputState.value}
        onChangeText={onTextChangeHandler}
        onBlur={onLostFocusHandler}
        onEndEditing={onLostFocusHandler}
        onTouchEnd={onLostFocusHandler}
        onSubmitEditing={onLostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={{ ...commonStyles.text, ...styles.errorText }}>
            {props.errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginTop: 10,
  },

  input: {
    backgroundColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  errorContainer: {
    marginTop: 5,
    paddingLeft: 5,
  },

  errorText: {
    fontFamily: 'poppins-light',
    color: 'red',
    fontSize: 12,
  },
});

export default AuthInput;
