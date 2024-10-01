import React, { useContext, useState, useRef } from "react";
import { TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../Theme/theme";
import { AntDesign } from "@expo/vector-icons";

const ThemedTextInput = ({ style, icon, iconStyle, ...props }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  const [isFocused, setIsFocused] = useState(false);
  const textInputRef = useRef(null);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => textInputRef.current.focus()}
      style={{
        ...styles.container,
        borderColor: isFocused ? activeColors.primary : activeColors.secondary,
        backgroundColor: activeColors.tint,
      }}
    >
      {icon && (
        <AntDesign
          name={icon}
          size={20}
          color={activeColors.text}
          style={[styles.icon, iconStyle]}
        />
      )}
      <TextInput
        ref={textInputRef}
        style={[{ color: activeColors.text }, style]}
        placeholderTextColor={activeColors.text}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default ThemedTextInput;
