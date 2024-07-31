import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const FormInput = (props) => {
  const { placeholder, label, error } = props;

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{label}</Text>
        {error ? (
          <Text style={{ color: "red", fontSize: 20 }}>{error}</Text>
        ) : null}
      </View>
      <TextInput {...props} placeholder={placeholder} style={styles.input} />
    </>
  );
};

export default FormInput;

const styles = StyleSheet.create({
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
