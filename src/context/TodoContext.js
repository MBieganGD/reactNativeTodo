import React, { createContext, useContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { CATEGORIES_KEY, TODOS_KEY } from "../api/fakeApi";

const TodoContext = createContext();

const initialState = {
  categories: [],
  todos: [],
};

function todoReducer(state, action) {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "ADD_CATEGORY":
      return { ...state, categories: [...state.categories, action.payload] };
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
        ),
      };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(
          CATEGORIES_KEY,
          JSON.stringify(state.categories)
        );
        await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(state.todos));
      } catch (error) {
        console.error("Error saving data:", error);
      }
    };

    saveData();
  }, [state.categories, state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export const resetState = async (dispatch) => {
  try {
    dispatch({ type: "RESET_STATE" });
    await AsyncStorage.removeItem(CATEGORIES_KEY);
    await AsyncStorage.removeItem(TODOS_KEY);
  } catch (error) {
    console.error("Error resetting state:", error);
  }
};

export function useTodo() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodo must be used within a Todo Provider");
  }

  return context;
}

export function useCategories() {
  const { state, dispatch } = useTodo();

  const addCategory = (category) => {
    const newCategory = { ...category, id: uuid.v4() };
    dispatch({ type: "ADD_CATEGORY", payload: newCategory });
  };

  const deleteCategory = (categoryId) => {
    dispatch({ type: "DELETE_CATEGORY", payload: categoryId });
  };

  const searchCategories = (term) => {
    const lowerCaseTerm = term.toLowerCase();
    return state.categories.filter(
      (category) =>
        category.title.toLowerCase().includes(lowerCaseTerm) ||
        category.description.toLowerCase().includes(lowerCaseTerm)
    );
  };

  return {
    categories: state.categories,
    addCategory,
    deleteCategory,
    searchCategories,
  };
}

export function useTodos() {
  const { state, dispatch } = useTodo();

  const addTodo = (todo, categoryId) => {
    const newTodo = {
      ...todo,
      id: uuid.v4(),
      categoryId: categoryId,
      completed: false,
    };
    dispatch({ type: "ADD_TODO", payload: newTodo });
  };

  const deleteTodo = (todoId) => {
    dispatch({ type: "DELETE_TODO", payload: todoId });
  };

  const updateTodo = (todoId, updates) => {
    dispatch({ type: "UPDATE_TODO", payload: { id: todoId, ...updates } });
  };

  const getTodos = (categoryId) => {
    return categoryId
      ? state.todos.filter((todo) => todo.categoryId === categoryId)
      : state.todos;
  };

  const searchTodos = (term, categoryId = null) => {
    const lowerCaseTerm = term.toLowerCase();
    return state.todos.filter(
      (todo) =>
        (categoryId ? todo.categoryId === categoryId : true) &&
        (todo.title.toLowerCase().includes(lowerCaseTerm) ||
          todo.description.toLowerCase().includes(lowerCaseTerm))
    );
  };

  return {
    todos: state.todos,
    addTodo,
    deleteTodo,
    updateTodo,
    getTodos,
    searchTodos,
  };
}
