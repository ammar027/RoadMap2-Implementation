import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FacebookProfile = ({ onLogin, onLogout }) => {
  const [fbUser, setFbUser] = useState(null);
  const [error, setError] = useState('');

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
        setError('Failed to get access token');
        return;
      }

      // Fetch user details from Facebook Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${data.accessToken}`
      );
      const profile = await response.json();

      setFbUser({
        name: profile.name,
        email: profile.email || 'Email not available',
        photo: profile.picture?.data?.url || 'https://via.placeholder.com/120',
      });
    } catch (err) {
      console.error('Facebook Login Error:', err);
      setError('Facebook Login Failed');
    }
  };

  const handleFacebookLogout = () => {
    LoginManager.logOut();
    setFbUser(null);
  };

  if (fbUser) {
    return (
      <View style={styles.profileContainer}>
        <Image source={{ uri: fbUser.photo }} style={styles.profileImage} />
        <Text style={styles.userName}>{fbUser.name}</Text>
        <Text style={styles.userEmail}>{fbUser.email}</Text>
        <TouchableOpacity style={styles.button} onPress={handleFacebookLogout}>
          <Icon name="logout" size={20} color="#fff" />
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.fbButton} onPress={handleFacebookLogin}>
      <Icon name="facebook" size={20} color="#fff" />
      <Text style={styles.buttonText}>  Continue with Facebook</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  fbButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1877F2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    elevation: 4, // Adds slight shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    width: '70%',
  },
  button: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  },
});

export default FacebookProfile;
