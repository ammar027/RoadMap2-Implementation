import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

const FacebookLoginButton = ({ onLoginSuccess, onLoginError }) => {
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
        onLoginError && onLoginError('Failed to get access token');
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

      onLoginSuccess && onLoginSuccess(user);
    } catch (err) {
      console.error('Facebook Login Error:', err);
      onLoginError && onLoginError('Facebook Login Failed');
    }
  };

  return (
    <TouchableOpacity style={styles.fbButton} onPress={handleFacebookLogin}>
      <Icon name="facebook" size={20} color="#fff" />
      <Text style={styles.buttonText}>Continue with Facebook</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fbButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#3b5998',
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default FacebookLoginButton;
