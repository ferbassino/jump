import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import client from "../../api/client";

import getDifferenceNowMonth from "../utils/getDifferenceNowMonth";
import { signOut, updateUser } from "../../api/user";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const visibleOBJ = {
    test: false,
    testFinished: false,
    selector: true,
    selectorWeight: false,
    searchClient: false,
    saveNewClient: false,
    saveOldClient: false,
    saveCurrentClient: false,
    jumpResult: false,
    errorValidation: false,
    saveDevice: false,
    premium: false,
    premiumMessageTitle: "",
    premiumMessageSubTitle: "",
    reTestButton: false,
  };
  const initialDataClientObj = {
    email: "",
    birthDate: "",
    gender: "",
    size: "",
    password: "",
    userId: "",
  };

  const initialDataObj = {
    accData: [],
    testTimeInput: "",
    motionType: "",
    weight: "",
  };
  const [dataClientObj, setDataClientObj] = useState(initialDataClientObj);
  const [dataObj, setDataObj] = useState(initialDataObj);
  const [visible, setVisible] = useState(visibleOBJ);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [loginPending, setLoginPending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [resetTest, setResetTest] = useState(false);
  const [currentClientProfile, setCurrentClientProfile] = useState({});

  const fetchUser = async () => {
    setLoginPending(true);
    const token = await AsyncStorage.getItem("token");

    if (token !== null) {
      const res = await client.get("/profile", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      if (!res.data.verified) {
        setIsVerified(res.data.verified);
        setLoginPending(false);
        return;
      }

      if (res.data.success) {
        const id = res.data.id;
        const { initialDate } = res.data;
        const diasDesdeInicio = getDifferenceNowMonth(initialDate);

        if (
          res.data.roles === "editor" &&
          res.data.level === "cero" &&
          diasDesdeInicio > 31
        ) {
          try {
            const changeExpiredRole = async () => {
              const values = {
                roles: "reader",
              };

              const response = await updateUser(id, values);
              if (response.success) {
                signOut();

                return "editor degraded to reader";
              }
              setIsLoggedIn(false);
              return;
            };
            changeExpiredRole();
          } catch (error) {
            console.log(error);
          }
        }

        setProfile(res.data);

        setIsLoggedIn(true);
      } else {
        setProfile({});
        setIsLoggedIn(false);
      }
      setLoginPending(false);
    } else {
      setProfile({});
      setIsLoggedIn(false);
      setLoginPending(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        profile,
        setProfile,
        loginPending,
        setLoginPending,
        isVerified,
        resetTest,
        setResetTest,
        visible,
        setVisible,
        visibleOBJ,
        dataClientObj,
        setDataClientObj,
        initialDataClientObj,
        dataObj,
        setDataObj,
        initialDataObj,
        currentClientProfile,
        setCurrentClientProfile,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
