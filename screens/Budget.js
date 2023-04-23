import React from 'react';
import {
  AddIcon,
  Text,
  Fab,
  Box,
  Skeleton,
  HStack,
  Button,
  ChevronLeftIcon,
  VStack,
  Center,
} from 'native-base';
import {View, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import TransactionListNew from '../components/TransactionList';
import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {getStore} from '../libraries/store';
import get from '../libraries/get';
import moment from 'moment';
export default function Home({navigation}) {
  return (
    <Box bg="#fff" h="100%" padding="24px">
      <HStack alignItems="center">
        <Button
          rounded="50"
          padding="0"
          onPress={() => navigation.goBack()}
          variant="ghost">
          <ChevronLeftIcon></ChevronLeftIcon>
        </Button>
        <Text fontSize={'20px'} marginLeft="24px">
          Budget
        </Text>
      </HStack>
      <View style={styles.container}>
        <WebView
          source={{
            uri: 'https://ora.sh/embed/561a3993-d668-4f7c-8514-76fd260ac029',
          }}
          style={styles.webview}
        />
      </View>
      {/* <Center height={'full'}>
        <Text>Coming Soon..</Text>
      </Center> */}
    </Box>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  webview: {
    borderRadius: 1,
  },
});
