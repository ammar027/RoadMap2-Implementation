import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { addPost } from '../src/redux/postsSlice';
import { useTranslation } from 'react-i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';

function Details({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);
      }
    });
  };

  const handleCreatePost = () => {
    if (!title || !content) {
      alert('Title and content are required!');
      return;
    }
    const newPost = { 
      title, 
      content, 
      imageUri: imageUri || null 
    };
    console.log('Adding new post:', newPost);
    dispatch(addPost(newPost));
    navigation.navigate('Home');
  };

  const handleRemoveImage = () => {
    setImageUri(null);
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
      
      {/* Image Upload Section */}
      <View style={styles.imageUploadContainer}>
        <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePicker}>
          <FontAwesome name="image" size={20} color="#007AFF" />
          <Text style={styles.imagePickerText}>  {t('upload_image')}</Text>
        </TouchableOpacity>
        
        {imageUri && (
          <View style={styles.imagePreviewContainer}>
            <Image 
              source={{ uri: imageUri }} 
              style={styles.imagePreview} 
              resizeMode="cover" 
            />
            <TouchableOpacity onPress={handleRemoveImage} style={styles.removeImageButton}>
              <FontAwesome name="trash" size={20} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        )}
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
  },
  imageUploadContainer: {
    marginBottom: 15,
  },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  imagePickerText: {
    color: '#007AFF',
    marginLeft: 10,
  },
  imagePreviewContainer: {
    marginTop: 10,
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 5,
  },
});

export default Details;