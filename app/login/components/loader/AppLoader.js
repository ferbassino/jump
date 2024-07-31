import { StyleSheet, View, ActivityIndicator } from "react-native";
import React from "react";
import Lottie from "lottie-react-native";

const AppLoader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <ActivityIndicator size="large" color="rgba(15,12,46,1)" />
    </View>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1,
  },
});
