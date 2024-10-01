import React, { useContext, useState } from "react";
import { Image, Text, Button, StyleSheet, Switch } from "react-native";
import MainContainer from "../components/container/MainContainer";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../Theme/theme";
import CustomButton from "../components/CustomButton";
import ThemedText from "../components/ThemedText";
import * as Haptics from "expo-haptics";

const WelcomeScreen = ({ navigation }) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  const [isActive, setIsActive] = useState(theme.mode === "dark");
  const handleSwitch = () => {
    updateTheme();
    setIsActive((previousState) => !previousState);

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <MainContainer style={styles.container}>
      <ThemedText style={styles.title}>To-Do Smart Goals</ThemedText>
      <CustomButton
        title="Let's Go"
        onPress={() => navigation.navigate("SignIn")}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default WelcomeScreen;
