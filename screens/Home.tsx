import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../src/redux/postsSlice'; // Import deletePost action
import { useTranslation } from 'react-i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function HomeScreen({ navigation }) {
  const posts = useSelector(state => state.posts); // Access posts from Redux state
  const dispatch = useDispatch(); // Dispatch actions to Redux
  const { t } = useTranslation();

  const handleDeletePost = (index: any) => {
    dispatch(deletePost(index)); // Dispatch delete action for the post
    Alert.alert(t('post_deleted'), t('post_removed'));
  };

  const renderPost = ({ item, index }) => (
    <View style={styles.post}>
      
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text>{item.content}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeletePost(index)}
      >
        <FontAwesome name="trash" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('post_title')}</Text>
      {posts.length === 0 ? (
        <Text style={styles.emptyText}>{t('no_posts')}</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderPost}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Create')}
      >
        <FontAwesome name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    marginTop: 20,
    paddingStart: 5,

  },
  post: {
    padding: 15,
    borderRadius: 13,
    borderWidth: 0.3,
    borderColor: '#474747',
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    position: 'relative',
  },
  postTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 12,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF6C6C',
    borderRadius: 30,
    padding: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 15,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#9C9C9C',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
