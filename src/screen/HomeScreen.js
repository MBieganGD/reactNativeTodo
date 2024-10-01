import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import MainContainer from "../components/container/MainContainer";
import CategoryBox from "../components/CategoryBox";
import CustomButton from "../components/CustomButton";
import SearchBar from "../components/SearchBar";
import AddItemModal from "../components/AddItemModal";
import { useCategories } from "../context/TodoContext";

const HomeScreen = () => {
  const [term, setTerm] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const { categories, addCategory, searchCategories } = useCategories();
  const [searchResults, setSearchResults] = useState(categories);

  useEffect(() => {
    setSearchResults(categories);
  }, [categories]);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setSearchResults(categories);
    } else {
      const results = searchCategories(searchTerm);
      setSearchResults(results);
    }
  };

  const handleAddCategory = (category) => {
    addCategory(category);
    setModalVisible(false);
    setSearchResults(categories);
  };

  return (
    <MainContainer>
      <AddItemModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddCategory}
        itemType="Category"
      />
      <SearchBar
        term={term}
        onTermChange={(newTerm) => {
          setTerm(newTerm);
          handleSearch(newTerm);
        }}
        onTermSubmit={() => handleSearch(term)}
      />
      <CustomButton
        title="Add category"
        onPress={() => setModalVisible(true)}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CategoryBox category={item} />}
      />
    </MainContainer>
  );
};

export default HomeScreen;
