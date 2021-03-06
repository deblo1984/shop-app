import React, { useReducer, useCallback, useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Button,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";

const FORM_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Error occured", error, [{ text: "Ok" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("Home");
    } catch (err) {
      setError(err.message);

      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <View style={styles.screen}>
      <Card style={styles.authContainer}>
        <ScrollView style={styles.scrollContainer}>
          <Input
            id="email"
            label="Email"
            keyboardType="email-address"
            required
            email
            errorText="Enter a valid email address"
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorText="enter password"
            onInputChange={inputChangeHandler}
            initialValue=""
          />
        </ScrollView>
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <Button
              title={isSignup ? "Sign Up" : "Login"}
              color={Colors.primary}
              onPress={authHandler}
            />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text>OR</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
            color={Colors.accent}
            onPress={() => {
              setIsSignup((prevState) => !prevState);
            }}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    padding: 5,
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    padding: 10,
  },
});

export default AuthScreen;
