import { StyleSheet, Text, View, ScrollView } from "react-native";
import client from "../../api/client";
import Button from "../components/Button";
import { getAge } from "../auxiliaries/getAge";

import SuccessSaved from "../components/SuccessSaved";
import ErrorSaved from "../components/ErrorSaved";
import Retest from "../components/Retest";
import React, { useState, useEffect } from "react";
import { useLogin } from "../../login/context/LoginProvider";
import { Accelerometer } from "expo-sensors";
import { SelectList } from "react-native-dropdown-select-list";
import { jumpSelect } from "../auxiliaries/clientSelect";
import JumpResults from "../components/JumpResults";
import ErrorMessage from "../components/ErrorMessage";

import accelerationArrays from "../auxiliaries/accelerationArrays";
import TestCurrent from "../views/TestCurrent";

const SaveCurrentClient = (userId, email) => {
  const {
    setDataClientObj,
    initialDataClientObj,
    visibleOBJ,
    setLoginPending,
    dataClientObj,
    setDataObj,
    dataObj,
    visible,
    setVisible,
    initialDataObj,
    currentClientProfile,
    setCurrentClientProfile,
  } = useLogin();
  const [error, setError] = useState("");
  const [localVisible, setLocalVisible] = useState({
    errorSaved: false,
    successSaved: false,
  });
  const [buttonsVisible, setButtonsVisible] = useState(true);

  const [accData, setAccData] = useState([]);
  const [testTimeInput, setTestTimeInput] = useState("");
  const [motionType, setMotionType] = useState("");
  const [localSelectorVisible, setLocalSelectorVisible] = useState(true);
  const [localTestVisible, setLocalTestVisible] = useState(false);
  const [localJumpResultVisible, setLocalJumpResultVisible] = useState(false);
  const [localButtonVisible, setLocalButtonVisible] = useState(false);
  const [localTestFinished, setLocalTestFinished] = useState(false);
  const [localValidated, setLocalValidated] = useState(false);

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
      setLocalTestVisible(true);
      setLocalSelectorVisible(false);
    }
    setDataObj((prev) => ({
      ...prev,
      accData,
      testTimeInput,
      motionType: motionType,
    }));
  }, [motionType, accData, testTimeInput]);

  useEffect(() => {
    if (localTestFinished) {
      setLocalJumpResultVisible(true);
      setLocalButtonVisible(true);
      setLocalTestVisible(false);
    }
  }, [localTestFinished]);

  const { accX, accY, accZ } = accelerationArrays(accData, testTimeInput);

  const handleReTest = () => {
    setLocalSelectorVisible(true);
    setLocalJumpResultVisible(false);
    setLocalButtonVisible(false);
    setLocalTestFinished(false);
    setMotionType("");
    setDataObj((prev) => ({
      ...prev,
      accData: [],
      testTimeInput: "",
      motionType: "",
    }));
  };

  const age = getAge(currentClientProfile.birthDate);

  const saveCurrentClient = async () => {
    setLoginPending(true);
    try {
      const res = await client.post("/api/motion/create", {
        email: currentClientProfile.email,
        motionType: dataObj.motionType,
        accData: dataObj.accData,
        testTime: dataObj.testTimeInput,
        weight: dataObj.weight,
        size: currentClientProfile.size,
        gender: currentClientProfile.gender,
        age,
        userId: currentClientProfile.userId,
        clientId: currentClientProfile.clientId,
      });
      if (res.data.success) {
        setVisible((prev) => ({ ...prev, successSaved: true }));
        handleReTest();
        setTimeout(() => {
          setVisible((prev) => ({ ...prev, successSaved: false }));
        }, 4000);
      } else {
        setVisible((prev) => ({
          ...prev,
          errorSaved: true,
        }));

        setTimeout(() => {
          setVisible((prev) => ({
            ...prev,
            errorSaved: false,
          }));
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setVisible((prev) => ({
        ...prev,
        errorSaved: false,
      }));
    } finally {
      setLoginPending(false);
    }
  };
  useEffect(() => {
    if (!localValidated) {
      setLocalValidated(false);
      setTimeout(() => {
        setLocalValidated(true);
        handleReTest();
      }, 5000);
    }
  }, [localValidated]);

  return (
    <ScrollView>
      {visible.successSaved ? (
        <>
          <SuccessSaved />
        </>
      ) : (
        <>
          {visible.errorSaved ? (
            <>
              <ErrorSaved />
            </>
          ) : (
            <>
              <View style={styles.container}>
                <View style={{ marginVertical: 5 }}></View>
                <Text style={styles.title}>Testing</Text>
                <Text style={styles.title}>{currentClientProfile.email} </Text>
                {localSelectorVisible ? (
                  <View style={{ marginBottom: 15 }}>
                    <View style={{ marginHorizontal: 15 }}>
                      <Text style={styles.text}>Jump type</Text>

                      <SelectList
                        setSelected={setMotionType}
                        data={jumpSelect}
                        save="value"
                        placeholder="select"
                        // defaultOption={"Axial"}
                        boxStyles={{ borderRadius: 0 }}
                        inputStyles={{ fontSize: 20 }}
                        dropdownTextStyles={{ fontSize: 20 }}
                        dropdownStyles={{
                          maxHeight: 300,
                        }}
                      />
                    </View>
                  </View>
                ) : null}
                {localTestVisible ? (
                  <>
                    <TestCurrent
                      setAccData={setAccData}
                      testTimeInput={testTimeInput}
                      motionType={motionType}
                      setLocalTestFinished={setLocalTestFinished}
                    />
                  </>
                ) : null}

                {localJumpResultVisible ? (
                  <>
                    {localValidated ? (
                      <>
                        <JumpResults
                          accY={accY}
                          testTimeInput={testTimeInput}
                          motionType={motionType}
                          weight={dataObj.weight}
                          setValidated={setLocalValidated}
                        />
                      </>
                    ) : (
                      <>
                        <ErrorMessage />
                      </>
                    )}
                  </>
                ) : null}

                {error ? (
                  <Text
                    style={{
                      color: "red",
                      fontSize: 20,
                      textAlign: "center",
                    }}
                  >
                    {error}
                  </Text>
                ) : null}
                {localButtonVisible ? (
                  <View style={styles.buttonContainer}>
                    <Button
                      title={`RETEST ${currentClientProfile.email}`}
                      onPress={handleReTest}
                    />
                    <View style={{ marginVertical: 30 }}></View>
                    <Button
                      title={`SAVE DB ${currentClientProfile.email}`}
                      onPress={saveCurrentClient}
                    />
                    <View style={{ marginVertical: 10 }}></View>
                  </View>
                ) : null}

                <View style={{ marginVertical: 20 }}></View>
              </View>
            </>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default SaveCurrentClient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#1b1b33",
  },
  subTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#1b1b33",
    marginTop: 10,
  },
  text: {
    fontWeight: "bold",
    color: "#1b1b33",
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
  },
  textPermissionRole: {
    textAlign: "justify",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fc000d",
    marginTop: 10,
    marginBottom: 5,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#0f0c2e",
    height: 35,
    borderRadius: 0,
    fontSize: 20,
    paddingLeft: 10,
    marginBottom: 20,
  },
});
