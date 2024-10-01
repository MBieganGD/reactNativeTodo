import React, { useContext, useRef } from "react";
import { TouchableOpacity, Text, StyleSheet, Animated } from "react-native";
import { colors } from "../Theme/theme";
import { ThemeContext } from "../context/ThemeContext";
import * as Haptics from "expo-haptics";

const CustomButton = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
}) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!disabled) {
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
      Haptics.selectionAsync();
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      onPress();
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: disabled
              ? activeColors.tint
              : activeColors.primary,
          },
          style,
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
      >
        <Text
          style={[styles.buttonText, { color: activeColors.black }, textStyle]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default CustomButton;
