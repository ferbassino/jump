import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { StackActions } from "@react-navigation/native";
import { useLogin } from "../../context/LoginProvider";
import {
  isValidEmail,
  isValidObjField,
  updateError,
} from "../../utils/methods";
import { signIn } from "../../../api/user";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";

const LoginForm = ({ navigation }) => {
  const {
    setIsLoggedIn,
    setProfile,
    setLoginPending,

    isVerified,
    setIsVerified,
  } = useLogin();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { email, password } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError("Required all fields!", setError);

    if (!isValidEmail(email)) return updateError("Invalid email!", setError);

    if (!password.trim() || password.length < 8)
      return updateError(
        "password must have at least eight characters",
        setError
      );

    return true;
  };

  const submitForm = async () => {
    setLoginPending(true);
    if (isValidForm()) {
      try {
        const res = await signIn(userInfo.email, userInfo.password);

        if (!res.data.success) {
          setError(res.data.message);
          setTimeout(() => {
            setError("");
          }, 3000);
        } else if (!res.data.user.verified) {
          setLoginPending(false);
          setError(
            "your profile is not verified yet, please check the email where we sent the verification number"
          );
          setTimeout(() => {
            navigation.dispatch(
              StackActions.replace("Verification", {
                profile: res.data.user,
              })
            );
            setError("");
          }, 5000);
        } else {
          if (res.data.success) {
            setUserInfo({ email: "", password: "" });
            setProfile(res.data.user);
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    setLoginPending(false);
  };

  const handleForgotPassword = () => {
    navigation.dispatch(StackActions.replace("ForgotPassword"));
  };

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: "red", fontSize: 20, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        value={email}
        onChangeText={(value) => handleOnChangeText(value, "email")}
        label="Email"
        placeholder="example@email.com"
        autoCapitalize="none"
      />
      <FormInput
        value={password}
        onChangeText={(value) => handleOnChangeText(value, "password")}
        label="Password"
        placeholder="********"
        autoCapitalize="none"
        secureTextEntry
      />
      <FormSubmitButton onPress={submitForm} title="Login" />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text onPress={handleForgotPassword} style={styles.forgotPassword}>
          Forgot password?
        </Text>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    justifyContent: "center",
    fontSize: 22,
    color: "#0f0c2e",
  },
});

export default LoginForm;
