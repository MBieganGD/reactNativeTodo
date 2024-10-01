import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetState } from "../context/TodoContext";

export const validateLogin = (login) => {
  return login.length >= 3 && login.length <= 25;
};

export const validatePassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const signIn = async (login, password) => {
  if (!validateLogin(login)) {
    throw new Error("Login must be between 3 and 25 characters.");
  }

  if (!validatePassword(password)) {
    throw new Error(
      "Password must be at least 8 characters long and include digits, uppercase, lowercase, and special characters."
    );
  }

  await AsyncStorage.setItem("login", login);
  await AsyncStorage.setItem("password", password);
};

export const logout = async (dispatch) => {
  try {
    await AsyncStorage.removeItem("login");
    await AsyncStorage.removeItem("password");
    await resetState(dispatch);
  } catch (error) {
    console.error("Error during logout", error);
  }
};

export const fetchUserLogin = async () => {
  const login = await AsyncStorage.getItem("login");
  return login;
};
