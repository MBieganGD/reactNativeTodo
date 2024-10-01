import React, { useContext } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../Theme/theme";
import ThemedTextInput from "./ThemedTextInput";

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <View style={styles.container}>
      <ThemedTextInput
        placeholder="Search"
        style={styles.inputStyle}
        value={term}
        onChangeText={(newTerm) => onTermChange(newTerm)}
        autoCapitalize={"none"}
        autoCorrect={false}
        onEndEditing={onTermSubmit}
        icon={"search1"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  inputStyle: {
    width: "80%",
  },
});

export default SearchBar;
