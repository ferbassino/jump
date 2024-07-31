import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const JumpHeader = ({ heading, subHeading }) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={require("../../../assets/adaptive-icon.png")}
        />
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
    </>
  );
};

export default JumpHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
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
