import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import React from "react";

const FormSelectorBtn = ({ title, backgroundColor, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default FormSelectorBtn;

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: "50%",
    backgroundColor: "rgba(15,12,46,1)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: { color: "white", fontSize: 16 },
});
