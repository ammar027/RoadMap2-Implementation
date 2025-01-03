import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch random user data from API
    fetch('https://randomuser.me/api/')
      .then((response) => response.json())
      .then((data) => {
        setUser(data.results[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, []);

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Edit Profile button clicked!');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Logout button clicked!');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.picture.large }} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.profileName}>
            {user.name.first} {user.name.last}
          </Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Icon name="edit" size={20} color="#fff" />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#fff" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
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
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center', // This ensures that the name and email are aligned horizontally with the image
    marginVertical: 24,
    width: '100%',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 20, // Added margin to separate the image from text
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  actionContainer: {
    width: '100%',
    marginTop: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 8,
  },
  logoutButton: {
    backgroundColor: 'tomato',
  },
  buttonText: {
    marginLeft: 12,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
