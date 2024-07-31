import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useLogin } from "../login/context/LoginProvider";
import { Accelerometer } from "expo-sensors";
import HorizontalLine from "../login/components/HorizontalLine";
import JumpHeader from "./components/JumpHeader";
import { SelectList } from "react-native-dropdown-select-list";
import { jumpSelect, numbers } from "./auxiliaries/clientSelect";
import Test from "./views/Test";
import JumpResults from "./components/JumpResults";
import Button from "./components/Button";
import SearchClient from "./views/SearchClient";
import SaveNewClient from "./views/SaveNewClient";
import SaveOldClient from "./views/SaveOldClient";
import ErrorMessage from "./components/ErrorMessage";
import SaveDeviceDB from "./components/database/SaveDeviceDB";
import accelerationArrays from "./auxiliaries/accelerationArrays";
import LinkButton from "./components/LinkButton";
import Premium from "./views/Premium";
import SaveCurrentClient from "./views/SaveCurrentClient";

const Home = () => {
  const {
    profile,
    visible,
    setVisible,
    visibleOBJ,
    dataClientObj,
    setDataClientObj,
    initialDataClientObj,
    dataObj,
    setDataObj,
    initialDataObj,
    setCurrentClientProfile,
  } = useLogin();
  const userId = profile.id;
  const [email, setEmail] = useState("");
  const [accData, setAccData] = useState([]);
  const [testTimeInput, setTestTimeInput] = useState("");
  const [motionType, setMotionType] = useState("");
  const [weight, setWeight] = useState("");
  const [clientProfile, setClientProfile] = useState({});
  const [validated, setValidated] = useState(true);

  const permissions = async () => {
    const { status } = await Accelerometer.getPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, access to sensors is needed to perform measurements!");
    }
  };
  useEffect(() => {
    permissions();
  }, []);

  useEffect(() => {
    if (
      motionType === "free" ||
      motionType === "squat jump" ||
      motionType === "counter movement jump" ||
      motionType === "drop jump"
    ) {
      setTestTimeInput(6000);
      setVisible((prev) => ({
        ...prev,
        selectorWeight: true,
        selector: false,
      }));
    } else if (motionType === "stiffness") {
      setTestTimeInput(12000);
      setVisible((prev) => ({
        ...prev,
        selectorWeight: true,
        selector: false,
      }));
    }
  }, [motionType]);

  useEffect(() => {
    if (weight !== "") {
      setVisible((prev) => ({ ...prev, test: true, selectorWeight: false }));
    }
  }, [weight]);

  useEffect(() => {
    if (dataClientObj.email !== "") {
      setDataObj((prev) => ({
        ...prev,
        accData,
        testTimeInput,
        motionType,
      }));
    } else {
      setDataObj((prev) => ({
        ...prev,
        accData,
        testTimeInput,
        motionType,
        weight,
      }));
    }
  }, [accData, testTimeInput, weight, motionType]);

  useEffect(() => {
    if (visible.testFinished) {
      setVisible((prev) => ({
        ...prev,
        test: false,
        jumpResult: true,
        reTestButton: true,
      }));
    }
  }, [visible.testFinished]);

  const search = () => {
    if (profile.roles === "editor") {
      if (dataClientObj.email === "") {
        setVisible((prev) => ({
          ...prev,
          searchClient: true,
          test: false,
          selectorWeight: false,
          jumpResult: false,
          testFinished: false,
          selector: false,
          selectorWeight: false,
        }));
      } else {
        setVisible((prev) => ({
          ...prev,
          saveCurrentClient: true,
          test: false,
          selectorWeight: false,
          jumpResult: false,
          testFinished: false,
          selector: false,
          selectorWeight: false,
        }));
      }
    } else {
      handlePremiumSaveDB();
    }
  };

  const resetTest = () => {
    setDataClientObj(initialDataClientObj);
    setVisible(visibleOBJ);
    setValidated(true);
    setWeight("");
    setEmail("");
    setMotionType("");
    setAccData([]);
    setTestTimeInput("");
    setClientProfile({});
    setCurrentClientProfile({});
  };
  useEffect(() => {
    visible.saveNewClient
      ? setVisible((prev) => ({ ...prev, searchClient: false }))
      : null;
  }, [visible.saveNewClient]);
  useEffect(() => {
    visible.saveOldClient
      ? setVisible((prev) => ({ ...prev, searchClient: false }))
      : null;
  }, [visible.saveOldClient]);

  useEffect(() => {
    if (!validated) {
      setVisible((prev) => ({
        ...prev,
        errorValidation: true,
        test: false,
        reTestButton: false,
      }));

      setTimeout(() => {
        resetTest();
      }, 5000);
    }
  }, [validated]);

  const handleDatabase = () => {
    setVisible((prev) => ({
      ...prev,
      saveDevice: true,
      jumpResult: false,
      test: false,
      selectorWeight: false,
      selector: false,
      testFinished: false,
    }));
  };

  const handleStorage = () => {
    setVisible((prev) => ({
      ...prev,
      saveDevice: true,
      selector: false,
      reTestButton: true,
    }));
  };
  const { accX, accY, accZ } = accelerationArrays(accData, testTimeInput);

  useEffect(() => {
    if (
      (profile.roles !== "editor" && motionType === "drop jump") ||
      (profile.roles !== "editor" && motionType === "stiffness")
    ) {
      setVisible((prev) => ({ ...prev, premium: true }));
      setTimeout(() => {
        setVisible((prev) => ({ ...prev, premium: false }));
        resetTest();
      }, 8000);
    }
  }, [motionType]);
  useEffect(() => {
    if (
      (profile.roles !== "editor" && motionType === "drop jump") ||
      (profile.roles !== "editor" && motionType === "stiffness")
    ) {
      setVisible((prev) => ({
        ...prev,
        premium: true,
        premiumMessageTitle:
          "Become a full kinApp user and evaluate more jumps",
        premiumMessageSubTitle: `you need permissions to evaluate the ${motionType}`,
      }));
      setTimeout(() => {
        setVisible((prev) => ({
          ...prev,
          premium: false,
          premiumMessageTitle: "",
          premiumMessageSubTitle: "",
        }));
      }, 8000);
    }
  }, [motionType]);

  const handlePremiumSaveDB = () => {
    setVisible((prev) => ({
      ...prev,
      premium: true,
      premiumMessageTitle: "be a full kinApp user and don't miss your tests",
      premiumMessageSubTitle: "You need permissions to store in the database",
    }));
    setTimeout(() => {
      setVisible((prev) => ({
        ...prev,
        premium: false,
        premiumMessageTitle: "",
        premiumMessageSubTitle: "",
      }));
    }, 6000);
  };

  const handleSaveCurrent = () => {
    setVisible((prev) => ({
      ...prev,
      saveCurrentClient: true,
      selector: false,
    }));
  };

  return (
    <ScrollView>
      {visible.premium ? (
        <>
          <Premium />
        </>
      ) : (
        <>
          <JumpHeader heading="jump" subHeading="by kinApp" />
          <HorizontalLine />
          {visible.saveDevice ? (
            <>
              <SaveDeviceDB
                email={email}
                weight={weight}
                motionType={motionType}
                testTimeInput={testTimeInput}
                accY={accY}
                setValidated={setValidated}
              />
            </>
          ) : null}

          {visible.searchClient ? (
            <>
              <SearchClient
                userId={userId}
                dataObj={dataObj}
                setEmail={setEmail}
                email={email}
                setClientProfile={setClientProfile}
              />
            </>
          ) : null}
          {visible.saveNewClient ? (
            <>
              <SaveNewClient userId={userId} dataObj={dataObj} email={email} />
            </>
          ) : null}
          {visible.saveOldClient ? (
            <>
              <SaveOldClient
                userId={userId}
                dataObj={dataObj}
                clientProfile={clientProfile}
                email={email}
              />
            </>
          ) : null}
          {visible.saveCurrentClient ? (
            <>
              <SaveCurrentClient
                userId={userId}
                dataObj={dataObj}
                email={email}
                clientProfile={clientProfile}
              />
            </>
          ) : null}
          <View>
            {visible.selector ? (
              <>
                <Text style={styles.title}>Hello {profile.userName}!</Text>
                <View style={{ marginBottom: 15 }}>
                  <View style={{ marginHorizontal: 15 }}>
                    <Text style={styles.text}>Jump type</Text>

                    <SelectList
                      setSelected={setMotionType}
                      data={jumpSelect}
                      save="value"
                      placeholder="select"
                      // defaultOption={"Axial"}
                      boxStyles={{ borderRadius: 3 }}
                      inputStyles={{ fontSize: 20 }}
                      dropdownTextStyles={{ fontSize: 20 }}
                    />
                  </View>
                  {dataObj.motionType !== "" ? (
                    <Text style={styles.title}>
                      Selected jump: {dataObj.motionType}
                    </Text>
                  ) : null}

                  <View style={{ marginTop: 100, marginBottom: 50 }}>
                    <Button title={"STORED TESTS"} onPress={handleStorage} />
                  </View>
                  <LinkButton
                    text="kinApp WEB"
                    url="https://kinappweb.vercel.app"
                  />
                </View>
              </>
            ) : null}
            {visible.selectorWeight ? (
              <>
                <View style={{ marginBottom: 15, marginHorizontal: 15 }}>
                  <Text style={styles.text}>Weight</Text>
                  <SelectList
                    setSelected={setWeight}
                    data={numbers}
                    save="value"
                    placeholder="Select"
                    // defaultOption={"Axial"}
                    boxStyles={{ borderRadius: 0 }}
                    inputStyles={{ fontSize: 20 }}
                    dropdownTextStyles={{ fontSize: 20 }}
                  />
                </View>
              </>
            ) : null}

            {visible.test ? (
              <>
                <Test
                  setAccData={setAccData}
                  testTimeInput={testTimeInput}
                  motionType={motionType}
                />
              </>
            ) : null}
            {visible.jumpResult ? (
              <>
                {visible.errorValidation ? (
                  <>
                    <ErrorMessage />
                  </>
                ) : (
                  <>
                    <JumpResults
                      accY={accY}
                      testTimeInput={testTimeInput}
                      motionType={motionType}
                      weight={weight}
                      setValidated={setValidated}
                    />

                    <Button title="SAVE TO DEVICE" onPress={handleDatabase} />

                    <View style={{ marginVertical: 30 }}></View>
                    {dataClientObj.email === "" ? (
                      <Button title={"SAVE TO DATABASE"} onPress={search} />
                    ) : (
                      <Button
                        title={`SAVE DB TO ${dataClientObj.email}`}
                        onPress={handleSaveCurrent}
                      />
                    )}
                  </>
                )}
              </>
            ) : null}

            <View style={{ marginVertical: 5 }}></View>
          </View>
        </>
      )}
      {visible.reTestButton ? (
        <View style={{ marginTop: 60 }}>
          <Button title={"DELETE ALL / HOME"} onPress={resetTest} />
        </View>
      ) : null}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
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
