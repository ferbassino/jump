import { StatusBar as expoStatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

const SuccessSaved = () => {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={200}
          color="green"
        />
        <Text style={styles.title}>¡data was successfully</Text>
        <Text style={styles.title}>saved in database!</Text>
      </View>
    </SafeAreaView>
  );
};

export default SuccessSaved;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 28, color: "green", fontWeight: "bold" },
});
