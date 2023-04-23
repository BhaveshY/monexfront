import React, {useEffect, useState} from 'react';
import {Box, HStack, Text, Button, Image, VStack, Pressable} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {StyleSheet, TextInput} from 'react-native';
import {getStore, removeStore} from '../libraries/store';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase';
import ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';

function Profile({navigation}) {
  var [email, setEmail] = useState(null);
  var [isEmailLoaded, setIsEmailLoaded] = useState(false);
  var [avatar, setAvatar] = useState(null);
  const [name, setName] = useState('John Doe');

  function logout() {
    auth.signOut().then(async signOutResult => {
      await removeStore('userLoggedIn');
      await removeStore('user');
      navigation.navigate('Login');
    });
  }
  const handleNameChange = newName => {
    setName(newName);
  };
  useEffect(() => {
    async function fetchEmail() {
      let user = await getStore('user');
      if (user.email) {
        setEmail(user.email);
        setAvatar(Array.from(user.email)[0]);
        setIsEmailLoaded(true);
      }
    }
    fetchEmail();
  }, []);
  // const profileImage = require('../assets/bsy.jpg');
  const [profileImage, setProfileImage] = useState(
    require('../assets/bsy.jpg'),
  );

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 500,
      maxWidth: 500,
      quality: 0.8,
    };

    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        setProfileImage(source);
      }
    });
  };

  return (
    <Box backgroundColor="white" h="100%" display="flex">
      <HStack style={styles.profileSection}>
        <Image
          size={49}
          borderRadius={100}
          source={profileImage}
          alt="User Profile Image"></Image>
        <VStack style={styles.profileDetailStack}>
          <TextInput
            style={styles.userName}
            placeholder="Enter new name"
            onChangeText={handleNameChange}
            value={name}
          />
          <Text style={styles.userEmail}>{email}</Text>
        </VStack>
      </HStack>

      <Box padding="10px" marginTop={'17px'} flexGrow={1}>
        <Pressable onPress={handleImagePicker}>
          <HStack style={styles.menuItem} alignItems={'center'}>
            <MaterialIcons name="image" size={24} color="#000"></MaterialIcons>
            <Text fontSize={'17px'} ml="10px">
              Change Profile Picture
            </Text>
          </HStack>
        </Pressable>
        <Pressable>
          <HStack style={styles.menuItem} alignItems={'center'}>
            <MaterialIcons name="person" size={24} color="#000"></MaterialIcons>
            <Text fontSize={'17px'} ml="10px">
              Edit Profile
            </Text>
          </HStack>
        </Pressable>
      </Box>

      <Button variant="unstyled" onPress={logout} style={styles.logoutButton}>
        <Text fontSize={'16px'} fontWeight={500}>
          Logout
        </Text>
      </Button>
    </Box>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    padding: 19,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderColor: '#e6e6e6',
  },
  userName: {
    fontSize: 19,
    lineHeight: 19.2,
    fontWeight: '500',
  },
  userEmail: {
    fontSize: 16,
    lineHeight: 19.2,
    color: '#737278',
  },
  profileDetailStack: {
    marginLeft: 16,
  },
  menuItem: {
    borderRadius: 10,
    backgroundColor: '#F6F6F6',
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 12,
    paddingRight: 12,
  },
  logoutButton: {
    margin: 10,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 500,
    backgroundColor: '#FFFFFF',
    color: '#000000',
    borderColor: '#E7E7E7',
    borderWidth: 2,
    borderRadius: 8,
    shadowColor: '#E7E7E7',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    elevation: 4,
  },
});

export default Profile;
