/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import AddTransaction from "./screens/AddTransaction";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import Splash from "./screens/Splash";
import Transactions from "./screens/Transactions";
import TransactionDetails from "./screens/TransactionDetails";
import EditProfile from "./screens/EditProfile";
import Analytics from "./screens/Analytics";
import Budget from "./screens/Budget";
import Menu from "./screens/Menu";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const HomeTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Home" barStyle={styles.barStyle} >
      <Tab.Screen name="Home" component={Home} options={{tabBarIcon: ({ focused }) => (<MaterialIcons style={[focused?styles.focusedBottomIcon:styles.unfocusedBottomIcon,]} size={24} name="home"/>),}} />
      <Tab.Screen name="Assistant" component={Budget} options={{tabBarIcon: ({ focused }) => (<MaterialIcons style={[focused?styles.focusedBottomIcon:styles.unfocusedBottomIcon,]} size={24} name="payment"/>),}} />
      <Tab.Screen name="Analytics" component={Analytics} options={{tabBarIcon: ({ focused }) => (<MaterialIcons style={[focused?styles.focusedBottomIcon:styles.unfocusedBottomIcon,]} size={24} name="analytics"/>),}} />
      <Tab.Screen name="Menu" component={Menu} options={{tabBarIcon: ({ focused }) => (<MaterialIcons style={[focused?styles.focusedBottomIcon:styles.unfocusedBottomIcon,]} size={24} name="menu"/>),}} />
    </Tab.Navigator>
  );
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
   
       <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          <Stack.Screen name="AddTransaction" component={AddTransaction}/>
          <Stack.Screen name="Transactions" component={Transactions}/>
          <Stack.Screen name="TransactionDetails" component={TransactionDetails}/>
          <Stack.Screen name="EditProfile" component={EditProfile}/>
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  barStyle:{
    backgroundColor: '#fff',
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity:  0.17,
    shadowRadius: 5,
    elevation: 2
  },
  focusedBottomIcon:{
    color: '#2563EB'
  },
  unfocusedBottomIcon:{
    color: '#929292'
  }
});

export default App;
