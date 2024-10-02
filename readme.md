# React Native Task Management App

## Overview

This is a **React Native** application designed to manage tasks with features such as user authentication, task creation, and task management. The app leverages custom components and context providers for handling themes and tasks.

## Features

- **User Authentication** (Sign In)
- **Task Management** (Create, Update, Delete)
- **Themed UI** (Light/Dark Mode)
- **Haptic Feedback**
- **Custom Headers and Navigation**

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```
2. Navigate to the project directory
3. Install dependencies
   ```bash
   npm install
   ```
4. Start the application
   ```bash
   npm run start
   ```

# Project Structure

## Components

- **MainContainer**  
  A container component that wraps the main content of the screen.

- **ThemedText**  
  A text component that adapts to the current theme.

- **ThemedTextInput**  
  A text input component that adapts to the current theme.

- **CustomButton**  
  A customizable button component.

- **DeleteItemModal**  
  A modal component for confirming item deletion.

- **Header**  
  A custom header component used in navigation.

## Context

- **ThemeContext**  
  Provides the current theme and allows toggling between themes.

- **TodoContext**  
  Manages the state of tasks (todos) and provides functions to update and delete tasks.

## Screens

- **SignInScreen**  
  Handles user sign-in with inputs for login and password.

- **HomeScreen**  
  Displays the home screen of the app.

- **ProfileScreen**  
  Displays the user's profile.

- **TaskDetail**  
  Allows viewing and editing the details of a task.

- **WelcomeScreen**  
  Displays a welcome message to the user.

## API

- **auth.js**  
  Contains functions for user authentication.

## Navigation

The app uses React Navigation for handling navigation between screens. The main navigation flows are:

- **LoginFlow**  
  Handles the authentication screens.

- **CategoryFlow**  
  Handles the task management screens.

- **MainFlow**  
  Handles the main application screens, including Home and Profile.

## Usage

- **Sign In**: Users can sign in using their login credentials.
- **Task Management**: Users can create, update, and delete tasks.
- **Themed UI**: The app adapts to the current theme, which can be toggled by the user.
- **Navigation**: Users can navigate between different screens using the bottom tab navigator.

## Screens

### Home Screen

![Home Screen](assets/screens/Simulator%20Screenshot%20-%20iPhone%2016%20Pro%20-%202024-10-02%20at%2011.12.10.png)

### Sign In Screen

![Sign In Screen](assets/screens/Simulator%20Screenshot%20-%20iPhone%2016%20Pro%20-%202024-10-02%20at%2011.13.55.png)

### Task List Screen

![Task List Screen](assets/screens/Simulator%20Screenshot%20-%20iPhone%2016%20Pro%20-%202024-10-02%20at%2011.14.14.png)

### Task Detail Screen

![Task Detail Screen](assets/screens/Simulator%20Screenshot%20-%20iPhone%2016%20Pro%20-%202024-10-02%20at%2011.14.19.png)

### Add Task Screen

![Add Task Screen](assets/screens/Simulator%20Screenshot%20-%20iPhone%2016%20Pro%20-%202024-10-02%20at%2011.14.21.png)

### Edit Task Screen

![Edit Task Screen](assets/screens/Simulator%20Screenshot%20-%20iPhone%2016%20Pro%20-%202024-10-02%20at%2011.14.25.png)

### Profile Screen

![Profile Screen](assets/screens/Simulator%20Screenshot%20-%20iPhone%2016%20Pro%20-%202024-10-02%20at%2011.14.34.png)

### Settings Screen

![Settings Screen](assets/screens/Simulator%20Screenshot%20-%20iPhone%2016%20Pro%20-%202024-10-02%20at%2011.14.51.png)

## License

This project is licensed under the MIT License.
