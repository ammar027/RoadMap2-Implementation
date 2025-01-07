import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import installations from '@react-native-firebase/installations';


import analytics from '@react-native-firebase/analytics';
import { getInAppMessaging } from './../node_modules/@react-native-firebase/in-app-messaging/lib/modular/index';
analytics().logEvent('view_product', { product_id: '123' });



const Chats = () => {
  useEffect(() => {
    getDeviceTokenAndInstallationID();

    getInAppMessaging().setMessagesDisplaySuppressed(false);

    // Log custom events to trigger campaigns
    analytics().logEvent('app_open');
  }, []);
  

  const getDeviceTokenAndInstallationID = async () => {
    try {
      // Get the messaging token
      const messagingToken = await messaging().getToken();
      console.log('Messaging token:', messagingToken);

      // Get the installation token
      const installationToken = await installations().getToken(/* forceRefresh */ true);
      console.log('Installation token:', installationToken);

      // Get the installation ID
      const installationID = await installations().getId();
      console.log('Installation ID:', installationID);
    } catch (error) {
      console.error('Error fetching device tokens or installation ID:', error);
    }
  };

  return (
    <View>
      <Text>Chats</Text>
    </View>
  );
};

export default Chats;
