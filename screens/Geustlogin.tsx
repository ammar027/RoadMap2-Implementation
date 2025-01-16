import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { signIn as signInAction, signOut as signOutAction } from '../src/redux/userdataSlice';

const GuestLogin = () => {
  const { isSignedIn, userName, userEmail } = useSelector((state) => state.userdata);
  const dispatch = useDispatch();

  const [guestName, setGuestName] = useState(userName || '');
  const [guestEmail, setGuestEmail] = useState(userEmail || '');
  const [currentStage, setCurrentStage] = useState('initial'); // "initial", "prompt", "signedIn"

  const handleGuestSignIn = () => {
    if (!guestName || !guestEmail) {
      Alert.alert('Missing Information', 'Please provide both name and email to sign in.');
      return;
    }
    dispatch(signInAction({ userName: guestName, userEmail: guestEmail }));
    setCurrentStage('signedIn');
    Alert.alert('Guest Sign-In', `Welcome, ${guestName}!`);
  };

  const handleGuestSignOut = () => {
    dispatch(signOutAction());
    setGuestName('');
    setGuestEmail('');
    setCurrentStage('initial');
    Alert.alert('Sign-Out Success', 'You have been signed out!');
  };

  const renderInitialStage = () => (
    <View>
    <Text style={styles.sectiontext}>Social Signup</Text>
    <TouchableOpacity
      style={styles.signInButton}
      onPress={() => setCurrentStage('prompt')}
    >
      <Icon name="login" size={20} color="#fff" />
      <Text style={styles.buttonText}>Login as Guest</Text>
    </TouchableOpacity>
    </View>
  );

  const renderPromptStage = () => (
    <>
      <Text style={styles.title}>Guest Login</Text>
      <TextInput
        style={styles.input}
        value={guestName}
        onChangeText={setGuestName}
        placeholder="Enter Name"
      />
      <TextInput
        style={styles.input}
        value={guestEmail}
        onChangeText={setGuestEmail}
        placeholder="Enter Email"
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.signInButton} onPress={handleGuestSignIn}>
        <Icon name="login" size={20} color="#fff" />
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setCurrentStage('initial')}
      >
        <Icon name="cancel" size={20} color="#fff" />
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </>
  );

  const renderSignedInStage = () => (
    <>
      <Text style={styles.title}>Welcome, {guestName}!</Text>
      <Text style={styles.guestInfo}>Name: {guestName}</Text>
      <Text style={styles.guestInfo}>Email: {guestEmail}</Text>
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={handleGuestSignOut}
      >
        <Icon name="logout" size={20} color="#fff" />
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.guestContainer}>
      {currentStage === 'initial' && renderInitialStage()}
      {currentStage === 'prompt' && renderPromptStage()}
      {currentStage === 'signedIn' && renderSignedInStage()}
    </View>
  );
};

const styles = StyleSheet.create({
  guestContainer: {
    borderRadius: 10,
    padding: 0,
    margin: 10,
    alignItems: 'center',
    width: '90%',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  sectiontext: {
    fontSize: 13,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginVertical: 8,
    color: '#808080',
    textAlign: 'center', // Center the text horizontally
  },  
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#333',
  },
  guestInfo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  signInButton: {
    flexDirection: 'row',
    backgroundColor: '#6a1b9a',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  cancelButton: {
    flexDirection: 'row',
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  signOutButton: {
    flexDirection: 'row',
    backgroundColor: '#b71c1c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
});

export default GuestLogin;
