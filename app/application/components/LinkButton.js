import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { A } from "@expo/html-elements";

const LinkButton = ({ text, url }) => {
  return (
    <A style={styles.container} href={url}>
      <View style={styles.iconContainer}>
        <Image
          style={styles.tinyLogo}
          source={require("../../../assets/kinapp_icon.png")}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </A>
  );
};

export default LinkButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#8f0000",
    marginHorizontal: 15,
    borderRadius: 5,
    textAlign: "center",
    textAlignVertical: "center",
  },
  textContainer: {
    // flex: 1,
  },
  text: {
    color: "#fff0f0",
    fontSize: 20,
    fontWeight: "bold",
  },
  iconContainer: {
    // flex: 1,
    textAlign: "center",
  },
  tinyLogo: {
    marginRight: 20,
    width: 30,
    height: 30,
  },
});
