// import React from "react";
// import styles from "../styles";
// import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
// import {
//   BottomTabBar,
//   createBottomTabNavigator,
// } from "@react-navigation/bottom-tabs";
// import Home from "../screens/Home";
// import Menu from "../screens/Menu";
// import Transactions from "../screens/Transactions";
// import TransactionDetails from "../screens/TransactionDetails";
// import home from "../assets/home.png";
// import chart from "../assets/chart.png";
// import budget from "../assets/chart.png";
// import profile from "../assets/profile.png";

// const Tab = createBottomTabNavigator();

// const Tabs = () => {
//   return (
//     <Tab.Navigator
//       tabBarStyle={styles.shadow}
//       screenOptions={{
//         showLabel: false,

//         style: {
//           backgroundColor: "#fff",
//           borderTopLeftRadius: 15,
//           borderTopRightRadius: 15,
//           height: 70,
//           paddingTop: 10,
//           paddingBottom: 5,
//           shadowColor: "#000",
//           shadowOffset: {
//             width: 0,
//             height: -3,
//           },
//           shadowOpacity: 0.2,
//           shadowRadius: 5,
//           elevation: 5,
//         },
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={BottomTabNavigator}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View
//               style={{
//                 alignItems: "center",
//                 justifyContent: "center",
//                 top: 10,
//               }}
//             >
//               <Image
//                 source={home}
//                 resizeMode="contain"
//                 style={{
//                   width: 25,
//                   height: 25,
//                   tintcolor: focused ? "#2563EB " : "#748c94",
//                 }}
//               />
//               <Text
//                 style={{ color: focused ? "#2563EB" : "#748c94", fontSize: 12 }}
//               >
//                 Home
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Budget"
//         component={Menu}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View
//               style={{
//                 alignItems: "center",
//                 justifyContent: "center",
//                 top: 10,
//               }}
//             >
//               <Image
//                 source={budget}
//                 resizeMode="contain"
//                 style={{
//                   width: 25,
//                   height: 25,
//                   tintcolor: focused ? "#2563EB" : "#748c94",
//                 }}
//               />
//               <Text
//                 style={{ color: focused ? "#2563EB" : "#748c94", fontSize: 12 }}
//               >
//                 Budget
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Analytics"
//         component={Transactions}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View
//               style={{
//                 alignItems: "center",
//                 justifyContent: "center",
//                 top: 10,
//               }}
//             >
//               <Image
//                 source={chart}
//                 resizeMode="contain"
//                 style={{
//                   width: 25,
//                   height: 25,
//                   tintcolor: focused ? "#2563EB" : "#748c94",
//                 }}
//               />
//               <Text
//                 style={{ color: focused ? "#2563EB" : "#748c94", fontSize: 12 }}
//               >
//                 Analytics
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={TransactionDetails}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View
//               style={{
//                 alignItems: "center",
//                 justifyContent: "center",
//                 top: 10,
//               }}
//             >
//               <Image
//                 source={profile}
//                 resizeMode="contain"
//                 style={{
//                   width: 25,
//                   height: 25,
//                   tintcolor: focused ? "#2563EB" : "#748c94",
//                 }}
//               />
//               <Text
//                 style={{ color: focused ? "#2563EB" : "#748c94", fontSize: 12 }}
//               >
//                 Profile
//               </Text>
//             </View>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default Tabs;
