import React, { useState } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/UI/Card";
import * as authActions from "../store/actions/auth";
import * as authSelector from "../store/selectors/auth";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(2, "Too Short!").required("Required"),
});

const AuthScreen = () => {
  const [isSignup, setIsSignup] = useState(false);
  const authLoading = useSelector(authSelector.getLoading);
  const authError = useSelector(authSelector.getError);
  const dispatch = useDispatch();

  const authHandler = async ({ email, password }) => {
    let action;
    if (isSignup) {
      action = authActions.signup(email, password);
    } else {
      action = authActions.login(email, password);
    }

    try {
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={10}
        style={styles.screen}
      >
        <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
          <Card style={styles.authContainer}>
            <ScrollView>
              <Formik
                initialValues={{ email: "test@test.com", password: "testtest" }}
                onSubmit={authHandler}
                validationSchema={SignupSchema}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                }) => (
                  <View>
                    <Text style={{ paddingBottom: 10 }}>Email</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      autoCapitalize="none"
                    />
                    {errors.email && (
                      <Text style={styles.error}>{errors.email}</Text>
                    )}
                    <Text style={{ paddingVertical: 10 }}>Password</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      autoCapitalize="none"
                      secureTextEntry={true}
                    />
                    {errors.password && (
                      <Text style={styles.error}>{errors.password}</Text>
                    )}

                    {authLoading ? (
                      <View
                        style={{
                          marginTop: 20,
                        }}
                      >
                        <ActivityIndicator size="small" color="black" />
                      </View>
                    ) : (
                      <View
                        style={{
                          marginTop: 20,
                        }}
                      >
                        <Button
                          onPress={handleSubmit}
                          title={isSignup ? "Sign Up" : "Login"}
                        />
                      </View>
                    )}
                    {authError && (
                      <Text style={{ ...styles.error, textAlign: "center" }}>
                        {authError.message}
                      </Text>
                    )}
                  </View>
                )}
              </Formik>
              <View style={styles.buttonContainer}>
                <Button
                  title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                  onPress={() => {
                    setIsSignup((prevState) => !prevState);
                  }}
                />
              </View>
            </ScrollView>
          </Card>
        </LinearGradient>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export const screenOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 30,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  error: {
    fontSize: 12,
    color: "red",
    marginBottom: 5,
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
