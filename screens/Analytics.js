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
  ScrollView,
} from 'native-base';
import TransactionListNew from '../components/TransactionList';
import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {getStore} from '../libraries/store';
import get from '../libraries/get';
import moment from 'moment';
import {StyleSheet, View} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryPie,
} from 'victory-native';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000},
];

export default function Analytics({navigation}) {
  return (
    <ScrollView>
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
        <HStack justifyContent="space-between">
          <Button size="sm" variant="subtle" width="100">
            Week
          </Button>
          <Button size="sm" variant="subtle" width="100">
            Month
          </Button>
          <Button size="sm" variant="subtle" width="100">
            All Time
          </Button>
        </HStack>
        <View style={styles.container}>
          <VictoryChart width={350} theme={VictoryTheme.material}>
            <VictoryBar data={data} x="quarter" y="earnings" />
          </VictoryChart>
          <Text fontSize={'19px'} marginLeft="-3">
            Analytics
          </Text>
          <VictoryChart>
            <VictoryLine
              style={{
                data: {stroke: '#c43a31'},
                parent: {border: '1px solid #ccc'},
              }}
            />
          </VictoryChart>
          <Text fontSize={'19px'} marginLeft="-3">
            Line Graph
          </Text>
          <VictoryPie
            data={[
              {x: 'Cats', y: 35},
              {x: 'Dogs', y: 40},
              {x: 'Birds', y: 55},
            ]}
          />
          <Text fontSize={'19px'} marginLeft="-3">
            Pie Chart
          </Text>
        </View>
      </Box>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    // backgroundColor: '#f5fcff',
  },
});
