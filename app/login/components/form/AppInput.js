import { StyleSheet, TextInput } from "react-native";
import React from "react";

const AppInput = ({ value, placeholder, onChange, ...rest }) => {
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      style={styles.input}
      {...rest}
    />
  );
};

export default AppInput;

const styles = StyleSheet.create({
  input: {
    // width: width,
    borderWidth: 1,
    borderColor: "#0f0c2e",
    height: 35,
    borderRadius: 0,
    fontSize: 24,
    paddingLeft: 10,
    marginBottom: 20,
  },
});
