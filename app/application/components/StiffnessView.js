import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HorizontalLine from "../../login/components/HorizontalLine";
import HorizontalLine2 from "../../login/components/HorizontalLine2";

const StiffnessView = ({ stiffnessData }) => {
  return (
    <View style={{ marginHorizontal: 10 }}>
      <View style={styles.timesContainer}>
        <Text style={styles.text}>Stiffness: [kN/m]</Text>
        <Text style={{ color: "#8f0000" }}>:</Text>
        <Text style={styles.text}>
          {(stiffnessData.stiffness / 1000).toFixed(2)}
        </Text>
      </View>
      <HorizontalLine />
      <View style={styles.timesContainer}>
        <Text style={styles.text}>Frequency: [Hertz]</Text>
        <Text style={{ color: "#8f0000" }}>:</Text>
        <Text style={styles.text}>{stiffnessData.frequency.toFixed(2)}</Text>
      </View>

      <HorizontalLine />
      <View style={styles.timesContainer}>
        <Text style={styles.timeText}>Flight time [s]</Text>
        <Text style={{ color: "#8f0000" }}>|</Text>
        <Text style={styles.timeText}>Contact time [s]</Text>
      </View>
      <HorizontalLine2 />
      <View style={styles.timesContainer}>
        <Text style={styles.timeText}>{stiffnessData.tV23.toFixed(3)} </Text>
        <Text style={{ color: "#8f0000" }}>|</Text>
        <Text style={styles.timeText}>{stiffnessData.tC34.toFixed(3)} </Text>
      </View>
      <HorizontalLine2 />

      <View style={styles.timesContainer}>
        <Text style={styles.timeText}>{stiffnessData.tV45.toFixed(3)} </Text>
        <Text style={{ color: "#8f0000" }}>|</Text>
        <Text style={styles.timeText}>{stiffnessData.tC56.toFixed(3)} </Text>
      </View>
      <HorizontalLine2 />

      <View style={styles.timesContainer}>
        <Text style={styles.timeText}>{stiffnessData.tV67.toFixed(3)} </Text>
        <Text style={{ color: "#8f0000" }}>|</Text>
        <Text style={styles.timeText}>{stiffnessData.tC78.toFixed(3)} </Text>
      </View>

      <HorizontalLine2 />
      <View style={styles.timesContainer}>
        <Text style={styles.timeText}>{stiffnessData.tV89.toFixed(3)} </Text>
        <Text style={{ color: "#8f0000" }}>|</Text>
        <Text style={styles.timeText}>{stiffnessData.tC910.toFixed(3)} </Text>
      </View>
      <HorizontalLine2 />

      <View style={styles.timesContainer}>
        <Text style={styles.timeText}>{stiffnessData.tV1011.toFixed(3)} </Text>
        <Text style={{ color: "#8f0000" }}>|</Text>
        <Text style={styles.timeText}>{stiffnessData.tC1112.toFixed(3)} </Text>
      </View>
      <HorizontalLine />
    </View>
  );
};

export default StiffnessView;

const styles = StyleSheet.create({
  text: {
    // justifyContent: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#232f62",
    margin: 1,
    // textAlign: "center",
  },
  timeText: {
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#232f62",
    margin: 1,
  },
  timesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 36,
    borderRadius: 5,
  },
});
