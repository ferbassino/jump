import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import client from "../../api/client";

import Button from "../components/Button";
import { getAge } from "../auxiliaries/getAge";

import SuccessSaved from "../components/SuccessSaved";
import ErrorSaved from "../components/ErrorSaved";
import { useLogin } from "../../login/context/LoginProvider";
import HorizontalLine from "../../login/components/HorizontalLine";

const SaveOldClient = ({ userId, clientProfile, email }) => {
  const {
    setLoginPending,
    dataObj,
    setDataObj,
    dataClientObj,
    setVisible,
    currentClientProfile,
    setCurrentClientProfile,
  } = useLogin();

  const [successSaved, setSuccessSaved] = useState(false);
  const [errorSaved, setErrorSaved] = useState(false);
  const [localOldVisible, setLocalOldVisible] = useState(true);

  const age = getAge(currentClientProfile.birthDate);

  const saveDb = async () => {
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
        userId,
        clientId: currentClientProfile.clientId,
      });

      if (res.data.success) {
        setSuccessSaved(true);
        setVisible((prev) => ({
          ...prev,
          reTestButton: false,
        }));
        setTimeout(() => {
          setSuccessSaved(false);
          setVisible((prev) => ({
            ...prev,
            reTestButton: true,
            saveCurrentClient: true,
            saveOldClient: false,
          }));
        }, 4000);
      } else {
        setErrorSaved(true);
        setVisible((prev) => ({
          ...prev,
          reTestButton: false,
        }));
        setTimeout(() => {
          setErrorSaved(false);
          setVisible((prev) => ({
            ...prev,
            reTestButton: true,
          }));
        }, 4000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoginPending(false);
    }
  };
  const handleReTest = () => {
    setLocalOldVisible(false);
    setVisible((prev) => ({
      ...prev,
      saveCurrentClient: true,
      SaveOldClient: false,
    }));
    setDataObj((prev) => ({
      ...prev,
      accData: [],
      testTimeInput: "",
      motionType: "",
    }));
  };

  const handleComeBackCurrentTest = () => {
    setVisible((prev) => ({
      ...prev,
      saveOldClient: false,
      jumpResult: true,
    }));
  };
  return (
    <>
      {successSaved ? (
        <SuccessSaved />
      ) : (
        <>
          {errorSaved ? (
            <ErrorSaved />
          ) : (
            <>
              {localOldVisible ? (
                <View style={styles.container}>
                  <Text style={styles.title}>save data for</Text>
                  <Text style={styles.subTitle}>
                    {currentClientProfile.email}
                  </Text>

                  <HorizontalLine />
                  <View style={styles.buttonContainer}>
                    <Button title={"SAVE DB"} onPress={saveDb} />
                    <View style={{ marginVertical: 20 }}></View>
                    <Button title={`RETEST ${email}`} onPress={handleReTest} />
                    <View style={{ marginTop: 60 }}>
                      <Button
                        title={"GO BACK TEST"}
                        onPress={handleComeBackCurrentTest}
                      />
                    </View>
                  </View>
                </View>
              ) : null}
            </>
          )}
        </>
      )}
    </>
  );
};

export default SaveOldClient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  textPermissionRole: {
    textAlign: "justify",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fc000d",
    marginTop: 10,
    marginBottom: 5,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  text: {
    fontWeight: "bold",
    color: "#1b1b33",
    marginTop: 10,
    marginBottom: 5,
  },
});
