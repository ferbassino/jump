import client from "./client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signIn = async (email, password) => {
  try {
    const signInRes = await client.post("/sign-in", {
      email,
      password,
    });

    if (signInRes.data.success) {
      const token = signInRes.data.user.token;

      await AsyncStorage.setItem("token", token);
    }

    return signInRes;
  } catch (error) {
    if (error?.response?.data) {
      return error.response.data;
    }
    console.log(`error inside signIn method: ${error}`);
    return { success: false, error: error.message };
  }
};
export const signOut = async (email, password) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      const res = await client.get("/sign-out", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      if (res.data.success) {
        await AsyncStorage.removeItem("token");
        return true;
      }
      return false;
    }
  } catch (error) {
    return console.log(`error inside signOut method: ${error}`);
  }
  return false;
};

export const updateUser = async (id, values) => {
  const res = await client.put(`user/${id}`, values, { new: true });

  if (!res.data.success) throw new Error("Response not ok");
  return res.data;
};
