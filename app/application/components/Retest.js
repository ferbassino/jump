import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";

import { useLogin } from "../../login/context/LoginProvider";
import { Accelerometer } from "expo-sensors";

import { SelectList } from "react-native-dropdown-select-list";
import { jumpSelect } from "../auxiliaries/clientSelect";
import JumpResults from "./JumpResults";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";
import accelerationArrays from "../auxiliaries/accelerationArrays";
import TestCurrent from "../views/TestCurrent";

const Retest = ({ setButtonsVisible }) => {
  const {
    visible,
    setVisible,
    visibleOBJ,
    dataClientObj,
    setDataClientObj,
    initialDataClientObj,
    dataObj,
    setDataObj,
    initialDataObj,
  } = useLogin();

  const [accData, setAccData] = useState([]);
  const [testTimeInput, setTestTimeInput] = useState("");
  const [motionType, setmotionType] = useState("");
  const [localSelectorVisible, setLocalSelectorVisible] = useState(true);
  const [localTestVisible, setLocalTestVisible] = useState(false);
  const [localJumpResultVisible, setLocalJumpResultVisible] = useState(false);
  const [localTestFinished, setLocalTestFinished] = useState(false);

  useEffect(() => {
    if (
      motionType === "free" ||
      motionType === "squat jump" ||
      motionType === "counter movement jump" ||
      motionType === "drop jump"
    ) {
      setTestTimeInput(6000);
      setLocalTestVisible(true);
      setLocalSelectorVisible(false);
    } else if (motionType === "stiffness") {
      setTestTimeInput(12000);
      setLocalSelectorVisible(false);
    }
    setDataObj((prev) => ({
      ...prev,
      accData,
      testTimeInput,
      motionType: motionType,
    }));
  }, [motionType, accData, testTimeInput]);

  console.log("-----------------retest current----------------------");
  console.log("dataClientObj");
  console.log(dataClientObj);
  console.log("accData", dataObj.accData.length);
  console.log("testTime", dataObj.testTimeInput);
  console.log("weight", dataObj.weight);
  console.log("motion", dataObj.motionType);
  console.log("-------------------------------------------");

  useEffect(() => {
    if (localTestFinished) {
      setLocalJumpResultVisible(true);
      setLocalTestVisible(false);
    }
  }, [localTestFinished]);

  const resetTest = () => {
    setDataClientObj(initialDataClientObj);
    setVisible(visibleOBJ);
    // setValidated(true);
    setWeight("");
    setEmail("");
    setmotionType("");
    setAccData([]);
    setTestTimeInput("");
  };

  const { accX, accY, accZ } = accelerationArrays(accData, testTimeInput);

  return (
    <View>
      <View style={{ marginBottom: 15 }}>
        {localSelectorVisible ? (
          <>
            <View style={{ marginHorizontal: 15 }}>
              <Text style={styles.text}>Jump type</Text>
              <SelectList
                setSelected={setmotionType}
                data={jumpSelect}
                save="value"
                placeholder="select"
                // defaultOption={"Axial"}
                boxStyles={{ borderRadius: 0 }}
                inputStyles={{ fontSize: 20 }}
                dropdownTextStyles={{ fontSize: 18 }}
              />
            </View>
          </>
        ) : null}
      </View>
      {localTestVisible ? (
        <>
          <TestCurrent
            setAccData={setAccData}
            testTimeInput={testTimeInput}
            motionType={motionType}
            setLocalTestFinished={setLocalTestFinished}
          />
          {/* <View style={{ marginHorizontal: 10, marginTop: 80 }}>
            <Button title={"New Test"} onPress={resetTest} />
          </View> */}
        </>
      ) : null}
      {localJumpResultVisible ? (
        <>
          <JumpResults
            accY={accY}
            testTimeInput={testTimeInput}
            motionType={motionType}
            weight={dataObj.weight}
            // setValidated={setValidated}
          />
        </>
      ) : null}

      <View style={{ marginVertical: 5 }}></View>
    </View>
  );
};

export default Retest;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "rgba(27,27,51,1)",
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 20,
    color: "rgba(27,27,51,1)",
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitle2: {
    fontSize: 20,
    color: "rgba(27,27,51,1)",
    fontWeight: "bold",
    marginTop: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  cardsContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    fontWeight: "bold",
    color: "#1b1b33",
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
  },
});
