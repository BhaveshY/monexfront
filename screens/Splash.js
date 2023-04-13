import { Box,Text } from "native-base";
import React, { useEffect } from "react";
import {getStore} from "../libraries/store";


export default function Registration({ navigation }) {
 
  useEffect(()=>{
    getStore('userLoggedIn').then((value)=>{
      if(value) navigation.navigate('HomeTabs')
      else{
        navigation.navigate('Login')
      }
    })
  },[])

  return (
    <Box bg="#2563EB" h="100%" display="flex" flexDirection="column" alignItems={'center'} justifyContent="center">
      <Text margin="24px" fontSize="38px" fontStyle={'italic'} fontWeight="medium" color="#FAFAFA">moneXpensify</Text>
    </Box>

  );
}
