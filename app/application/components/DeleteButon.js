import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const DeleteButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  );
};

export default DeleteButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 4,
    marginBottom: 8,
  },
  textButton: {
    color: "#8f0000",
    fontSize: 20,
    fontWeight: "bold",
  },
});
