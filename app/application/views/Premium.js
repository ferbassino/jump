import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { A } from "@expo/html-elements";
import { useLogin } from "../../login/context/LoginProvider";

const Premium = () => {
  const { visible, premiumMessageSubTitle } = useLogin();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: 20 }]}>
        {visible.premiumMessageSubTitle}
      </Text>
      <Text style={styles.title}>{visible.premiumMessageTitle}</Text>
      <View style={styles.imageRow}>
        <View style={[styles.imageContainer, styles.rotateCounterClockwise]}>
          <Image
            source={require("../../../assets/image1.jpeg")}
            style={styles.imageContainer}
          />
        </View>
        <View style={[styles.imageContainer, styles.rotateClockwise]}>
          <Image
            source={require("../../../assets/image2.jpeg")}
            style={styles.imageContainer}
          />
        </View>
      </View>
      <Text style={styles.text}>
        Get full access to the biomechanical analysis environment!
      </Text>
      <View style={styles.imageRow}>
        <View style={[styles.imageContainer, styles.rotateCounterClockwise]}>
          <Image
            source={require("../../../assets/image4.jpg")}
            style={styles.imageContainer}
          />
        </View>
        <View style={[styles.imageContainer, styles.rotateClockwise]}>
          <Image
            source={require("../../../assets/image3.jpeg")}
            style={styles.imageContainer}
          />
        </View>
      </View>
      <Text style={styles.text}>
        Go now to 👉
        <A
          href={"https://kinappweb.vercel.app/"}
          style={{ fontWeight: "bold" }}
        >
          {" "}
          kinApp
        </A>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // White background
    justifyContent: "center", // Center vertically
    // alignItems: "center", // Center horizontally
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1b1b33", // Dark blue color
    marginBottom: 5,
    textAlign: "center",
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 30,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",
  },
  rotateCounterClockwise: {
    transform: [{ rotate: "-15deg" }],
  },
  rotateClockwise: {
    transform: [{ rotate: "15deg" }],
  },
  text: {
    textAlign: "center",
    fontSize: 28,
    color: "#8f0000", // Dark red color
  },
});

export default Premium;
