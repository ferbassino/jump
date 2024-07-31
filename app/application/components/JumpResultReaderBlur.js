import React from "react";
import { View, Text, StyleSheet } from "react-native";

const JumpResultReaderBlur = ({ time }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PROPULSIVE PHASE</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        (Power, Force, push-off-time, push-off-distance)
      </Text>
      <View>
        <Text style={[styles.text, styles.blur0]}>Push-off time: {time} s</Text>
        <Text style={[styles.text, styles.blur1]}>
          Push-off distance: 0.GG m{" "}
        </Text>
        <Text style={[styles.text, styles.blur2]}>Mean Force: 1559 N</Text>
        <Text style={[styles.text, styles.blur3]}>Mean power: 1237 W</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    // padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#232f62",
    marginBottom: 10,
  },

  text: {
    fontSize: 18,
    color: "#232f62",
    marginBottom: 10,
  },
  blur0: {
    color: "transparent",
    textShadowColor: "#232f62",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  blur1: {
    color: "transparent",
    textShadowColor: "#232f62",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 18,
  },
  blur2: {
    color: "transparent",
    textShadowColor: "#232f62",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 18,
  },
  blur3: {
    color: "transparent",
    textShadowColor: "#232f62",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 20,
  },
});

export default JumpResultReaderBlur;
