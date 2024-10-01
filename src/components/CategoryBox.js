import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../Theme/theme";
import ThemedText from "./ThemedText";
import { AntDesign } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import DeleteItemModal from "./DeleteItemModal";
import { useNavigation } from "@react-navigation/native";
import { useTodos, useCategories } from "../context/TodoContext";

const CategoryBox = ({ category }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const [progress, setProgress] = useState(0);
  const [allCompleted, setAllCompleted] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const navigation = useNavigation();
  const { getTodos } = useTodos();
  const { deleteCategory } = useCategories();

  useEffect(() => {
    const todos = getTodos(category.id);
    const completedTodos = todos.filter((todo) => todo.completed).length;
    const totalTodos = todos.length;
    const progressRatio = totalTodos > 0 ? completedTodos / totalTodos : 0;
    setProgress(progressRatio);
    setAllCompleted(progressRatio === 1);
  }, [category.id, getTodos]);

  const confirmDelete = () => {
    setDeleteModalVisible(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleDelete = () => {
    deleteCategory(category.id);
    setDeleteModalVisible(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const goToCategoryDetails = () => {
    navigation.navigate("CategoryFlow", {
      screen: "CategoryScreen",
      params: {
        categoryId: category.id,
        categoryName: category.title,
      },
    });
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.box,
        backgroundColor: allCompleted
          ? activeColors.success
          : activeColors.tint,
      }}
      onPress={goToCategoryDetails}
    >
      <TouchableOpacity onPress={confirmDelete} style={styles.touchable}>
        <AntDesign name={"delete"} size={20} color={activeColors.text} />
      </TouchableOpacity>
      <View style={styles.categoryDetails}>
        <ThemedText style={styles.title}>{category.title}</ThemedText>
        <ThemedText>{category.description}</ThemedText>
      </View>

      <View style={styles.progressBox}>
        <View style={styles.progressTextContainer}>
          <ThemedText>Progress</ThemedText>
          <ThemedText>{(progress * 100).toFixed(0)}%</ThemedText>
        </View>
        <ProgressBar
          progress={progress}
          width={null}
          height={20}
          color={
            allCompleted ? activeColors.successLight : activeColors.primary
          }
        />
      </View>
      <DeleteItemModal
        isVisible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onDelete={handleDelete}
        itemType="Category"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    display: "flex",
    justifyContent: "space-between",
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 20,
  },
  categoryDetails: {
    display: "flex",
  },
  progressBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  progressTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  touchable: {
    position: "absolute",
    top: 20,
    right: 10,
    zIndex: 10,
  },
});

export default CategoryBox;
