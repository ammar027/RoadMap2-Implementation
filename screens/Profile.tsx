import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, signOut } from '../src/redux/userdataSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  const { isSignedIn, userName, userEmail } = useSelector((state) => state.userdata);
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(signIn({ userName: 'John Doe', userEmail: 'john.doe@example.com' }));
    Alert.alert('Signed In', 'You are now signed in!');
  };

  const handleSignOut = () => {
    dispatch(signOut());
    Alert.alert('Signed Out', 'You have been signed out!');
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
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profileEmail}>{userEmail}</Text>
          </View>
          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleSignOut}>
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
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f9', alignItems: 'center', padding: 16 },
  profileContainer: { alignItems: 'center', marginVertical: 24 },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 16 },
  textContainer: { alignItems: 'center', marginBottom: 24 },
  profileName: { fontSize: 26, fontWeight: '700', color: '#333' },
  profileEmail: { fontSize: 16, color: '#666' },
  actionContainer: { justifyContent: 'center', alignItems: 'center', flex: 1 },
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'skyblue', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 8 },
  logoutButton: { backgroundColor: 'tomato' },
  buttonText: { marginLeft: 12, color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default ProfileScreen;
