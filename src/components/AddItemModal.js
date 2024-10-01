import React, { useState, useContext, useEffect } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useToast } from "react-native-toast-notifications";

import { colors } from "../Theme/theme";
import { ThemeContext } from "../context/ThemeContext";
import ThemedText from "./ThemedText";
import ThemedTextInput from "./ThemedTextInput";
import CustomButton from "./CustomButton";

const AddItemModal = ({ isVisible, onClose, onSubmit, itemType }) => {
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const isFormValid = title.length > 0 && description.length > 0;

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit({ title, description });
      setTitle("");
      setDescription("");
      onClose();
      toast.show(`New ${itemType} added`, {
        type: "success",
        placement: "top",
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    if (!isVisible) {
      setTitle("");
      setDescription("");
    }
  }, [isVisible]);

  return (
    <Modal transparent={true} visible={isVisible} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View
        style={{
          ...styles.modalContainer,
          backgroundColor: activeColors.background,
        }}
      >
        <ThemedText style={styles.title}>Add new {itemType}</ThemedText>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.inputTitle}>Title</ThemedText>
          <ThemedTextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            autoCapitalize={"none"}
          />
          <ThemedText style={styles.inputTitle}>Description</ThemedText>
          <ThemedTextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            autoCapitalize={"none"}
            multiline={true}
            maxHeight={200}
          />
        </View>

        <CustomButton
          title="Add"
          onPress={handleSubmit}
          disabled={!isFormValid}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    position: "absolute",
    top: "15%",
    left: "10%",
    right: "10%",
    display: "flex",
    justifyContent: "space-around",
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    height: "60%",
  },
  title: {
    fontSize: 18,
    fontWeight: 800,
  },
  inputContainer: {
    display: "flex",
    rowGap: 10,
  },
});

export default AddItemModal;
