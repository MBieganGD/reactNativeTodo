import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import AddItemModal from "../components/AddItemModal";
import ThemedText from "../components/ThemedText";
import MainContainer from "../components/container/MainContainer";
import CustomButton from "../components/CustomButton";
import { useTodos } from "../context/TodoContext";
import SearchBar from "../components/SearchBar";
import TodoComponentList from "../components/TodoComponentList";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../Theme/theme";
import { ThemeContext } from "../context/ThemeContext";

const CategoryScreen = ({ route }) => {
  const { categoryId, categoryName } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const { todos, getTodos, addTodo, searchTodos } = useTodos();
  const [term, setTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isGridView, setIsGridView] = useState(false);
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  useEffect(() => {
    const todos = getTodos(categoryId);
    setSearchResults(todos);
  }, [categoryId, todos]);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      const todos = getTodos(categoryId);
      setSearchResults(todos);
    } else {
      const results = searchTodos(searchTerm, categoryId);
      setSearchResults(results);
    }
  };

  const handleAddTodo = (todo) => {
    addTodo(todo, categoryId);
    setModalVisible(false);
  };

  return (
    <MainContainer style={styles.container}>
      <SearchBar
        term={term}
        onTermChange={(newTerm) => {
          setTerm(newTerm);
          handleSearch(newTerm);
        }}
        onTermSubmit={() => handleSearch(term)}
      />
      <AddItemModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddTodo}
        itemType="todo"
      />
      <View style={styles.titleBox}>
        <ThemedText style={styles.title}>{categoryName} Todos</ThemedText>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setIsGridView(!isGridView)}
        >
          <View style={styles.viewSwitch}>
            <AntDesign
              name={"bars"}
              size={24}
              color={isGridView ? activeColors.text : activeColors.primary}
            />
            <AntDesign
              name={"appstore-o"}
              size={24}
              color={isGridView ? activeColors.primary : activeColors.text}
            />
          </View>
        </TouchableOpacity>
      </View>
      <CustomButton title="Add ToDo" onPress={() => setModalVisible(true)} />
      <FlatList
        key={isGridView ? "grid" : "list"}
        data={searchResults}
        keyExtractor={(item) => item.id}
        numColumns={isGridView ? 2 : 1}
        renderItem={({ item }) => (
          <TodoComponentList todo={item} isGridView={isGridView} />
        )}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewSwitch: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  todoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default CategoryScreen;
