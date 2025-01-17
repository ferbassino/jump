import client from "../../api/client";

export const isValidObjField = (obj) => {
  return Object.values(obj).every((value) => value.trim());
};

export const updateError = (error, stateUpdater) => {
  stateUpdater(error);
  setTimeout(() => {
    stateUpdater("");
  }, 2500);
};

export const isValidEmail = (value) => {
  const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return regx.test(value);
};

export const verifyEmail = async (otp, userId) => {
  try {
    const response = await client.post("/verify-email", { otp, userId });
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
