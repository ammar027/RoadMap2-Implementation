import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { addPost } from '../src/redux/postsSlice'; // Import action
import { useTranslation } from 'react-i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function Details({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch(); // Get dispatch function
  const { t } = useTranslation();

  const handleCreatePost = () => {
    if (!title || !content) {
      alert('Title and content are required!');
      return;
    }
    const newPost = { title, content };
    console.log('Adding new post:', newPost); // Log the new post data
    dispatch(addPost(newPost)); // Dispatch action to add post
    navigation.navigate('Home');
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('create_new_post')}</Text>
      
      {/* Title Input Field */}
      <View style={styles.inputContainer}>
        <FontAwesome name="pencil" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={[styles.input, styles.textInput]}
          placeholder={t('post_title_placeholder')}
          value={title}
          onChangeText={setTitle}
        />
      </View>
      
      {/* Content Input Field */}
      <View style={styles.inputContainer}>
        <FontAwesome name="edit" size={20} color="#999" style={styles.icon2} />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder={t('post_content_placeholder')}
          value={content}
          onChangeText={setContent}
          multiline
        />
      </View>
      
      {/* Create Post Button */}
      <TouchableOpacity style={styles.button} onPress={handleCreatePost}>
        <FontAwesome name="check" size={20} color="#fff" />
        <Text style={styles.buttonText}>  {t('create_post_button')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',  // Adjusted to align icon and input vertically
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingLeft: 10,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 35,  // Adds space for the icon
  },
  textInput: {
    height: 40,  // Define a specific height for title input
  },
  textArea: {
    height: 120,  // Set a fixed height for the content input
    textAlignVertical: 'top',  // Align text to the top of the area
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  icon: {
    position: 'absolute',
    left: 16,
    top: '50%',
  },
  icon2: {
    position: 'absolute',
    left: 16,
    top: '22.5%',
  }
});

export default Details;
