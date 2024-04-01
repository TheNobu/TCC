import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { useFonts, Sen_700Bold } from "@expo-google-fonts/sen";
import { Inter_600SemiBold } from "@expo-google-fonts/inter";
import { Chivo_200ExtraLight_Italic } from "@expo-google-fonts/chivo";
import ChamadaButton from "../components/ChamadaButton";
import { Button } from "react-native-paper";

const styles = StyleSheet.create({
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
    borderColor: '#44d',
    borderRadius: 30,

  },
  containerP: {
    flex: 1,
    backgroundColor: '#B5C7F5',
    borderRadius: 22,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    width: 390,
    height: 105,
  },
});

const Chamada = () => {
  const [info, setInfo] = useState([]);
  const [colorButtons, setColorButtons] = useState({});
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
        const response = await axios.get('http://192.168.51.31:8080/passageiros');
        setInfo(response.data);
        setColorButtons(response.data.reduce((acc, _, index) => {
          acc[index] = '#fff';
          return acc;
        }, {}));
      } catch (error) {
        console.log(error);
      }finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    fetchDados()
  }, []);

  const ChangeButton = (index) => {
    setColorButtons(prevState => ({
      ...prevState,
      [index]: prevState[index] === '#fff' ? '#5d67fb' : '#fff'
    }));
  };

  const Informacao = ({ item, index }) => {
    if (!fontLoad) {
        return null; 
      }
    return (
      
        <View style={styles.containerP}>
          <Text style={styles.passageiros}>{item.nome}</Text>
          <Text style={styles.passageiros}>{item.ponto}</Text>
          <ChamadaButton title= "Presença" onPressButton={() => ChangeButton(index)} color={colorButtons[index]} />
        </View>
    );
  };

  return (
    <View>
      
      <Button
       mode='elevated' 
       textColor={'#fff'}
       onPress={reloandingPage}
       style={{
           margin:12,
           marginTop:22,
           width:120,
           marginLeft:278,
           backgroundColor:'#2962F4'     
       }}
        >Recaregar</Button>
      <View>
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