import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Accelerometer } from "expo-sensors";
import StartButton from "../components/StartButton";
import { AntDesign } from "@expo/vector-icons";

import { Audio } from "expo-av";
import { useLogin } from "../../login/context/LoginProvider";

const TestCurrent = ({
  setAccData,
  testTimeInput,
  motionType,
  setLocalTestFinished,
}) => {
  const { setLoginPending, visible, setVisible } = useLogin();
  const [sound, setSound] = React.useState();
  async function startSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../sounds/start_4.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  async function stopSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../sounds/stop_1.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  Accelerometer.setUpdateInterval(10);
  const accDataXYZ = [];
  const startTestTime = 3000;
  const testTime = startTestTime + testTimeInput;
  const stopSoundTime = testTime - 1000;

  const startTest = () => {
    setLoginPending(true);
    startSound();
    setTimeout(() => {
      Accelerometer.addListener((accelerometerData) => {
        accDataXYZ.push(accelerometerData);
      });
    }, startTestTime);
    setTimeout(() => {
      setAccData(accDataXYZ);
      Accelerometer.removeAllListeners();
      setLoginPending(false);
      setLocalTestFinished(true);
    }, testTime);
    setTimeout(() => {
      stopSound();
    }, stopSoundTime);
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.text}>{motionType}</Text>
      <StartButton
        icon={<AntDesign name="playcircleo" size={150} color="#fff" />}
        title={"Start"}
        onPress={startTest}
      />
    </View>
  );
};

export default TestCurrent;

const styles = StyleSheet.create({
  title: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 26,
    fontWeight: "bold",
    color: "#1b1b33",
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontWeight: "bold",
    color: "#1b1b33",
    marginTop: 10,
    marginBottom: 5,
    fontSize: 28,
  },
});
