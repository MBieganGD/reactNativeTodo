import React, { useContext } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import { colors } from "../Theme/theme";
import { ThemeContext } from "../context/ThemeContext";
import ThemedText from "./ThemedText";
import CustomButton from "./CustomButton";

const DeleteItemModal = ({ isVisible, onClose, onDelete, itemType }) => {
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

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
        <ThemedText style={styles.title}>Delete {itemType}</ThemedText>
        <ThemedText style={styles.message}>
          Are you sure you want to delete this {itemType}?
        </ThemedText>

        <View style={styles.buttonContainer}>
          <CustomButton title="Cancel" onPress={onClose} />
          <CustomButton
            title="Delete"
            onPress={onDelete}
            style={{ backgroundColor: activeColors.error }}
          />
        </View>
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
    top: "30%",
    left: "10%",
    right: "10%",
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default DeleteItemModal;
