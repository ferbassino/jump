import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import FormInput from "../../login/components/form/FormInput";
import FormSubmitButton from "../../login/components/form/FormSubmitButton";
import client from "../../api/client";
import { isValidEmail, updateError } from "../../login/utils/methods";
import { useLogin } from "../../login/context/LoginProvider";
import Button from "../components/Button";
const SearchClient = ({ userId, setEmail, email, setClientProfile }) => {
  const {
    setLoginPending,
    setVisible,
    setDataClientObj,
    currentClientProfile,
    setCurrentClientProfile,
  } = useLogin();

  const [error, setError] = useState("");

  const handleOnChangeText = (value) => {
    setEmail(value);
  };

  const isValidForm = () => {
    if (!isValidEmail(email)) return updateError("Invalid email!", setError);
    return true;
  };

  const search = async () => {
    try {
      if (isValidForm()) {
        setLoginPending(true);
        const response = await client.get("/api/clients");
        const allClients = response.data.clients;
        const allMClients = [];

        allClients.map((client) => {
          if (client.user[0] === userId) {
            allMClients.push(client);
          }
        });
        let clientProfile = {};
        let clientExist;
        allMClients.map((client) => {
          if (client.email === email) {
            clientProfile = client;
            clientExist = true;
          }
        });

        if (clientExist) {
          setVisible((prev) => ({ ...prev, saveOldClient: true }));
          setCurrentClientProfile((prev) => ({
            ...prev,
            email: clientProfile.email,
            size: clientProfile.size,
            gender: clientProfile.gender,
            birthDate: clientProfile.birthDate,
            clientId: clientProfile._id,
            userId,
          }));
        } else {
          setVisible((prev) => ({ ...prev, saveNewClient: true }));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoginPending(false);
    }
  };
  const handleComeBackCurrentTest = () => {
    setVisible((prev) => ({
      ...prev,
      searchClient: false,
      jumpResult: true,
    }));
  };

  return (
    <View>
      <>
        {error ? (
          <Text style={{ color: "red", fontSize: 20, textAlign: "center" }}>
            {error}
          </Text>
        ) : null}
        <Text style={styles.title}>
          Enter an email and press "SEARCH EMAIL" to search for it
        </Text>

        <View style={{ marginHorizontal: 10, marginTop: 30 }}>
          <FormInput
            value={email}
            onChangeText={(value) => handleOnChangeText(value)}
            label="Email"
            placeholder="example@email.com"
            autoCapitalize="none"
            required={true}
          />
        </View>

        <Button title={"SEARCH EMAIL"} onPress={search} />

        <View style={{ marginTop: 60 }}>
          <Button title={"GO BACK TEST"} onPress={handleComeBackCurrentTest} />
        </View>
      </>
    </View>
  );
};

export default SearchClient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    paddingHorizontal: 10,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#1b1b33",
    textAlign: "center",
  },
});
