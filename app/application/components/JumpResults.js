import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Chart from "./Chart";
import accelerationArrays from "../auxiliaries/accelerationArrays";
import jumpProcess from "../auxiliaries/jumpProcess";
import stiffnessAnalysis from "../auxiliaries/stiffnessAnalysis";
import dropJumpAnalysis from "../auxiliaries/dropJumpAnalysis";
import squatJumpAnalysis from "../auxiliaries/squatJumpAnalysis";
import freeJumpAnalysis from "../auxiliaries/freeJumpanalysis";
import HorizontalLine from "../../login/components/HorizontalLine";
import StiffnessView from "./StiffnessView";
import ErrorMessage from "./ErrorMessage";
import JumpResultReaderBlur from "./JumpResultReaderBlur";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useLogin } from "../../login/context/LoginProvider";
import Premium from "../views/Premium";

const JumpResults = ({
  accY = [],
  testTimeInput = 0,
  motionType = "",
  weight = 0,
  setValidated,
}) => {
  const initialJumpResults = {
    squatJump: false,
    cMJump: false,
    dropJump: false,
    stiffness: false,
  };
  const initialJmpDataObject = {
    arrayYF: [],
    xAxisArray: [],
    interval: 0,
    flightTime: 0,
    flightHeight: 0,
    takeoffSpeed: 0,
    dropSpeed: 0,
    contactTime: 0,
    flightTime2: 0,
    flightHeight2: 0,
    takeoffSpeed2: 0,
    stiffnessData: {},
    powerW: 0,
    force: 0,
    distanciaPropulsiva: 0,
    tiempoPropulsivo: 0,
    validation: false,
    arrayYCentral0F: [],
    stiffnessXAxis: [],
  };

  const [resultsVisible, setResultVisible] = useState(initialJumpResults);
  const [jumpDataObject, setJumpDataObject] = useState(initialJmpDataObject);

  const { visible, setVisible, profile, setLoginPending } = useLogin();

  useEffect(() => {
    switch (motionType) {
      case "free":
        const { freeArrayY1, freeXAxis, freeValidated } = freeJumpAnalysis(
          accY,
          testTimeInput,
          weight
        );
        setJumpDataObject((prev) => ({
          ...prev,
          arrayYF: freeArrayY1,
          xAxisArray: freeXAxis,
        }));
        setValidated(freeValidated);

        break;
      case "squat jump":
        const { sJDataObj } = squatJumpAnalysis(accY, testTimeInput, weight);

        setJumpDataObject((prev) => ({
          ...prev,
          arrayYF: sJDataObj.sJAccYFinal,
          xAxisArray: sJDataObj.xAxis,
          interval: sJDataObj.sJInterval,
          flightTime: sJDataObj.flightTime,
          flightHeight: sJDataObj.flightHeight,
          takeoffSpeed: sJDataObj.takeoffSpeed,
          powerW: sJDataObj.powerSJ,
          force: sJDataObj.fRMSJ,
          distanciaPropulsiva: sJDataObj.propulsiveDistanceSJ,
          tiempoPropulsivo: sJDataObj.propulsiveTimeSJ,
          validation: sJDataObj.validationSJ,
        }));
        setValidated(sJDataObj.validationSJ);
        setResultVisible((prev) => ({ ...prev, squatJump: true }));

        break;
      case "counter movement jump":
        const { cMJDataObject } = jumpProcess(accY, testTimeInput, weight);

        setJumpDataObject((prev) => ({
          ...prev,
          arrayYF: cMJDataObject.arrayY0F,
          xAxisArray: cMJDataObject.cMJXAxis,
          interval: cMJDataObject.cMjumpInterv,
          flightTime: cMJDataObject.tV,
          flightHeight: cMJDataObject.alturaVuelo,
          takeoffSpeed: cMJDataObject.velD,
          powerW: cMJDataObject.power,
          force: cMJDataObject.fRM,
          distanciaPropulsiva: cMJDataObject.propulsiveDistance,
          tiempoPropulsivo: cMJDataObject.propulsiveTime,
          validation: cMJDataObject.validation,
        }));
        setResultVisible((prev) => ({ ...prev, cMJump: true }));
        setValidated(cMJDataObject.validation);

        break;
      case "drop jump":
        const dJDataObject = dropJumpAnalysis(accY, testTimeInput, weight);

        setJumpDataObject((prev) => ({
          ...prev,
          arrayYF: dJDataObject.dropJumpAccY0F,
          xAxisArray: dJDataObject.dropJumpXAxis,
          interval: dJDataObject.interv,
          flightTime: dJDataObject.flightTime1,
          flightHeight: dJDataObject.flightHeight1,
          dropSpeed: dJDataObject.dropSpeed,
          contactTime: dJDataObject.contactTime,
          takeoffSpeed2: dJDataObject.takeoffSpeed2,
          flightHeight2: dJDataObject.flightHeight2,
          flightTime2: dJDataObject.flightTime2,
          powerW: dJDataObject.powerDJ,
          force: dJDataObject.fRMDJ,
          distanciaPropulsiva: dJDataObject.propulsiveDistanceDJ,
          tiempoPropulsivo: dJDataObject.propulsiveTimeDJ,
          validation: dJDataObject.validationDJ,
        }));

        setResultVisible((prev) => ({ ...prev, dropJump: true }));
        setValidated(dJDataObject.validationDJ);

        break;
      case "stiffness":
        const {
          stiffnessData,
          arrayYCentral0F,
          stiffnessXAxis,
          indexValidation,
        } = stiffnessAnalysis(accY, testTimeInput, weight);
        setJumpDataObject((prev) => ({
          ...prev,
          stiffnessData,
          arrayYCentral0F,
          stiffnessXAxis,
          validation: indexValidation,
        }));
        setResultVisible((prev) => ({ ...prev, stiffness: true }));
        setJumpDataObject((prev) => ({
          ...prev,
          arrayYF: arrayYCentral0F,
          xAxisArray: stiffnessXAxis,
        }));
        setValidated(indexValidation);

        break;
    }
  }, []);
  const handlePremiumPropulsive = () => {
    setVisible((prev) => ({
      ...prev,
      premium: true,
      premiumMessageTitle:
        "Be a full kinApp user and perform more complete analyzes",
      premiumMessageSubTitle:
        "You must have permissions to analyze dynamic data (power, force, propulsive distance and propulsive time)",
    }));
    setTimeout(() => {
      setVisible((prev) => ({
        ...prev,
        premium: false,
        premiumMessageTitle: "",
        premiumMessageSubTitle: "",
      }));
    }, 8000);
  };

  return (
    <>
      <>
        <View style={{ marginHorizontal: 10 }}>
          <Text style={styles.title}>{motionType}</Text>
          {resultsVisible.stiffness ? (
            <>
              <StiffnessView stiffnessData={jumpDataObject.stiffnessData} />
            </>
          ) : (
            <>
              {resultsVisible.dropJump ? (
                <>
                  <Text style={styles.subTitle}>DROP</Text>
                  <Text style={styles.text}>
                    Height: {jumpDataObject.flightHeight.toFixed(2)} m
                  </Text>
                  <Text style={styles.text}>
                    Drop time: {jumpDataObject.flightTime.toFixed(2)} s
                  </Text>
                  <Text style={styles.text}>
                    Touch down velocity: {jumpDataObject.dropSpeed.toFixed(2)}{" "}
                    m/s
                  </Text>
                  <HorizontalLine />
                  <Text style={styles.text}>
                    Contact time: {jumpDataObject.contactTime.toFixed(3)} s
                  </Text>
                  <HorizontalLine />
                </>
              ) : null}
              {resultsVisible.squatJump ||
              resultsVisible.cMJump ||
              resultsVisible.dropJump ? (
                <>
                  {profile.roles === "editor" ? (
                    <>
                      <Text style={styles.subTitle}>PROPULSIVE PHASE</Text>
                      <Text style={styles.text}>
                        Push-off time: {jumpDataObject.tiempoPropulsivo} s
                      </Text>
                      <Text style={styles.text}>
                        Push-off distance: {jumpDataObject.distanciaPropulsiva}{" "}
                        m
                      </Text>
                      <Text style={styles.text}>
                        Mean Force: {jumpDataObject.force} N
                      </Text>
                      <Text style={styles.text}>
                        Mean power: {jumpDataObject.powerW} W
                      </Text>
                      <HorizontalLine />
                    </>
                  ) : null}
                </>
              ) : null}

              {resultsVisible.squatJump || resultsVisible.cMJump ? (
                <View style={{ marginHorizontal: 10 }}>
                  <Text style={styles.subTitle}>FLIGHT PHASE</Text>

                  <Text style={styles.text}>
                    Maximum COM height: {jumpDataObject.flightHeight.toFixed(2)}{" "}
                    m
                  </Text>
                  <Text style={styles.text}>
                    Aerial phase time: {jumpDataObject.flightTime.toFixed(2)} s
                  </Text>
                  <Text style={styles.text}>
                    Take-off velocity: {jumpDataObject.takeoffSpeed.toFixed(2)}{" "}
                    m/s
                  </Text>
                  <Text style={styles.text}>
                    Interval time: {jumpDataObject.interval.toFixed(3)} s
                  </Text>
                  <Text style={[styles.text, { fontSize: 16, marginTop: 10 }]}>
                    (COM: center of mass)
                  </Text>
                </View>
              ) : null}
              {resultsVisible.dropJump ? (
                <>
                  <Text style={styles.subTitle}>FLIGHT PHASE</Text>
                  <Text style={styles.text}>
                    Take-off velocity: {jumpDataObject.takeoffSpeed2.toFixed(2)}{" "}
                    m/s
                  </Text>
                  <Text style={styles.text}>
                    Maximum COM height:{" "}
                    {jumpDataObject.flightHeight2.toFixed(2)} m
                  </Text>
                  <Text style={styles.text}>
                    Aerial phase time: {jumpDataObject.flightTime2.toFixed(2)} s
                  </Text>
                  <Text style={[styles.text, { fontSize: 16, marginTop: 10 }]}>
                    (COM: center of mass)
                  </Text>
                  <HorizontalLine />
                </>
              ) : null}
            </>
          )}
          {profile.roles !== "editor" ? (
            <>
              <TouchableOpacity onPress={handlePremiumPropulsive}>
                <JumpResultReaderBlur time={jumpDataObject.tiempoPropulsivo} />
              </TouchableOpacity>
            </>
          ) : null}

          <View style={{ marginRight: 20 }}>
            <Chart
              title={"Acceleration Time Graph"}
              ordenadas1={jumpDataObject.arrayYF}
              ordenadas2={jumpDataObject.xAxisArray}
            />
          </View>
        </View>
      </>
    </>
  );
};
export default JumpResults;
const styles = StyleSheet.create({
  error: {
    color: "#b80009",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: 20,
    // marginTop: 100,
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#232f62",
    margin: 1,
  },
  title: {
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#232f62",
    margin: 1,
    marginVertical: 10,
    fontWeight: "bold",
  },
  subTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#232f62",
    margin: 1,
    marginVertical: 5,
  },
});
