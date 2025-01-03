import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

function CustomHeader() {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../assets/logo.png')}  // Replace with your logo's path
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
});

export default CustomHeader;
