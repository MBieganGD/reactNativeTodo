import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ThemedText from "../components/ThemedText";
import ThemedTextInput from "../components/ThemedTextInput";
import CustomButton from "../components/CustomButton";
import DeleteItemModal from "../components/DeleteItemModal";
import MainContainer from "../components/container/MainContainer";
import { useTodos } from "../context/TodoContext";
import { AntDesign } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../Theme/theme";

const TaskDetail = ({ route }) => {
  const { todo } = route.params;
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [completed, setCompleted] = useState(todo.completed);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSaveEnabled, setSaveEnabled] = useState(false);
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const { updateTodo, deleteTodo } = useTodos();

  useEffect(() => {
    if (
      title !== todo.title ||
      description !== todo.description ||
      completed !== todo.completed
    ) {
      setSaveEnabled(true);
    } else {
      setSaveEnabled(false);
    }
  }, [title, description, completed]);

  const handleSave = () => {
    updateTodo(todo.id, { title, description, completed });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setSaveEnabled(false);
    navigation.goBack();
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <MainContainer style={styles.container}>
      <ThemedTextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <ThemedTextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        autoCapitalize={"none"}
        multiline={true}
        maxHeight={200}
      />
      <View style={styles.switchContainer}>
        <TouchableOpacity
          onPress={() => {
            setCompleted(true);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }}
          style={{ alignItems: "center", marginRight: 10 }}
        >
          <AntDesign
            name="checkcircle"
            color={completed ? "green" : "gray"}
            size={24}
          />
          <ThemedText style={{ color: completed ? "green" : "gray" }}>
            Complete
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCompleted(false);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }}
          style={{ alignItems: "center" }}
        >
          <AntDesign
            name="closecircle"
            color={!completed ? "red" : "gray"}
            size={24}
          />
          <ThemedText style={{ color: !completed ? "red" : "gray" }}>
            Incomplete
          </ThemedText>
        </TouchableOpacity>
      </View>
      <CustomButton
        title="Save"
        onPress={handleSave}
        disabled={!isSaveEnabled}
      />
      <CustomButton
        title="Delete"
        onPress={() => setModalVisible(true)}
        style={{ backgroundColor: activeColors.error }}
      />
      <DeleteItemModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onDelete={handleDelete}
        itemType="task"
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 20,
    fontSize: 18,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default TaskDetail;
