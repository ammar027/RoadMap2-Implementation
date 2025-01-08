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
  const [isEditing, setIsEditing] = useState(false);

  const handleGuestSignIn = () => {
    if (!guestName || !guestEmail) {
      Alert.alert('Missing Information', 'Please provide both name and email to sign in.');
      return;
    }
    dispatch(signInAction({ userName: guestName, userEmail: guestEmail }));
    Alert.alert('Guest Sign-In', `Welcome, ${guestName}!`);
  };

  const handleGuestSignOut = () => {
    dispatch(signOutAction());
    setGuestName('');
    setGuestEmail('');
    Alert.alert('Sign-Out Success', 'You have been signed out!');
  };

  const handleSaveChanges = () => {
    if (!guestName || !guestEmail) {
      Alert.alert('Missing Information', 'Name and email cannot be empty.');
      return;
    }
    dispatch(signInAction({ userName: guestName, userEmail: guestEmail }));
    setIsEditing(false);
    Alert.alert('Profile Updated', 'Your profile has been updated!');
  };

  const renderEditingStage = () => (
    <>
      <Text style={styles.title}>Edit Profile</Text>
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
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveChanges}
      >
        <Icon name="save" size={20} color="#fff" />
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setIsEditing(false)}
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
        style={styles.editButton}
        onPress={() => setIsEditing(true)}
      >
        <Icon name="edit" size={20} color="#fff" />
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={handleGuestSignOut}
      >
        <Icon name="logout" size={20} color="#fff" />
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </>
  );

  const renderSignedOutStage = () => (
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
    </>
  );

  return (
    <View style={styles.guestContainer}>
      {isSignedIn
        ? isEditing
          ? renderEditingStage()
          : renderSignedInStage()
        : renderSignedOutStage()}
    </View>
  );
};

const styles = StyleSheet.create({
  guestContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    width: '90%',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
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
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#4caf50',
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
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#2196f3',
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
