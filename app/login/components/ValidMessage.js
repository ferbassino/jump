import { StyleSheet, Text, View } from "react-native";
import React from "react";
import KinAppLinkButton from "../../application/components/KinAppLinkButton";

const ValidMessage = () => {
  return (
    <View style={{ flex: 1, marginTop: 200, marginHorizontal: 20 }}>
      <Text style={styles.subTitle}>Deprecated app</Text>
      <Text style={styles.subTitle}>
        Please for more information enter kinapp web
      </Text>
      <Text style={styles.subTitle}></Text>

      <KinAppLinkButton
        text={"kinApp web"}
        url={"https://kinappweb.vercel.app/"}
      />
    </View>
  );
};

export default ValidMessage;

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 24,
    color: "rgba(27,27,51,1)",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
});
