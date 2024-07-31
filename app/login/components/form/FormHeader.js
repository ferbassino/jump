import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const FormHeader = ({ heading, subHeading }) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={require("../../../../assets/adaptive-icon.png")}
        />
        <Text style={styles.heading}>{heading}</Text>
      </View>
      <Text style={styles.subHeading}>{subHeading}</Text>
    </>
  );
};

export default FormHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#0f0c2e",
  },
  subHeading: {
    fontSize: 22,
    color: "#0f0c2e",
    textAlign: "center",
  },
  tinyLogo: {
    width: 65,
    height: 65,
  },
});
