import {Text,Box,HStack,Image,Button,ChevronLeftIcon,VStack,Badge,Divider,AlertDialog,Alert,useToast, Center, View, Modal, FormControl, Input, Pressable,} from "native-base";
import moment from "moment";
import {useEffect, useState,useCallback } from "react";
import post from "../libraries/post";
import { getStore, removeStore, setStore } from '../libraries/store';
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
const profileImage = require('../assets/bsy.jpg');

export default function TransactionDetails({ navigation }) {

  var tempName = ""
  const [username, setUserName] = useState('no username');
  const [showUserNameModal, setShowUserNameModal] = useState(false)
  
  async function handleSaveName() {
    let user = await getStore('user');
    if (user) {
      user.username = tempName
      setStore('user', user)
      setUserName(user.username);
      setShowUserNameModal(false)
    }
  };

  useFocusEffect(useCallback(()=>{
    async function fetchUsername() {
      let user = await getStore('user');
      if(user.username) setUserName(user.username)
    }
    fetchUsername();
  },[]))

  return (
    <Box bg="#fff" h="100%" padding="24px">
      <HStack alignItems="center">
        <Button
          rounded="50"
          padding="0"
          onPress={() => navigation.goBack()}
          variant="ghost"
        >
          <ChevronLeftIcon></ChevronLeftIcon>
        </Button>
        <Text fontSize={"20px"} marginLeft="24px">
          Edit Profile
        </Text>
      </HStack>

      <Center mt={'24px'}>
        <View><Image
          size={150}
          borderRadius={100}
          source={profileImage}
          alt="User Profile Image"></Image>

            <View style={{position:'absolute',bottom:0,right:0,backgroundColor:'#2563EB',height:50,width:50,borderRadius:50}}>
              <Center h={'full'}>
              <MaterialIcons name="camera" size={18} color="white"></MaterialIcons>
              </Center>
  
                
              </View>

          </View>
      
      </Center>

      <HStack mt={'24px'}  >
      <MaterialIcons name="person" size={26} color="black"></MaterialIcons>
      <View style={{flexGrow:1}} ml={'12px'}>
        <HStack justifyContent={'space-between'} >
          <View>
          <Text style={{fontSize: 12,color: '#737278',}}>Name</Text>
          <Text style={{fontSize: 16,color: '#000',}}>{username}</Text>
          </View>
          <Pressable onPress={()=>setShowUserNameModal(true)}>
          <MaterialIcons name="edit" size={20} color="black"></MaterialIcons>
          </Pressable>
          
        </HStack>
        <Text mt={'6px'} style={{fontSize: 12,color: '#737278',}}>This is not your login username. </Text>
      </View>
      </HStack>

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
  descriptionStyle: { 
    borderColor: "#DBDBDB",
     borderWidth: 1 }
});
