import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Chamada from './src/pages/Chamada';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Passageiros from './src/pages/Passageiros';


// Crie uma instância do BottomTabNavigator
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
