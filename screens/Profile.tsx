import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  NativeModules,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, signOut } from '../src/redux/userdataSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';


const { LoginModule } = NativeModules; // Access your native module


const ProfileScreen = () => {
  const { isSignedIn, userName, userEmail } = useSelector(state => state.userdata);
  const dispatch = useDispatch();

  
  const [editableName, setEditableName] = useState(userName);
  const [editableEmail, setEditableEmail] = useState(userEmail);
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  
  const checkLoginStatus = async () => {
    try {
      const isSignedIn = await LoginModule.checkLoginStatus();
      if (isSignedIn) {
        const userName = await LoginModule.getUserName(); // If exposed
        const userEmail = await LoginModule.getUserEmail(); // If exposed
        dispatch(signIn({ userName, userEmail }));
      } else {
        dispatch(signOut());
      }
    } catch (error) {
    }
  };
  
  useEffect(() => {
    checkLoginStatus();
  }, []); // Empty dependency array, runs only once after the initial render
  
  useEffect(() => {
    GoogleSignin.configure({webClientId:'72666036321-qpf7p03d83iujevsedip3i0u2d2j3mph.apps.googleusercontent.com'})
  })
    


  const handleSignIn = () => {
    dispatch(signIn({ userName: editableName, userEmail: editableEmail }));
    Alert.alert('Signed In', 'You are now signed in!');
  };

  const handleSignOut = () => {
    dispatch(signOut());
    Alert.alert('Signed Out', 'You have been signed out!');
  };

  const handleSaveChanges = () => {
    dispatch(signIn({ userName: editableName, userEmail: editableEmail }));
    setIsEditing(false); // Exit edit mode after saving
    Alert.alert('Profile Updated', 'Your profile has been updated successfully!');
  };

  const handleShowLoginScreen = () => {
    LoginModule.showLoginScreen(); // Call the native method
  };

  const handleShowSignupScreen = () => {
    LoginModule.showSignupScreen(); // Call the native method
  };

  return (
    <SafeAreaView style={styles.container}>
      {isSignedIn ? (
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
            style={styles.profileImage}
          />
          <View style={styles.textContainer}>
            {isEditing ? (
              <>
                <TextInput
                  style={styles.profileName}
                  value={editableName}
                  onChangeText={setEditableName}
                />
                <TextInput
                  style={styles.profileEmail}
                  value={editableEmail}
                  onChangeText={setEditableEmail}
                  keyboardType="email-address"
                />
              </>
            ) : (
              <>
                <Text style={styles.profileName}>{editableName}</Text>
                <Text style={styles.profileEmail}>{editableEmail}</Text>
              </>
            )}
          </View>
          {isEditing ? (
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSaveChanges}>
              <Icon name="save" size={20} color="#fff" />
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={() => setIsEditing(true)} // Enable editing
            >
              <Icon name="edit" size={20} color="#fff" />
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={handleSignOut}>
            <Icon name="logout" size={20} color="#fff" />
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Icon name="login" size={20} color="#fff" />
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.signupButton]}
            onPress={handleShowSignupScreen} // Trigger native signup screen
          >
            <Icon name="person-add" size={20} color="#fff" />
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={handleShowLoginScreen} // Trigger native login screen
          >
            <Icon name="login" size={20} color="#fff" />
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.signupButton]}
            onPress={} // Trigger native signup screen
          >
            <Icon name="person-add" size={20} color="#fff" />
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={} // Trigger native login screen
          >
            <Icon name="login" size={20} color="#fff" />
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
    alignItems: 'center',
    padding: 16,
  },
  profileContainer: { alignItems: 'center', marginVertical: 24 },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 16 },
  textContainer: { alignItems: 'center', marginBottom: 24 },
  profileName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    padding: 10,
    borderBottomWidth: 1,
    width: 200,
    textAlign: 'center',
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    borderBottomWidth: 1,
    width: 300,
    textAlign: 'center',
    padding: 10,
  },
  actionContainer: { justifyContent: 'center', alignItems: 'center', flex: 1 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
  },
  signupButton: { backgroundColor: 'purple' },
  loginButton: { backgroundColor: 'green' },
  editButton: { backgroundColor: 'orange', marginBottom: 12 },
  saveButton: { backgroundColor: 'green', marginBottom: 12 },
  logoutButton: { backgroundColor: 'tomato' },
  buttonText: { marginLeft: 12, color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default ProfileScreen;
