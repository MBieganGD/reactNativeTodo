import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import MainContainer from "../components/container/MainContainer";
import ThemedText from "../components/ThemedText";
import CustomButton from "../components/CustomButton";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../Theme/theme";
import * as Haptics from "expo-haptics";
import { logout, fetchUserLogin } from "../api/auth";
import { useTodo } from "../context/TodoContext";

const ProfileScreen = ({ navigation }) => {
  const [userLogin, setUserLogin] = useState("");
  const { theme, updateTheme } = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState(
    theme.system ? "system" : theme.mode
  );
  const { dispatch } = useTodo();
  let activeColors = colors[theme.mode];

  useEffect(() => {
    const getUserLogin = async () => {
      const login = await fetchUserLogin();
      if (login) {
        setUserLogin(login);
      }
    };
    getUserLogin();
  }, []);

  const handleLogout = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await logout(dispatch);
    navigation.navigate("LoginFlow");
  };

  const handleThemeChange = (newTheme) => {
    setSelectedTheme(newTheme);
    if (newTheme === "system") {
      updateTheme({ system: true });
    } else {
      updateTheme({ mode: newTheme });
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <MainContainer style={styles.mainContainer}>
      <Image
        source={require("../../assets/profile.jpg")}
        style={styles.userImage}
      />
      <ThemedText style={styles.title}>{userLogin}</ThemedText>
      <View style={styles.radioContainer}>
        <Text style={{ color: activeColors.text }}>Dark Mode</Text>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleThemeChange("dark")}
        >
          <View
            style={
              selectedTheme === "dark"
                ? styles.radioSelected
                : styles.radioUnselected
            }
          />
        </TouchableOpacity>
        <Text style={{ color: activeColors.text }}>Light Mode</Text>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleThemeChange("light")}
        >
          <View
            style={
              selectedTheme === "light"
                ? styles.radioSelected
                : styles.radioUnselected
            }
          />
        </TouchableOpacity>
        <Text style={{ color: activeColors.text }}>System Mode</Text>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleThemeChange("system")}
        >
          <View
            style={
              selectedTheme === "system"
                ? styles.radioSelected
                : styles.radioUnselected
            }
          />
        </TouchableOpacity>
      </View>
      <CustomButton title="Log out" onPress={handleLogout} />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderStyle: "solid",
    borderWidth: 10,
    borderColor: colors.light.primary,
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  radioButton: {
    marginHorizontal: 10,
  },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.light.primary,
  },
  radioUnselected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.light.primary,
  },
});

export default ProfileScreen;
