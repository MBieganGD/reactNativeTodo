import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import ThemedText from "./ThemedText";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../Theme/theme";
import { AntDesign } from "@expo/vector-icons";
import { useTodos } from "../context/TodoContext";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

const TodoComponentList = ({ todo, isGridView }) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const { updateTodo } = useTodos();
  let activeColors = colors[theme.mode];

  const toggleTodoStatus = () => {
    updateTodo(todo.id, { completed: !todo.completed });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handlePress = () => {
    navigation.navigate("TodoDetails", { todo });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        {
          ...styles.container,
          backgroundColor: todo.completed
            ? activeColors.success
            : activeColors.tint,
        },
        styles.todoItem,
        isGridView && styles.gridItem,
      ]}
    >
      <View style={styles.titleBox}>
        <TouchableOpacity onPress={toggleTodoStatus}>
          {todo.completed ? (
            <AntDesign name="checkcircle" color="green" size={34} />
          ) : (
            <AntDesign name="closecircle" color="red" size={34} />
          )}
        </TouchableOpacity>

        <ThemedText
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.titleText}
        >
          {todo.title}
        </ThemedText>
      </View>
      <AntDesign
        name={"right"}
        color={activeColors.text}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
    padding: 15,
  },
  gridItem: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
  },
  titleBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    overflow: "hidden",
    flex: 1,
  },
  titleText: {
    flex: 1,
  },
});

export default TodoComponentList;
