import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { useFonts, Sen_700Bold } from "@expo-google-fonts/sen";
import { Inter_600SemiBold } from "@expo-google-fonts/inter";
import { Chivo_200ExtraLight_Italic } from "@expo-google-fonts/chivo";
import ChamadaButton from "../components/ChamadaButton"
import ChamadaButton2 from "../components/ChamadaButton2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-native-paper";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ApiIp } from "./config";
const style = StyleSheet.create({
  container: {
    marginTop: 36,
    marginLeft: 10,
    marginBottom: 2,
    width: 200,
  },
  header: {
    fontSize: 40,
    fontFamily: 'Sen_700Bold',
    height: 46
  },
  passageiros: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    height: 50,
    width: 280,
    borderRadius:20
  
  },
  containerP: {
    flex:1,
    backgroundColor: '#B5C7F5',
    borderRadius: 22,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    width: 390,
    height: 105,
  },
  cointainerButton:{
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textIcon:{
    fontSize:18,
    marginTop:16,
    paddingLeft:6,
    fontFamily:'Inter_600SemiBold'
  },
  button:{
    backgroundColor:'#ccc',
    height:20,
    width:40,
    marginLeft:286,
    marginRight:10, 
    marginVertical:-20
  },
  button2:{
    backgroundColor:'#ccc',
    height:20,
    width:40,
  },
  all:{
    flex:1,
    width:'100%',
    height:'100%',
    marginBottom:48,
  }
});

const Chamada = () => {
  const [info, setInfo] = useState([]);
  const [colorButtons, setColorButtons] = useState({});
  const [colorButtons2,setColorButtons2] = useState({});
  const [loading, setLoading] = useState(false);

    const [fontLoad] = useFonts({
        Sen_700Bold,
        Inter_600SemiBold,
        Chivo_200ExtraLight_Italic
    })

    const reloandingPage = () =>{
      fetchDados()
    }

    const fetchDados = async () => {
      try {
        setLoading(true);
        
        const response = await axios.get(`http://192.168.237.87:8080/passageiros`);
        
        const currentDayOfWeek = new Date().getDay(); 

        const dayOfWeekMap = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];

        const currentDayName = dayOfWeekMap[currentDayOfWeek];
        
        const currentHour = new Date().getHours();

        let currentTurno;

        if (currentHour < 12) {
          currentTurno = 'manha';
        } else if (currentHour >= 12 && currentHour < 17) {
          currentTurno = 'tarde';
        } else {
          currentTurno = 'noite';
        }
        
        const filteredPassengers = response.data.filter(passenger => passenger[currentDayName] && passenger[currentTurno]);
        
        setInfo(filteredPassengers);
        setColorButtons(filteredPassengers.reduce((acc, _, index) => {
          acc[index] = '#fff';
          return acc;
        }, {}));
        setColorButtons2(filteredPassengers.reduce((acc, _, index) => {
          acc[index] = '#fff';
          return acc;
        }, {}));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    
    
  useEffect(() => {
    fetchDados()
  }, []);

  const ChangeButton = (index,buttonNumber) => {
    if (buttonNumber === 1) {
      setColorButtons(prevState => ({
        ...prevState,
        [index]: prevState[index] === '#fff' ? '#2196f3' : '#fff'
      }));
    } else if (buttonNumber === 2) {
      setColorButtons2(prevState => ({
        ...prevState,
        [index]: prevState[index] === '#fff' ? '#2196f3' : '#fff'
      }));
    }
  };

  const Informacao = ({ item, index }) => {
    if (!fontLoad) {
        return null; 
      }
    return (

        <View style={style.containerP}>
           <View>
              <View>
              <Text style={style.passageiros}>{item.nome}</Text>
              </View>
              <View style={{marginTop:4}}>
              <Text style={style.passageiros}>{item.ponto}</Text>
              </View>
          </View>
          <View style={{
            flexDirection: 'row',}}>
          <View>
          <ChamadaButton title="Presença 1" onPressButton={() => ChangeButton(index, 1)} color={colorButtons[index]} />
          </View>
          <View>
          <ChamadaButton2 title="Presença 2" onPressButton={() => ChangeButton(index, 2)} color={colorButtons2[index]} />
          </View>
          </View>
        </View>
    );
  };

  return (
    
    <View style={style.all}>
    <View style={style.cointainerButton}> 
    <View style={{flexDirection: 'row'}}>
        <Icon
          name='arrow-down'
          type='font-awesome'
          color='#2962F4'
          size={26}
          style={{marginTop:16, marginLeft:20}}
        />
        <Text style={style.textIcon}>Saída </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Icon
          name='arrow-up'
          type='font-awesome'
          color='#2962F4'
          size={26}
          style={{marginTop:14}}
        />
        <Text style={style.textIcon}>Entrada  </Text>
      </View>
      <View>
      <TouchableOpacity onPress={reloandingPage}>
      <Icon
          name='refresh'
          type='font-awesome'
          color='#2962F4'
          size={30}
          style={{marginRight:20, marginTop:12,marginBottom:6}}
      />
      </TouchableOpacity>
      </View>
      </View>
      <View >
      {loading ? (
                    <ActivityIndicator size={50} color="#0000ff" style={{marginTop:20}} />
                ) : (
        <FlatList
          data={info}
          renderItem={({ item, index }) => <Informacao item={item} index={index} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )} 
      </View>
      </View>
      
  );
};

export default Chamada;

