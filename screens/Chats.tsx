import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import installations from '@react-native-firebase/installations';
import analytics from '@react-native-firebase/analytics';
import { getInAppMessaging } from '@react-native-firebase/in-app-messaging';

const Chats = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello, how are you?', sender: 'John Doe' },
    { id: '2', text: 'Hey, long time no see!', sender: 'Jane Smith' },
    { id: '3', text: 'Can we meet tomorrow?', sender: 'Alice Brown' },
  ]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Request permission for notifications
    requestNotificationPermission();

    // Set up notification listeners
    const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('New Notification', JSON.stringify(remoteMessage.notification));
    });

    const unsubscribeBackground = messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Notification caused app to open from background state:', remoteMessage.notification);
    });

    // Fetch device token and profiles
    getDeviceTokenAndInstallationID();
    fetchProfiles();

    // Enable in-app messaging and log app_open event
    getInAppMessaging().setMessagesDisplaySuppressed(false);
    analytics().logEvent('app_open');

    return () => {
      unsubscribeForeground();
    };
  }, []);

  const requestNotificationPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission granted:', authStatus);
    } else {
      console.error('Notification permission not granted');
    }
  };

  const getDeviceTokenAndInstallationID = async () => {
    try {
      const messagingToken = await messaging().getToken();
      console.log('Messaging token:', messagingToken);

      const installationToken = await installations().getToken(true);
      console.log('Installation token:', installationToken);

      const installationID = await installations().getId();
      console.log('Installation ID:', installationID);
    } catch (error) {
      console.error('Error fetching device tokens or installation ID:', error);
    }
  };

  const fetchProfiles = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=3');
      const data = await response.json();
      setProfiles(data.results);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const renderChatItem = ({ item, index }) => {
    const profile = profiles[index]; // Match the profile with message index
    return (
      <View style={styles.chatItem}>
        {profile && (
          <Image source={{ uri: profile.picture.thumbnail }} style={styles.profileImage} />
        )}
        <View style={styles.chatContent}>
          <Text style={styles.senderName}>{profile ? `${profile.name.first} ${profile.name.last}` : item.sender}</Text>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={styles.chatList}
      />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatContent: {
    flex: 1,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  messageText: {
    fontSize: 14,
    color: '#666',
  },
  chatList: {
    paddingBottom: 20,
  },
});
