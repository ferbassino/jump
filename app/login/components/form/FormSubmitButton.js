import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const FormSubmitButton = ({ title, submitting, onPress }) => {
  const backgroundColor = submitting
    ? "rgba(143, 0, 0,0.4)"
    : "rgba(143, 0, 0,1)";
  return (
    <TouchableOpacity
      onPress={!submitting ? onPress : null}
      style={[styles.container, { backgroundColor }]}
    >
      <Text style={{ fontSize: 20, color: "#fff" }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FormSubmitButton;

const styles = StyleSheet.create({
  container: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
});
