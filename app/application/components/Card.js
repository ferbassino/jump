import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const Card = ({ icon, title, link }) => {
  return (
    <View>
      <TouchableOpacity onPress={link}>
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
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    height: 140,
    width: 140,
    backgroundColor: "rgba(226,117,96,1)",
    borderRadius: 8,
    borderColor: "rgba(27,27,51,1)",
    margin: 20,
  },
});
