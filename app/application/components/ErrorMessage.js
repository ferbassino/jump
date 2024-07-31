import { StatusBar as expoStatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

const ErrorMessage = () => {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="close-circle-outline"
          size={200}
          color="red"
        />
        <Text style={styles.title}>¡Jump was not performed properly</Text>
        <Text style={styles.title}>please do it again!</Text>
      </View>
    </SafeAreaView>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: {
    fontSize: 28,
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
});
