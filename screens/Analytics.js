import React, { useEffect } from 'react';
import {
  AddIcon,
  Text,
  Fab,
  Box,
  Skeleton,
  HStack,
  Button,
  ChevronLeftIcon,
  ScrollView,
} from 'native-base';
import TransactionListNew from '../components/TransactionList';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getStore } from '../libraries/store';
import get from '../libraries/get';
import moment from 'moment';
import { StyleSheet, View } from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryPie,
} from 'victory-native';

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

export default function Analytics({ navigation }) {

  var transactions = null;
  var processedTransactions = null

  const barStyle = {
    data: { fill: "tomato" }
  }

  const [timeRange, setTimeRange] = useState('this-week')

  const [barData, setBarData] = useState([])

  const [lineData, setLineData] = useState([
    { x: '1st', y: 1300 },
    { x: '2nd', y: 1200 },
    { x: '3rd', y: 1200 },
    { x: '4th', y: 1400 },
    { x: '5th', y: 1200 },
    { x: '6th', y: 1300 },
    { x: '7th', y: 1400 },
    { x: '8th', y: 1500 },
    { x: '9th', y: 1100 },
    { x: '10th', y: 1200 },
  ])

  const [pieData, setPieData] = useState([])

  async function getUserId() {
    let user = await getStore('user');
    return user.userId
  }
  async function loadTransactions() {
    var userId = await getUserId();
    var t = await get(`https://monex-server.vercel.app/transactions/${userId}/all`)
    t = await t.json()
    if (t.success) {
      let trans = t.result
      transactions = trans.filter((tr)=>{
        return tr.type == 0;
      })
      processData()
    }
  }
  

  function processData(){
    processedTransactions = {}
    if(!transactions){
      return console.log("Transactions empty")
    }

    transactions.map((transaction)=>{
      if(!processedTransactions.categories) processedTransactions.categories = {}
      if(!processedTransactions.categories[transaction.category]) processedTransactions.categories[transaction.category] = {totalAmount:0,transactions: []}
      processedTransactions.categories[transaction.category].transactions.push(transaction)
      processedTransactions.categories[transaction.category].totalAmount += parseFloat(transaction.amount.$numberDecimal)
    }) 
    console.log(processedTransactions)
    if (timeRange === 'this-week') {
      let tempBarData = []
      for (let [key, value] of Object.entries(processedTransactions.categories)) {
        tempBarData.push({x:key.substring(0,7),y:value.totalAmount})
      }
      setBarData(tempBarData)
      setPieData(tempBarData)

      var currentDate = moment();
      var currentWeekDay = currentDate.day()

      var weekStart = currentDate.clone().subtract(currentWeekDay-1,'days')
      console.log(currentDate,currentWeekDay, weekStart)

      let tempLineData = {}
      transactions.map((transaction)=>{
        let transacionDate = moment(transaction.createdAt)
        if(transacionDate.isSameOrAfter(weekStart)){
          let date = transacionDate.format('DD/MM')
          if(!tempLineData[date]) tempLineData[date] = 0
          tempLineData[date] += parseInt(transaction.amount.$numberDecimal)
        }
      })
      console.log(tempLineData)
      let finalLineData = []
      for (let [key, value] of Object.entries(tempLineData)) {
        finalLineData.push({x:key,y:value})
      }
      console.log(finalLineData)
      setLineData(finalLineData.reverse())
    }
    if (timeRange === 'this-month') {

    }
    if (timeRange === 'all-time') {

    }
  }

  useEffect(() => {
    if(!transactions) loadTransactions()
    console.log('Time range updated', timeRange)
    processData()
  }, [timeRange])

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
          Analytics
        </Text>
      </HStack>
      <HStack justifyContent="space-between" mt={'24px'}>
        <Button onPress={() => setTimeRange('this-week')} size="sm" variant="subtle" width="100">
          This Week
        </Button>
        <Button onPress={() => setTimeRange('this-month')} size="sm" variant="subtle" width="100">
          This Month
        </Button>
        <Button onPress={() => setTimeRange('all-time')} size="sm" variant="subtle" width="100">
          All Time
        </Button>
      </HStack>
      <ScrollView >

        <View style={styles.container}>
          <Text mt={'24px'} fontSize="16px">Transactions</Text>
          <VictoryChart domainPadding={{ x: 35 }} >
            <VictoryBar style={barStyle} data={barData} alignment="start" />
          </VictoryChart>

          <Text mt={'24px'} fontSize="16px">Expense Trend</Text>
          <VictoryChart domainPadding={{ x: 25 }}>
            <VictoryLine
              style={{
                data: { stroke: '#c43a31' },
                parent: { border: '1px solid #ccc' },
              }}
              data={lineData}
            />
          </VictoryChart>

          <Text mt={'24px'} fontSize="16px">Category Split</Text>
          <VictoryPie 
            innerRadius={68} labelRadius={100}
            theme={VictoryTheme.material}
            data={pieData}
          />

        </View>
      </ScrollView>

    </Box>

  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginLeft: 20,
    // backgroundColor: '#f5fcff',
  },
});
