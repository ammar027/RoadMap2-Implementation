import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/redux/store';
import HomeScreen from './screens/Home';
import Details from './screens/Create';
import ProfileScreen from './screens/Profile';
import SettingsScreen from './screens/Settings';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import UserPage from './screens/User';
import CounterJotai from './screens/counterScreen';
import Chats from './screens/Chats';
import crashlytics from '@react-native-firebase/crashlytics';
import BootSplash from "react-native-bootsplash";
import { BlurView } from '@react-native-community/blur';
import { TransitionPresets } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AppTheme = {
  colors: {
    primary: '#007AFF',
    background: '#F5F5F5',
    textPrimary: '#333',
    textSecondary: 'gray',
    border: '#DDD',
  },
  fonts: {
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    label: {
      fontSize: 16,
    },
  },
};



function TabNavigator() {
  const { t } = useTranslation();



  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            const icons = {
              Home: focused ? 'home' : 'home',
              Create: focused ? 'edit' : 'edit',
              Users: focused ? 'people' : 'people-outline',
              'My Profile': focused ? 'person' : 'person-outline',
            };
          
            return <Icon name={icons[route.name]} size={size} color={color} />;
          },
          
          tabBarActiveTintColor: AppTheme.colors.primary,
          tabBarInactiveTintColor: AppTheme.colors.textSecondary,
          tabBarStyle: styles.tabBarStyle,
          tabBarBackground: () => (
            <BlurView
              style={styles.tabBarBackground}
              blurType="light"
              blurAmount={20}
              reducedTransparencyFallbackColor="white"
            />
          ),
          headerShown: route.name !== 'Home',
          headerTitleAlign: 'center',
          headerTitleStyle: [
            AppTheme.fonts.title,
            { color: AppTheme.colors.textPrimary },
          ],
        })
        
      }
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Create" component={Details} />
        <Tab.Screen name="Users" component={UserPage} />
        <Tab.Screen name="My Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </View>
  );
}

function ModalStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'modal',
        gestureEnabled: true, // Enables swipe gestures to dismiss modals
        ...TransitionPresets.FadeFromBottomAndroid, // Use predefined animation
      }}
    >
      <Stack.Screen
        name="HomeTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Create"
        component={Details}
        options={{
          title: 'Create Item',
          headerShown: true,
          ...TransitionPresets.FadeFromBottomAndroid, // Add fade animation for this screen
        }}
      />
      <Stack.Screen
        name="Chats"
        component={Chats}
        options={{
          title: 'Chats',
          headerShown: true,
          ...TransitionPresets.SlideFromRightIOS, // Slide animation for Chats
        }}
      />
    </Stack.Navigator>
  );
}


export default function App() {
  useEffect(() => {
    // Initialize Crashlytics
    crashlytics().log('App started');

    // Set user information for debugging
    crashlytics().setUserId('12345'); // Replace with dynamic user ID if available
    crashlytics().setAttributes({
      role: 'developer',
      environment: 'production',
    });

    // Test crashlytics functionality (use cautiously)
    // crashlytics().crash(); // Uncomment to simulate a crash
  }, []);




  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
        BootSplash.hide({ fade: true }); // Ensure splash is hidden
    }, 2000); // Adjust the timeout as needed
}, []);

// useEffect(() => {
//   if (Platform.OS === 'android') {
//     // Make sure navigation bar icons are dark
//     StatusBar.setNavigationBarColor('#F5F5F5');  // Set the navigation bar color
//     StatusBar.setNavigationBarDividerColor('#F5F5F5');  // Divider color to match the background
//     StatusBar.setTranslucent(false);  // Ensure the navigation bar isn't translucent
//     if (typeof StatusBar.setNavigationBarIconColor === 'function') {
//       StatusBar.setNavigationBarIconColor('black');  // Set navigation bar button icons to black
//     }
//   }
// }, []);


  return (
    <GestureHandlerRootView>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Tabs"
            drawerPosition="left"
            screenOptions={{
              headerShown: false,
              drawerActiveTintColor: '#007AFF',
              drawerInactiveTintColor: 'gray',
              drawerLabelStyle: { fontSize: 16 },
              drawerStyle: { backgroundColor: '#f8f9fa', width: 250 },
            }}
          >
            <Drawer.Screen 
              name="Tabs"
              component={ModalStack}
              options={{
                title: 'Home Tabs',
                drawerIcon: ({ color, size }) => (
                  <Icon name="view-module" size={size} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                title: 'Profile',
                drawerIcon: ({ color, size }) => (
                  <Icon name="person" size={size} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="Counter"
              component={CounterJotai}
              options={{
                title: 'Counter',
                drawerIcon: ({ color, size }) => (
                  <Icon name="add" size={size} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                title: 'Settings',
                drawerIcon: ({ color, size }) => (
                  <Icon name="settings" size={size} color={color} />
                ),
              }}
            />
            
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarStyle: {
    borderTopWidth: 0.5,
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderTopColor: AppTheme.colors.border,
    overflow: 'hidden', // Add this to clip the blur effect
    zIndex: 0,
  },
  tabBarBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%', // Change to 100% to fill only the tab bar
    width: '100%',
  },
  drawerStyle: {
    backgroundColor: AppTheme.colors.background,
    width: 250,
  },
});
