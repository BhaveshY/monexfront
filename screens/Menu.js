import React, { useEffect, useState } from 'react';
import { Box, HStack, Text, Button, Image, VStack, Pressable, Modal, FormControl, Input } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { StyleSheet, TextInput } from 'react-native';
import { getStore, removeStore, setStore } from '../libraries/store';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
const profileImage = require('../assets/bsy.jpg');

function Profile({ navigation }) {
  const [showUserNameModal, setShowUserNameModal] = useState(false)
  var [email, setEmail] = useState(null);
  var [isEmailLoaded, setIsEmailLoaded] = useState(false);
  var [avatar, setAvatar] = useState(null);
  var tempName = ""
  const [username, setUserName] = useState('no username');

  function logout() {
    auth.signOut().then(async signOutResult => {
      await removeStore('userLoggedIn');
      await removeStore('user');
      navigation.navigate('Login');
    });
  }
  async function handleSaveName() {
    let user = await getStore('user');
    if (user) {
      user.username = tempName
      setStore('user', user)
      setUserName(user.username);
      setShowUserNameModal(false)
    }
  };
  useEffect(() => {
    async function fetchEmail() {
      let user = await getStore('user');
      if (user.email) {
        setEmail(user.email);
        setAvatar(Array.from(user.email)[0]);
        setIsEmailLoaded(true);
      }
      if(user.username) setUserName(user.username)
    }
    fetchEmail();
  }, []);

  return (
    <Box backgroundColor="white" h="100%" display="flex">
      <HStack style={styles.profileSection}>
        <Image
          size={49}
          borderRadius={100}
          source={profileImage}
          alt="User Profile Image"></Image>
        <VStack style={styles.profileDetailStack}>
          {/* <TextInput
            style={styles.userName}
            placeholder="Enter new name"
            onChangeText={handleNameChange}
            value={name}
          /> */}
          <HStack alignItems={'center'}>
            <Text style={styles.userName}>{username}</Text>
            <Pressable style={{ marginLeft: 12 }} onPress={() => setShowUserNameModal(true)}>
              <Text>
                <MaterialIcons name="edit" size={18} color="blue"></MaterialIcons>
              </Text>
            </Pressable>

          </HStack>

          <Text style={styles.userEmail}>{email}</Text>
        </VStack>
      </HStack>

      <Box padding="10px" marginTop={'17px'} flexGrow={1}>
        <Pressable>
          <HStack style={styles.menuItem} alignItems={'center'}>
            <Pressable>
              <Text>
                <MaterialIcons name="person" size={24} color="#000"></MaterialIcons>
              </Text>
            </Pressable>

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

      <Modal isOpen={showUserNameModal} onClose={() => setShowUserNameModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Edit username</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input onChangeText={(input) => { tempName = input }} />
            </FormControl>

          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setShowUserNameModal(false);
              }}>
                Cancel
              </Button>
              <Button onPress={handleSaveName}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
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
