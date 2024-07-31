import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    backgroundColor: "#8f0000",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  textButton: {
    color: "#fff0f0",
    fontSize: 20,
    fontWeight: "bold",
  },
});
