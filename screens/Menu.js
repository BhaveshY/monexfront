import React, { useEffect, useState } from "react";
import { Box, HStack, Text, Button, Image, VStack, Pressable } from "native-base";
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";
import { StyleSheet } from "react-native";
import { getStore } from "../libraries/store";

function Profile({ navigation }) {
  var [email, setEmail] = useState(null);
  var [isEmailLoaded, setIsEmailLoaded] = useState(false);
  var [avatar, setAvatar] = useState(null);
  
  useEffect(() => {
    async function fetchEmail() {
      let user = await getStore("user");
      if (user.email) {
        setEmail(user.email);
        setAvatar(Array.from(user.email)[0]);
        setIsEmailLoaded(true);
      }
    }
    fetchEmail();
  }, []);
  const profileImage = require("../assets/bsy.jpg")
  return (
    <Box backgroundColor="white" h="100%" display="flex">
      <HStack style={styles.profileSection}>
        <Image size={49} borderRadius={100} source={profileImage}></Image>
        <VStack style={styles.profileDetailStack}>
          <Text style={styles.userName}>Vipul Patil</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </VStack>
      </HStack>

       <Box padding="10px" marginTop={'17px'} flexGrow={1}>
       
        <Pressable>
         <HStack style={styles.menuItem} alignItems={'center'}>
             <MaterialIcons name="person" size={24} color="#000"></MaterialIcons>
            <Text fontSize={'17px'} ml="10px">Edit Profile</Text>
          </HStack> 
        </Pressable>
       
      </Box> 


      <Button variant="unstyled" style={styles.logoutButton}><Text fontSize={'16px'} fontWeight={500}>Logout</Text></Button>
    </Box>
  );
}

const styles = StyleSheet.create({
  profileSection:{
    padding: 19, 
    borderBottomWidth:1, 
    alignItems: "center",
    borderColor:"#e6e6e6"
  },
  userName: {
    fontSize: 19,
    lineHeight: 19.2,
    fontWeight: 500
  },
  userEmail: {
    fontSize: 16,
    lineHeight: 19.2,
    color: '#737278'
  },
  profileDetailStack: {
    marginLeft: 16
  },
  menuItem:{
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
    fontSize : 16,
    fontWeight: 500,
    backgroundColor: '#FFFFFF',
    color: '#000000',
    borderColor:'#E7E7E7',
    borderWidth:2,
    borderRadius: 8,
    shadowColor: "#E7E7E7",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    elevation: 4
  }
})

export default Profile
