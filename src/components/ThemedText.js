import React, { useContext } from "react";
import { Text } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../Theme/theme";

const ThemedText = ({ style, children, ...props }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <Text style={[{ color: activeColors.text }, style]} {...props}>
      {children}
    </Text>
  );
};

export default ThemedText;
