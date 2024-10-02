import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "./src/screen/WelcomeScreen";
import SignInScreen from "./src/screen/SigninScreen";
import HomeScreen from "./src/screen/HomeScreen";
import CategoryScreen from "./src/screen/CategoryScreen";
import TodoDetails from "./src/screen/TodoDetails";
import ProfileScreen from "./src/screen/ProfileScreen";
import { ThemeContext } from "./src/context/ThemeContext";
import { colors } from "./src/Theme/theme";
import { Appearance, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Header from "./src/components/Header";
import { TodoProvider } from "./src/context/TodoContext";
import { ToastProvider } from "react-native-toast-notifications";

const LoginStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const CategoryStack = createNativeStackNavigator();
const Tab = createNativeStackNavigator();

const useActiveColors = () => {
  const { theme } = useContext(ThemeContext);
  return colors[theme.mode];
};

const LoginFlow = () => (
  <LoginStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <LoginStack.Screen name="Welcome" component={WelcomeScreen} />
    <LoginStack.Screen name="SignIn" component={SignInScreen} />
  </LoginStack.Navigator>
);

const CategoryFlow = () => (
  <CategoryStack.Navigator>
    <CategoryStack.Screen
      name="CategoryScreen"
      component={CategoryScreen}
      options={{
        header: () => <Header title="ToDo" showBackButton={true} />,
      }}
    />
    <CategoryStack.Screen
      name="TodoDetails"
      component={TodoDetails}
      options={{
        header: () => <Header title="TodoDetails" showBackButton={true} />,
      }}
    />
  </CategoryStack.Navigator>
);

const MainFlow = () => {
  const activeColors = useActiveColors();

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          title: "Home",
          header: () => <Header title="Home" showBackButton={false} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          title: "Profile",
          header: () => <Header title="Profile" showBackButton={true} />,
        }}
      />
      <Tab.Screen
        name="CategoryFlow"
        component={CategoryFlow}
        options={{
          tabBarLabel: "CategoryFlow",
          title: "CategoryFlow",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [theme, setTheme] = useState({ mode: "dark" });

  const updateTheme = (newTheme) => {
    let mode = newTheme?.mode || (theme.mode === "dark" ? "light" : "dark");
    if (newTheme?.system) {
      const systemColorScheme = Appearance.getColorScheme();
      mode = systemColorScheme === "dark" ? "dark" : "light";
    }
    setTheme({ ...newTheme, mode });
  };

  if (theme.system) {
    Appearance.addChangeListener(({ colorScheme }) => {
      updateTheme({ system: true, mode: colorScheme });
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <TodoProvider>
        <ToastProvider>
          <NavigationContainer>
            <MainStack.Navigator>
              <MainStack.Screen
                name="LoginFlow"
                component={LoginFlow}
                options={{ headerShown: false }}
              />
              <MainStack.Screen
                name="MainFlow"
                component={MainFlow}
                options={{
                  headerShown: false,
                }}
              />
            </MainStack.Navigator>
          </NavigationContainer>
        </ToastProvider>
      </TodoProvider>
    </ThemeContext.Provider>
  );
};

export default App;
