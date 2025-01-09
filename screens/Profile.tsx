import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { signIn as signInAction, signOut } from '../src/redux/userdataSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeModules } from 'react-native';
import GuestLogin from './Geustlogin';
import FacebookProfile from './FbProScrn';
import { Divider } from 'react-native-paper';
const { LoginModule } = NativeModules;

type GoogleUser = {
  name: string;
  email: string;
  photo: string;
};

const ProfileScreen = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFbLoggedIn, setIsFbLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const { isSignedIn, userName, userEmail } = useSelector(state => state.userdata);
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '72666036321-qpf7p03d83iujevsedip3i0u2d2j3mph.apps.googleusercontent.com', // Replace with your actual Web Client ID
      scopes: ['openid', 'profile', 'email'],
    });

    // Load user data from AsyncStorage if available
    const loadUserData = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error('Failed to load user data', e);
      }
    };

    loadUserData();
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo && userInfo.data && userInfo.data.user) {
        const { user } = userInfo.data;
        console.table({
          'Name': user.name || 'No name available',
          'Email': user.email || 'No email available',
          'Photo URL': user.photo || 'https://via.placeholder.com/120',
        });

        setUser({
          name: user.name || 'No name available',
          email: user.email || 'No email available',
          photo: user.photo || 'https://via.placeholder.com/120',
        });

        // Save user data to AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } else {
        setError('User info is not available');
      }
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setError('Something went wrong with Google Sign-In');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null);
      await AsyncStorage.removeItem('user'); // Remove user data from AsyncStorage
    } catch (error) {
      console.error('Sign out error:', error);
      setError('Error during sign-out');
    }
  };

  // Custom Login/Signup functions
  const handleShowLoginScreen = () => {
    LoginModule.showLoginScreen();
  };

  const handleShowSignupScreen = () => {
    LoginModule.showSignupScreen();
  };

  return (
    <SafeAreaView style={styles.container}>
      {user ? (
        <View style={styles.profileContainer}>
          <Image source={{ uri: user.photo }} style={styles.profileImage} />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
  
          <TouchableOpacity style={styles.button} onPress={handleGoogleSignOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actionContainer}>
          <GuestLogin />
          <View style={styles.horizontalDivider} />
          <FacebookProfile />
          <GoogleSigninButton
            style={styles.signInButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogleLogin}
          />
          <View style={styles.horizontalDivider} />
          <View style={styles.sideBySideButtons}>
  <TouchableOpacity
    style={[styles.button, styles.signupButton]}
    onPress={handleShowSignupScreen}
  >
    <Icon name="person-add" size={20} color="#fff" />
    <Text style={styles.buttonText}>Signup</Text>
  </TouchableOpacity>

  {/* Vertical Divider */}
  <View style={styles.verticalDivider} />

  <TouchableOpacity
    style={[styles.button, styles.loginButton]}
    onPress={handleShowLoginScreen}
  >
    <Icon name="login" size={20} color="#fff" />
    <Text style={styles.buttonText}>Login</Text>
  </TouchableOpacity>
</View>
        </View>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    // borderWidth: 0.3,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    padding: 16,
    elevation: 4, // For shadow effect on Android
    shadowColor: '#000', // For shadow on iOS
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  verticalDivider: {
    width: 1, // Thickness of the divider
    backgroundColor: 'black', // Divider color
    marginHorizontal: 10, // Space around the divider
    alignSelf: 'stretch', // Stretch to match the height of the parent container
  },
  horizontalDivider: {
    height: 1, // Thickness of the divider
    backgroundColor: '#ddd', // Divider color
    width: '100%', // Width of the divider
    marginVertical: 10, // Space around the divider
  },  
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  signInButton: {
    width: '75%', // Make the button width adaptive
    height: 48,
    marginVertical: 8,
    borderWidth: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
    width: '45%', // Each button takes 45% of the row
  },
  signupButton: {
    backgroundColor: '#34A853',
  },
  loginButton: {
    backgroundColor: '#4285F4',
  },
  buttonText: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
    width: '100%',
  },
  sideBySideButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%', // Adjust the container width
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingBottom: 5,
    paddingLeft: 7,
  },
});


export default ProfileScreen;
