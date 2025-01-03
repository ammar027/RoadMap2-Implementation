# React Native App with Redux, i18n, and Navigation

## Overview
This project is a React Native application that demonstrates the use of Redux for state management, i18n for internationalization, and advanced navigation patterns. The app features a clean, modern UI with structured styling and offers support for dynamic user interactions, including multilingual support and persistent state.

## Features
- **Redux State Management**: Centralized state management using Redux and Redux Persist to maintain state across sessions.
- **i18n Integration**: Multilingual support using `react-i18next` with English and Spanish translations.
- **Navigation**:
  - **Drawer Navigation**: Allows users to access profile and settings screens.
  - **Bottom Tab Navigation**: Home, Create Post, Users, and Profile screens.
- **Styling**:
  - Consistent and responsive design with `StyleSheet` in React Native.
  - Usage of Material Icons and FontAwesome for enhanced UI components.

## Screens
### 1. **Home**
- Displays a list of posts managed via Redux.
- Options to delete posts with an alert confirmation.
- Floating action button for creating new posts.

### 2. **Create Post**
- Allows users to create and save new posts.
- Includes input fields with placeholder text and localized labels.

### 3. **Profile**
- Fetches random user data from an API and displays it with an edit and logout option.
- Styled with a profile image, name, and email display.

### 4. **Settings**
- Change app language dynamically.
- Allows users to switch between English and Spanish.

### 5. **Users**
- Displays a list of users fetched from an API (future implementation).


