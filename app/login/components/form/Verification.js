import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { verifyEmail } from "../../utils/methods";
import { StackActions } from "@react-navigation/native";
import { useLogin } from "../../context/LoginProvider";
import AppLoader from "../loader/AppLoader";
const inputs = Array(4).fill("");
// let newInputIndex = 0;

const isObjValid = (obj) => {
  return Object.values(obj).every((value) => value.trim());
};

const Verification = ({ route, navigation }) => {
  const { profile } = route.params;

  const { token } = route.params.profile;
  const { loginPending, setLoginPending } = useLogin();
  const [error, setError] = useState("");
  const [OTP, setOTP] = useState({ 0: "", 1: "", 2: "", 3: "" });

  const handleOnChangeText = (text, index) => {
    const newOTP = { ...OTP };
    newOTP[index] = text;
    setOTP(newOTP);
  };

  const submitOTP = async () => {
    try {
      setLoginPending(true);
      Keyboard.dismiss();
      if (isObjValid(OTP)) {
        let val = "";
        Object.values(OTP).forEach((v) => {
          val += v;
        });

        const res = await verifyEmail(val, profile.id);

        if (!res) {
          setLoginPending(false);
          setError("Please, provide a valid token");
          setTimeout(() => {
            setError("");
          }, 3000);
        }

        navigation.dispatch(
          StackActions.replace("Home", {
            profile: res.data.user,
            token,
          })
        );
        setLoginPending(false);
      }
    } catch (error) {
      setLoginPending(false);
      console.log(error);
    }
  };
  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        {error ? (
          <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
            {error}
          </Text>
        ) : null}
        <Text style={styles.heading}>
          please check your email, PIN has been sent
        </Text>
        <View style={styles.otpContainer}>
          {inputs.map((input, index) => {
            return (
              <View key={index.toString()} style={styles.inputContainer}>
                <TextInput
                  value={OTP[index]}
                  onChangeText={(text) => handleOnChangeText(text, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  style={styles.input}
                  placeholder="0"
                  // ref={nextInputIndex === index ? input : null}
                />
              </View>
            );
          })}
        </View>
        <TouchableOpacity style={styles.submitIcon} onPress={submitOTP}>
          <Entypo name="check" size={24} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
      {loginPending ? <AppLoader /> : null}
    </>
  );
};
const { width } = Dimensions.get("window");
const inputWidth = Math.round(width / 6);
export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    color: "rgba(15,12,46,1)",
    textAlign: "center",
    marginBottom: 15,
    fontSize: 20,
  },
  inputContainer: {
    width: inputWidth,
    height: inputWidth,
    borderWidth: 2,
    borderColor: "rgba(15,12,46,1)",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontSize: 25,
    paddingHorizontal: 15,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: inputWidth / 2,
  },
  submitIcon: {
    alignSelf: "center",
    padding: 15,
    backgroundColor: "rgba(15,12,46,1)",
    borderRadius: 50,
    marginTop: 15,
  },
});
