import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const StartButton = ({ icon, title, onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.cardContainer}>
          <View
            style={{
              flex: 0.8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {icon}
          </View>
          <View style={{ flex: 0.2, alignItems: "center" }}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StartButton;

const styles = StyleSheet.create({
  cardContainer: {
    height: 250,
    width: 250,
    backgroundColor: "#02a607",
    borderRadius: 8,
    borderColor: "#018c22",
    borderWidth: 3,
    margin: 20,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
});
