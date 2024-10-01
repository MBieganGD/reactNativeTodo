import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { StyleSheet, View } from "react-native";
import { colors } from "../../Theme/theme";

const MainContainer = ({ children, style, ...props }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <View
      style={[
        styles.safeArea,
        { backgroundColor: activeColors.background },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollView: {
    flex: 1,
  },
});

export default MainContainer;
