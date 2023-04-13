import { AddIcon, Text, Fab, Box, Skeleton, HStack, Button, ChevronLeftIcon, VStack, Center } from "native-base";
import TransactionListNew from '../components/TransactionList';
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getStore } from "../libraries/store";
import get from "../libraries/get";
import moment from "moment";
export default function Home({ navigation }) {
   

    return (
        <Box bg="#fff" h="100%" padding="24px">
            <HStack alignItems="center">
                <Button rounded="50" padding="0" onPress={() => navigation.goBack()} variant="ghost">
                    <ChevronLeftIcon ></ChevronLeftIcon>
                </Button>
                <Text fontSize={'20px'} marginLeft="24px">Budget</Text>
            </HStack>
            

            <Center  height={'full'}>
                <Text>Coming Soon..</Text>
            </Center>
           

        </Box>
    )
}