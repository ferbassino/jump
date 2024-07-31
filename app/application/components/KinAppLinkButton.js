import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { A } from "@expo/html-elements";

const KinAppLinkButton = ({ text, url }) => {
  return (
    <A style={styles.container} href={url}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>{text}</Text>
        <Image
          style={styles.tinyLogo}
          source={require("../../../assets/logo.png")}
        />
      </View>
    </A>
  );
};

export default KinAppLinkButton;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "rgba(226,117,96,1)",
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 10,
    textAlign: "center",
    textAlignVertical: "center",
  },
  text: {
    color: "rgba(27,27,51,1)",
    fontSize: 20,
    fontWeight: "bold",
  },
  tinyLogo: {
    width: 30,
    height: 36,
    marginHorizontal: 10,
  },
});
