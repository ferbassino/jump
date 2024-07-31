import { View } from "react-native";
import React, { useState } from "react";
import { EnhancedButton } from "react-native-confirm-dialog";

const Props = {
  onCompleted: () => {},
  dismiss: () => {},
};

const styles = {
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  topButton: {
    marginBottom: 12,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  notNow: {
    borderColor: "black",
    flex: 2,
  },

  blackLabel: {
    color: "black",
  },
};

const CustomActions = ({ dismiss, onCompleted }) => {
  const [loading, setLoading] = useState(false);

  const handleAgreed = () => {
    setLoading(true);
    setTimeout(() => {
      onCompleted();
      setLoading(false);
      dismiss();
    }, 1000);
  };

  return (
    <>
      <EnhancedButton
        loading={loading}
        style={styles.topButton}
        labelStyle={styles.label}
        onPress={handleAgreed}
      >
        Delete
      </EnhancedButton>
      <View style={styles.bottomButtons}>
        <EnhancedButton inverse onPress={dismiss} style={styles.notNow}>
          Cancel
        </EnhancedButton>
      </View>
    </>
  );
};

export default CustomActions;
