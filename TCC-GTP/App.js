import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Chamada from './src/pages/Chamada';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Passageiros from './src/pages/Passageiros';
import PassageiroD from './src/pages/PassageiroD';
import 'react-native-gesture-handler'




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='PassageiroD' component={PassageiroD}/>
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Chamada"
        component={Chamada} 
        options={{
          tabBarIcon:()=>(
            <AntDesign name="book" color='#000' size={20}/>
          )
        }}
      />
      <Tab.Screen 
        name="Passageiros" 
        component={Passageiros}
        options={{
          tabBarIcon:()=>(
            <AntDesign name="user" color='#000' size={20}/>
          )
        }} 
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


{/* <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
        name="Chamada"
        component={Chamada} 
        options={{
          tabBarIcon:()=>(
          <AntDesign name="book" color='#000' size={20}/>
        )}}
        />
        <Tab.Screen 
        name="Passageiros" 
        component={Passageiros}
        options={{
          tabBarIcon:()=>(
          <AntDesign name="user" color='#000' size={20}/>
        )}} />
      </Tab.Navigator>
      <Stack.Screen name='PassageiroD' component={PassageiroD}/>
    </NavigationContainer> */}
