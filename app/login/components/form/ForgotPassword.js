import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import FormContainer from "./FormContainer";
import FormSubmitButton from "./FormSubmitButton";
import FormInput from "./FormInput";
import { StackActions } from "@react-navigation/native";
import client from "../../../api/client";
import AppLoader from "../loader/AppLoader";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successfullyMesage, setSuccessfullyMessage] = useState("");
  const [loginPending, setLoginPending] = useState(false);

  const onChangeText = (value) => {
    setEmail(value);
  };

  const handleSubmit = async () => {
    try {
      if (!email) {
        setError("you must enter an email");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
      setLoginPending(true);
      const res = await client.post("/forgot-password", { email });

      if (!res.data.success) {
        setLoginPending(false);
        setError(res.data.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
      if (res.data.success) {
        setLoginPending(false);
        setSuccess(true);
        setSuccessfullyMessage(
          "We have sent to your email the link to reset your password"
        );
        setTimeout(() => {
          setSuccess(false);
          navigation.dispatch(StackActions.replace("AppForm"));
          setSuccessfullyMessage("");
        }, 5000);
      }
    } catch (error) {
      setLoginPending(false);
      console.log(error.message);
    }
  };
  const handleLogin = async (email) => {
    navigation.dispatch(StackActions.replace("AppForm"));
  };

  return (
    <>
      <FormContainer>
        {success ? (
          <>
            {successfullyMesage && (
              <Text style={styles.title}>{successfullyMesage}</Text>
            )}
          </>
        ) : (
          <>
            <Text style={styles.title}>Enter your email to reset password</Text>
            {error ? (
              <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
                {error}
              </Text>
            ) : null}
            <FormInput
              value={email}
              onChangeText={(value) => onChangeText(value, "email")}
              placeholder="example@email.com"
              autoCapitalize="none"
            />

            <FormSubmitButton onPress={handleSubmit} title="Send link" />
            <View style={styles.textContainer}>
              <Text onPress={handleLogin} style={styles.text}>
                Login / Sign up
              </Text>
            </View>
          </>
        )}
      </FormContainer>
      {loginPending && <AppLoader />}
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  text: {
    fontSize: 22,
    color: "#0f0c2e",
  },
  title: {
    marginBottom: 10,
    marginTop: 150,
    fontSize: 26,
    color: "#0f0c2e",
  },
  input: {
    borderWidth: 1,
    borderColor: "#0f0c2e",
    height: 35,
    borderRadius: 0,
    fontSize: 20,
    paddingLeft: 10,
    marginBottom: 20,
  },
});
