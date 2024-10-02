import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MainContainer from "../components/container/MainContainer";
import ThemedText from "../components/ThemedText";
import ThemedTextInput from "../components/ThemedTextInput";
import CustomButton from "../components/CustomButton";
import { signIn } from "../api/auth";

const SignInScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      await signIn(login, password);
      navigation.navigate("MainFlow");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <MainContainer style={styles.container}>
      <ThemedText style={styles.title}>Login</ThemedText>
      <ThemedTextInput
        style={styles.input}
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
        autoCapitalize={"none"}
      />
      <ThemedTextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize={"none"}
      />
      {error ? <ThemedText style={styles.errorText}>{error}</ThemedText> : null}
      <CustomButton title="Login" onPress={handleSignIn} />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default SignInScreen;
