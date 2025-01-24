import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {deletePost} from '../src/redux/postsSlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Ionicons} from 'react-native-vector-icons';

function HomeScreen({navigation}) {
  const posts = useSelector(state => state.posts);
  const {isSignedIn, userName} = useSelector(state => state.userdata);
  const dispatch = useDispatch();

  const notificationOpacity = useRef(new Animated.Value(0)).current;

  const showNotification = () => {
    Animated.timing(notificationOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(notificationOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 10000);
  };

  useEffect(() => {
    if (!isSignedIn) {
      showNotification();
    }
  }, [isSignedIn]);

  const handleDeletePost = index => {
    dispatch(deletePost(index));
    Alert.alert('Post Deleted', 'Post has been removed.');
  };

  const renderPost = ({item, index}) => (
    <View style={styles.post}>
      {item.imageUri && (
        <Image 
          source={{ uri: item.imageUri }} 
          style={styles.postImage} 
          resizeMode="cover" 
        />
      )}
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text>{item.content}</Text>
      
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeletePost(index)}>
        <FontAwesome name="trash" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {!isSignedIn && (
        <>
          <Animated.View
            style={[styles.notification, {opacity: notificationOpacity}]}>
            <Text style={styles.notificationText}>
              Please log in to view posts.🙂
            </Text>
          </Animated.View>
          <View style={styles.centerMessageContainer}>
            <Text style={styles.centerMessage}>Please log in to continue</Text>
          </View>
        </>
      )}

      {isSignedIn && (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={styles.drawerButton}>
              <MaterialIcons name="menu" size={26} color="#000" />
            </TouchableOpacity>
            <Text style={styles.welcomeText}>Welcome, {userName} 👋</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Chats')}
              style={styles.chatsButton}>
              <MaterialIcons name="chat" size={26} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.postContainer}>
            <Text style={styles.title}>Posts</Text>
            {posts.length === 0 ? (
              <Text style={styles.emptyText}>No posts available.</Text>
            ) : (
              <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderPost}
                contentContainerStyle={styles.flatListContent}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Create')}>
            <FontAwesome name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </>
      )}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 20,
  },
  chatsButton: {
    paddingTop:10,
    paddingRight: 15,
    color: '#4A90E2',
  },
  drawerButton: {
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 0,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    elevation: 0,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    flex: 1,
    paddingLeft: 5,
  },
  notification: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    zIndex: 10,
    alignSelf: 'center',
    marginBottom: 60,
  },
  notificationText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  centerMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerMessage: {
    fontSize: 18,
    color: '#9C9C9C',
    fontStyle: 'italic',
  },
  postContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom:60,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingBottom: 10,
    paddingLeft: 7,
  },
  emptyText: {
    fontSize: 16,
    color: '#9C9C9C',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
  post: {
    padding: 15,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
    position: 'relative',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 13,
    right: 10,
    backgroundColor: '#FF4D4D',
    borderRadius: 20,
    padding: 8,
    elevation: 3,
  },
  addButton: {
    position: 'absolute',
    bottom: 85,
    right: 25,
    backgroundColor: '#4A90E2',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  // New style for post image
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 0,
    marginBottom: 10,
  },
});

export default HomeScreen;