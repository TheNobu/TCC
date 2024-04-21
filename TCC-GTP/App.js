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
import Cadastro from './src/pages/Cadastro';
import Cadastro2 from './src/pages/Cadastro2';
import ModifyPassengerScreen from './src/pages/ModifyPassengerScreen';
import Map from './src/pages/Map';




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
        <Stack.Screen name='Cadastro' component={Cadastro}/>
        <Stack.Screen name='Cadastro2' component={Cadastro2}/>
        <Stack.Screen name="ModificarPassageiro" component={ModifyPassengerScreen} />
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
      <Tab.Screen
        name='Map'
        component={Map}
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
