import { AddIcon, Text, Fab, Box, Skeleton, HStack, Button, ChevronLeftIcon } from "native-base";
import TransactionListNew from '../components/TransactionList';
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getStore } from "../libraries/store";
import get from "../libraries/get";
import moment from "moment";
export default function Home({ navigation }) {
    const [transactions, setTransactions] = useState(null)
    const [isTransactionLoaded, setIsTransactionLoaded] = useState(false)

    useFocusEffect( useCallback(()=>{
        async function getUserId() {
            let user = await getStore('user');
            return user.userId
        }
        async function loadBalance() {
            var userId = await getUserId();
            var t = await get(`https://monex-server.vercel.app/transactions/${userId}/all`)
            t = await t.json()
            if (t.success) {
                let trans = t.result
                let dateSortedTransactions = {}
                trans.map((item)=>{
                    let date = moment(item.createdAt).format('DD/MM/YYYY')
                    let today = new Date()
                    if(moment(item.createdAt).isSame(today,'day')) date = 'Today'
                    else if(moment(item.createdAt).isBefore(today,'day')) date = 'Yesterday'

                    if(!dateSortedTransactions[date]) dateSortedTransactions[date] = []
                    dateSortedTransactions[date].push(item)
                })
                console.log(dateSortedTransactions)
                let trn = Object.entries(dateSortedTransactions).map(([key, value]) => {
                    console.log(value)
                    return (<Box key={key}>
                        <Text fontSize={'18px'} my="12px">{key}</Text>
                        <TransactionListNew transactions={value}></TransactionListNew>
                        </Box>
                      );
                });
                setTransactions(trn)
                setIsTransactionLoaded(true)
                // setTransactions(balance.result.balance.$numberDecimal)
                // setIsBalanceLoaded(true)
            }

        }
        loadBalance()
    },[]))

    return (
        <Box bg="#fff" h="100%" padding="24px">
            <HStack alignItems="center">
                <Button rounded="50" padding="0" onPress={() => navigation.goBack()} variant="ghost">
                    <ChevronLeftIcon ></ChevronLeftIcon>
                </Button>
                <Text fontSize={'20px'} marginLeft="24px">Transactions</Text>
            </HStack>
            <Skeleton h="20" rounded="5" isLoaded={isTransactionLoaded}>
                {transactions}
            </Skeleton>

            <Fab bg="#2563EB" onPress={() => navigation.navigate("AddTransaction")} renderInPortal={false} shadow={2} size="sm" icon={<AddIcon color="white" name="plus" size="sm" />} />

        </Box>
    )
}