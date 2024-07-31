import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import { StackActions } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import client from "../../../api/client";
import { useLogin } from "../../context/LoginProvider";
import { signIn } from "../../../api/user";

const validationSchema = Yup.object({
  userName: Yup.string()
    .trim()
    .min(3, "Invalid username!")
    .required("Username is required!"),
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string()
    .trim()
    .min(8, "password must have at least eight characters!")
    .required("Password is required!"),
  confirmPassword: Yup.string().equals(
    [Yup.ref("password"), null],
    "Password does not match!"
  ),
});

const SignupForm = ({ navigation }) => {
  const userInfo = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [error, setError] = useState("");

  const { setLoginPending } = useLogin();

  const signUp = async (values, formikActions) => {
    try {
      setLoginPending(true);
      const response = await client.post("/create-user", {
        ...values,
      });

      if (response.data.success) {
        const signInRes = await signIn(values.email, values.password);
        if (signInRes.data.success) {
          navigation.dispatch(
            StackActions.replace("Verification", {
              profile: signInRes.data.user,
            })
          );
        }
      }
      if (!response.data.success) {
        setLoginPending(false);
        setError(response.data.message);
        setTimeout(() => {
          setError("");
        }, 4000);
      }
      formikActions.resetForm();
      formikActions.setSubmitting(false);
      setLoginPending(false);
    } catch (error) {
      if (error?.response?.data) {
        return error.response.data;
      }
      return { success: false, error: error.message };
    }
  };

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { userName, email, password, confirmPassword } = values;

          return (
            <>
              <FormInput
                value={userName}
                error={touched.userName && errors.userName}
                onChangeText={handleChange("userName")}
                onBlur={handleBlur("userName")}
                label="username"
                placeholder="example"
              />
              <FormInput
                value={email}
                error={touched.email && errors.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                autoCapitalize="none"
                label="Email"
                placeholder="example@email.com"
              />
              <FormInput
                value={password}
                error={touched.password && errors.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                autoCapitalize="none"
                secureTextEntry
                label="Password"
                placeholder="********"
              />
              <FormInput
                value={confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                autoCapitalize="none"
                secureTextEntry
                label="Confirm Password"
                placeholder="********"
              />
              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title="Sign up"
              />
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default SignupForm;
