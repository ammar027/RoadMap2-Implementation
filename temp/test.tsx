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
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GuestLogin from './Geustlogin';

type User = {
  name: string;
  email: string;
  photo: string;
};

const ProfileScreen = () => {
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [fbUser, setFbUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID',
      scopes: ['openid', 'profile', 'email'],
    });
  }, []);

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = {
        name: userInfo.user.name,
        email: userInfo.user.email,
        photo: userInfo.user.photo,
      };
      setGoogleUser(user);
      await AsyncStorage.setItem('googleUser', JSON.stringify(user));
    } catch (err) {
      console.error('Google Login Error:', err);
      setError('Google Login Failed');
    }
  };

  const handleGoogleLogout = async () => {
    try {
      await GoogleSignin.signOut();
      setGoogleUser(null);
      await AsyncStorage.removeItem('googleUser');
    } catch (err) {
      console.error('Google Logout Error:', err);
    }
  };

  // Facebook Login
  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        console.log('Facebook Login Cancelled');
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        console.error('Failed to get Facebook access token');
        return;
      }

      // Fetch user details from Facebook Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${data.accessToken}`
      );
      const profile = await response.json();

      const user = {
        name: profile.name,
        email: profile.email || 'Email not available',
        photo: profile.picture?.data?.url || 'https://via.placeholder.com/120',
      };

      setFbUser(user);
    } catch (err) {
      console.error('Facebook Login Error:', err);
      setError('Facebook Login Failed');
    }
  };

  const handleFacebookLogout = () => {
    LoginManager.logOut();
    setFbUser(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Google Profile */}
      {googleUser ? (
        <View style={styles.profileContainer}>
          <Image source={{ uri: googleUser.photo }} style={styles.profileImage} />
          <Text style={styles.userName}>{googleUser.name}</Text>
          <Text style={styles.userEmail}>{googleUser.email}</Text>
          <TouchableOpacity style={styles.button} onPress={handleGoogleLogout}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <GoogleSigninButton
          style={styles.signInButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleLogin}
        />
      )}

      {/* Facebook Profile */}
      {fbUser ? (
        <View style={styles.profileContainer}>
          <Image source={{ uri: fbUser.photo }} style={styles.profileImage} />
          <Text style={styles.userName}>{fbUser.name}</Text>
          <Text style={styles.userEmail}>{fbUser.email}</Text>
          <TouchableOpacity style={styles.button} onPress={handleFacebookLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={[styles.button, styles.fbButton]} onPress={handleFacebookLogin}>
          <Icon name="facebook" size={20} color="#fff" />
          <Text style={styles.buttonText}>Continue with Facebook</Text>
        </TouchableOpacity>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  signInButton: {
    width: '80%',
    height: 48,
    marginVertical: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#3b5998',
    borderRadius: 8,
    marginVertical: 8,
  },
  fbButton: {
    backgroundColor: '#3b5998',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 16,
  },
});

export default ProfileScreen;
