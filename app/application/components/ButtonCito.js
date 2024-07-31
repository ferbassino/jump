import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const ButtonCito = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCito;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 30,
    backgroundColor: "#8f0000",
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 16,
  },
  textButton: {
    color: "#fff0f0",
    fontSize: 20,
    width: 60,
    textAlign: "center",
  },
});
