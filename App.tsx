import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import store, { persistor } from './src/redux/store'; // Import persistor
import HomeScreen from './screens/Home';
import Details from './screens/Create';
import ProfileScreen from './screens/Profile';
import SettingsScreen from './screens/Settings';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import UserPage from './screens/User';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


function TabNavigator({ navigation }) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="white" barStyle="dark-content" />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Create') iconName = 'create';
            else if (route.name === 'My Profile') iconName = 'person';
            else if (route.name === 'Users') iconName = 'people';

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0.5,
            borderTopColor: '#ddd',
            height: 60,
          },
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '650',
            color: '#333',
          },
          headerLeft: () =>
            route.name !== 'Home' ? (
              <Icon
                name="arrow-back"
                size={24}
                color="#007AFF"
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 10 }}
              />
            ) : null,
          headerRight: () => (
            <Icon
              name="menu"
              size={26}
              color="#000"
              onPress={() => navigation.toggleDrawer()}
              style={{ marginRight: 10 }}
            />
          ),
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Create" component={Details} />
        <Tab.Screen name="Users" component={UserPage} />
        <Tab.Screen name="My Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
          <Drawer.Navigator
            initialRouteName="Tabs"
            drawerPosition="right"  // Make sure the drawerPosition is set to 'right'
            screenOptions={{
              headerShown: false,
              drawerActiveTintColor: 'skyblue',
              drawerInactiveTintColor: 'gray',
            }}
          >
            <Drawer.Screen
              name="Tabs"
              component={TabNavigator}
              options={{
                title: 'Home Tabs',
                drawerIcon: ({ color, size }) => <Icon name="view-module" size={size} color={color} />,
              }}
            />
            <Drawer.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                title: 'Profile',
                drawerIcon: ({ color, size }) => <Icon name="person" size={size} color={color} />,
              }}
            />
            <Drawer.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                title: 'Settings',
                drawerIcon: ({ color, size }) => <Icon name="settings" size={size} color={color} />,
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0, // No margin
    padding: 0,
  },
});
