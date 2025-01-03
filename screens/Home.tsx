import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../src/redux/postsSlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function HomeScreen({ navigation }) {
  const posts = useSelector((state) => state.posts);
  const { isSignedIn, userName } = useSelector((state) => state.userdata);
  const dispatch = useDispatch();

  const handleDeletePost = (index) => {
    dispatch(deletePost(index));
    Alert.alert('Post Deleted', 'Post has been removed.');
  };

  const renderPost = ({ item, index }) => (
    <View style={styles.post}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text>{item.content}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeletePost(index)}>
        <FontAwesome name="trash" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {!isSignedIn && (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>Please log in to view posts.</Text>
        </View>
      )}
      {isSignedIn && (
        <>
          <Text style={styles.welcomeText}>Welcome, {userName} 😊</Text>
          <View style={styles.postcontainer}>
          <Text style={styles.title}>Posts</Text>
          {posts.length === 0 ? (
            <Text style={styles.emptyText}>No posts available.</Text>
          ) : (
            <FlatList
              data={posts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderPost}
            />
          )}
          </View>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Create')}>
            <FontAwesome name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA', paddingHorizontal: 16, paddingVertical: 15 },
  postcontainer: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingVertical: 1, borderRadius: 15, borderWidth: 0.2,  },
  title: { fontSize: 20, fontWeight: '500', marginBottom: 20, marginTop: 20, paddingStart: 5 },
  notification: { backgroundColor: '#FFE4B5', padding: 10, borderRadius: 5, marginBottom: 10 },
  notificationText: { fontSize: 14, color: '#FF4500', textAlign: 'center' },
  welcomeText: { fontSize: 22, fontWeight: '700', marginBottom: 20, marginTop: 0, paddingStart: 5 },
  post: { padding: 15, borderRadius: 13, borderWidth: 0.3, borderColor: '#474747', backgroundColor: '#FFFFFF', marginBottom: 12, position: 'relative' },
  postTitle: { fontSize: 20, fontWeight: '500', marginBottom: 12 },
  deleteButton: { position: 'absolute', top: 10, right: 10, backgroundColor: '#FF6C6C', borderRadius: 30, padding: 10 },
  addButton: { position: 'absolute', bottom: 15, right: 10, backgroundColor: '#4A90E2', padding: 15, borderRadius: 15, width: 60, height: 60, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#9C9C9C', textAlign: 'center', marginTop: 20 },
});

export default HomeScreen;
