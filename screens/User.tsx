import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../src/redux/userSlice';

const UserPage = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.users);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers()); // Trigger saga to fetch users
  }, [dispatch]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchUsers());
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
  data={data}
  keyExtractor={(item) => item.login.uuid}
  renderItem={({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.picture.medium }} style={styles.profileImage} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {item.name.first} {item.name.last}
        </Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </View>
  )}
  contentContainerStyle={{ paddingBottom: 60 }} // Add bottom padding here
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={['#4A90E2']}
      progressBackgroundColor="#ffffff"
    />
  }
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    paddingBottom:0,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
});

export default UserPage;
