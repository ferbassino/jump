import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import client from "../../api/client";
import Button from "../components/Button";
import { SelectList } from "react-native-dropdown-select-list";
import FormInput from "../../login/components/form/FormInput";
import { isValidEmail, updateError } from "../../login/utils/methods";
import DateTimerPicker from "@react-native-community/datetimepicker";
import { getAge } from "../auxiliaries/getAge";
import { useLogin } from "../../login/context/LoginProvider";
import { genderSelect } from "../auxiliaries/clientSelect";
import { generatePassword } from "../auxiliaries/generatePassword";
import InputSpinner from "react-native-input-spinner";
import SuccessSaved from "../components/SuccessSaved";
import ErrorSaved from "../components/ErrorSaved";
import HorizontalLine from "../../login/components/HorizontalLine";

const SaveNewClient = ({ userId, email }) => {
  const {
    setLoginPending,
    dataClientObj,
    setDataClientObj,
    visible,
    setVisible,
    dataObj,
    setDataObj,
    setCurrentClientProfile,
    initialDataObj,
  } = useLogin();
  const [error, setError] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState(new Date());
  const [size, setSize] = useState("");
  const [password, setPassword] = useState("");

  const [localVisible, setLocalVisible] = useState({
    errorSaved: false,
    successSaved: false,
  });

  const isValidForm = () => {
    if (!isValidEmail(email)) return updateError("Invalid email!", setError);
    return true;
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setBirthDate(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  useEffect(() => {
    const pass = generatePassword();
    setPassword(pass);
  }, []);

  const handleReTest = () => {
    setVisible((prev) => ({
      ...prev,
      saveCurrentClient: true,
      reTestButton: false,
      saveNewClient: false,
    }));
    setDataObj((prev) => ({
      ...prev,
      accData: [],
      testTimeInput: "",
      motionType: "",
    }));
  };

  useEffect(() => {
    setDataClientObj((prev) => ({
      ...prev,
      email,
      birthDate,
      gender,
      size,
      password,
      userId,
    }));
  }, [birthDate, gender, size, password]);

  const saveNewClient = async () => {
    if (birthDate === "" || size === "" || gender === "") {
      return alert("All fields must be complete!");
    }

    try {
      if (isValidForm()) {
        setLoginPending(true);
        const response = await client.post("/api/client/create", dataClientObj);

        if (response.data.success) {
          const age = getAge(response.data.savedClient.birthDate);
          const dataMovObj = {
            email,
            motionType: dataObj.motionType,
            side: dataObj.side,
            motion: dataObj.movement,
            accData: dataObj.accData,
            testTime: dataObj.testTimeInput,
            weight: dataObj.weight,
            size: response.data.savedClient.size,
            gender: response.data.savedClient.gender,
            age: age,
            userId: userId,
            clientId: response.data.savedClient._id,
          };
          setCurrentClientProfile((prev) => ({
            ...prev,
            email: response.data.savedClient.email,
            clientId: response.data.savedClient._id,
            age: age,
            size: response.data.savedClient.size,
            gender: response.data.savedClient.gender,
            birthDate: response.data.savedClient.birthDate,
            userId,
          }));
          if (dataMovObj) {
            const res = await client.post("/api/motion/create", dataMovObj);

            if (res.data.success) {
              setLocalVisible((prev) => ({
                ...prev,
                successSaved: true,
              }));
              setVisible((prev) => ({
                ...prev,

                reTestButton: false,
              }));
              setTimeout(() => {
                setLocalVisible((prev) => ({
                  ...prev,
                  successSaved: false,
                }));
                setVisible((prev) => ({
                  ...prev,
                  saveCurrentClient: true,
                  saveNewClient: false,
                  reTestButton: true,
                }));
              }, 4000);
            } else {
              setLocalVisible((prev) => ({
                ...prev,
                errorSaved: true,
              }));
              setError(
                "An error occurred while saving the data, please try again later"
              );
              setTimeout(() => {
                setLocalVisible((prev) => ({
                  ...prev,
                  errorSaved: false,
                }));
                setVisible((prev) => ({
                  ...prev,
                  saveNewClient: false,

                  selector: true,
                }));
              }, 4000);
            }
          }
        } else {
          setLocalVisible((prev) => ({
            ...prev,
            errorSaved: true,
          }));
          setError(
            "An error occurred while saving the data, please try again later"
          );
          setTimeout(() => {
            setLocalVisible((prev) => ({
              ...prev,
              errorSaved: false,
            }));
            setVisible((prev) => ({
              ...prev,
              saveNewClient: false,

              selector: true,
            }));
          }, 4000);
        }
      }
    } catch (error) {
      console.log(error);

      setLocalVisible((prev) => ({
        ...prev,
        errorSaved: false,
      }));
      setVisible((prev) => ({
        ...prev,
        saveNewClient: false,
        reTestButton: false,
        selector: true,
      }));
    } finally {
      setLoginPending(false);
    }
  };

  return (
    <View style={styles.container}>
      {localVisible.successSaved ? (
        <SuccessSaved />
      ) : (
        <>
          {localVisible.errorSaved ? (
            <ErrorSaved />
          ) : (
            <>
              <Text style={styles.title}>{email} </Text>
              <Text style={styles.title}> it's a new contact!</Text>
              <Text style={styles.subTitle}>fill out the form please</Text>
              <HorizontalLine />
              <>
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
                <FormInput
                  value={email}
                  label="Email"
                  placeholder={email}
                  autoCapitalize="none"
                  required={true}
                />
                {showPicker && (
                  <DateTimerPicker
                    mode="date"
                    display="default"
                    value={date}
                    onChange={onChange}
                    maximumDate={new Date(Date.now())}
                  />
                )}
                <Text style={styles.text}>Date of Birth</Text>
                {!showPicker && (
                  <Pressable onPress={toggleDatePicker}>
                    <TextInput
                      style={styles.input}
                      placeholder="mm dd yyyy"
                      value={birthDate}
                      onChangeText={setBirthDate}
                      placeholderTextColor="rgba(15,12,46,1)"
                      editable={false}
                    />
                  </Pressable>
                )}

                <View style={{ marginBottom: 15 }}>
                  <Text style={styles.text}>Size</Text>
                  <InputSpinner
                    max={230}
                    min={0}
                    rounded={false}
                    showBorder={true}
                    colorLeft="#8f0000"
                    colorRight="#8f0000"
                    children={<Text>-cm-</Text>}
                    value={size}
                    onChange={(num) => {
                      setSize(num);
                    }}
                    fontSize={20}
                  />
                </View>

                <View style={{ marginBottom: 15 }}>
                  <Text style={styles.text}>Gender</Text>
                  <SelectList
                    setSelected={setGender}
                    data={genderSelect}
                    save="value"
                    placeholder="Gender"
                    // defaultOption={"Axial"}
                    boxStyles={{ borderRadius: 0 }}
                    dropdownTextStyles={{ fontSize: 20 }}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <HorizontalLine />

                  <Button
                    title={"REGISTER AND SAVE DATA"}
                    onPress={saveNewClient}
                  />
                </View>
              </>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default SaveNewClient;

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
