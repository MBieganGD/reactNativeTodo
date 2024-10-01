import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../Theme/theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = ({ title, showBackButton }) => {
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: activeColors.background }}>
      <StatusBar
        backgroundColor={activeColors.background}
        barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
      />
      <View style={styles.headerContainer}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <AntDesign name="arrowleft" size={24} color={activeColors.text} />
          </TouchableOpacity>
        )}
        <Text style={{ ...styles.title, color: activeColors.text }}>
          {title}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={require("../../assets/profile.jpg")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  backButton: {
    marginRight: 10,
  },
});

export default Header;
