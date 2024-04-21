import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet,KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import axios from 'axios';
import { TextInput as PaperInput, HelperText, Button } from 'react-native-paper';
import { Avatar, Icon } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker'


const ModifyPassengerScreen = ({ route, navigation }) => {
  const [passenger, setPassenger] = useState(route.params.passenger);
  const [loading, setLoading] = useState(false);
//   const[selectImage,setSelectImage] = useState(null);


   const verifyData = () =>{
    console.log(passenger)
  }
  const updatePassenger = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`http://192.168.237.146:8080/passageiros/${passenger.id}`, passenger);
      navigation.navigate('PassageiroD', { item: response.data});
    } catch (error) {
      console.error('Erro ao atualizar passageiro:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    (async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Desculpe, precisamos de permissões de acesso à mídia para fazer isso funcionar!');
        }
    })();
}, []);

  const getImage = async () => {
    try {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.cancelled && result.assets) {
            // setSelectImage(result.assets[0].uri);
            try {
                let base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                setPassenger({ ...passenger, foto: base64Image });
            } catch (error) {
                console.error('Erro ao ler a imagem:', error);
            }
        }
    } catch (error) {
        console.error('Erro ao selecionar a imagem:', error);
    }
}
const style = StyleSheet.create({
    container: {
        
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
    textNome:{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 32,
        fontFamily: 'Inter_600SemiBold',
        height: 44,
        textAlign:"center",
        marginTop:12,
    },
    textPonto:{
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        height: 28,
        marginTop:10,
        textAlign:'center',
        fontFamily:'Chivo_200ExtraLight_Italic',
        
    },
    text:{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:22,
        fontFamily:'Chivo_200ExtraLight_Italic',
        height:80,
        textAlign:"center",
        padding:6,
        marginTop:36,
        
    },
    avatar:{
        width:228,
        height:222,
        borderRadius:108,
        marginBottom:16,
        alignItems:'center',
    },
    containerText:{
        borderColor:"#B5C7F5",
        borderStyle:'solid',
        borderWidth:3,
        borderRadius:20,
        height:50,
        marginRight:12,
        marginLeft:12,
        marginTop:16,
        flexDirection: 'row', 
        alignItems: 'center',
        
        
    },
    containerPonto:{
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2:{
        height:50,
        marginRight:12,
        marginLeft:12,
        marginTop:10,
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    text2:{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:22,
        fontFamily:'Chivo_200ExtraLight_Italic',
        textAlign:"center",      
        marginTop:8,
       
    },
    text3:{
        fontSize:22,
        fontFamily:'Chivo_200ExtraLight_Italic',
    },
    containerAgendaSeg:{
        marginLeft:10,
        marginRight:10,
        width:58,
        alignItems:'center',
        borderRadius:8,
        
    },
    modifyButton: {
        marginTop: 20,
        alignSelf: 'center',
        backgroundColor: '#2962F4',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    modifyButtonText: {
        fontSize: 18,
        color: '#fff',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        paddingHorizontal: 10,
    }
});


  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'} // Ajusta o comportamento de acordo com a plataforma
      keyboardVerticalOffset={Platform.OS === 'android' ? 64 : 0} // Ajusta o offset vertical do teclado conforme necessário
      >
    <ScrollView>
    <View style={style.container}>
<TouchableOpacity onPress={getImage}>           
<View style={style.avatar}>
    <Avatar
    size={220}
    rounded
    containerStyle={{
    borderColor:"#B5C7F5",
    borderStyle:'solid',
    borderWidth:3,
    }}
    source={{uri:`data:image/jpeg;base64,${passenger.foto}`}}
    />
</View>
</TouchableOpacity>

        
<View>
         </View>
         <PaperInput
                label="Nome"
                value={passenger.nome}
                onChangeText={(text) => setPassenger({ ...passenger, nome: text })}
                theme={{
                  roundness: 10,
                  colors: {
                    primary: '#2962F4', 
                    text: '#000000',
                    placeholder: '#CCCCCC', 
                    background: '#FFFFFF', 
                  },
                }}
                style={{
                    backgroundColor:'#fff',
                    marginLeft:12,
                    marginRight:12,
                    width:376,
                    margin:6,
                }}
                />
      <PaperInput
                label="Ponto"
                value={passenger.ponto}
                onChangeText={(text) => setPassenger({ ...passenger, ponto: text })}
                theme={{
                  roundness: 10,
                  colors: {
                    primary: '#2962F4', 
                    text: '#000000',
                    placeholder: '#CCCCCC', 
                    background: '#FFFFFF', 
                  },
                }}
                style={{
                    backgroundColor:'#fff',
                    marginLeft:12,
                    marginRight:12,
                    width:376,
                    margin:6,
                }}
                />
      <PaperInput
                label="Endereço"
                value={passenger.endereco}
                onChangeText={(text) => setPassenger({ ...passenger, endereco: text })}
                theme={{
                  roundness: 10,
                  colors: {
                    primary: '#2962F4', 
                    text: '#000000',
                    placeholder: '#CCCCCC', 
                    background: '#FFFFFF', 
                  },
                }}
                style={{
                    backgroundColor:'#fff',
                    marginLeft:12,
                    marginRight:12,
                    width:376,
                    margin:6,
                }}
                />
      
      <PaperInput
                label="Telefone"
                value={passenger.telefone}
                onChangeText={(text) => setPassenger({ ...passenger, telefone: text })}
                theme={{
                  roundness: 10,
                  colors: {
                    primary: '#2962F4', 
                    text: '#000000',
                    placeholder: '#CCCCCC', 
                    background: '#FFFFFF', 
                  },
                }}
                style={{
                    backgroundColor:'#fff',
                    marginLeft:12,
                    marginRight:12,
                    width:376,
                    margin:6,
                }}
                />
                <Button
                mode="elevated"
                textColor='#fff'
                onPress={updatePassenger}
                style={{
                  backgroundColor:'#2962F4',
                  marginLeft:28,
                  marginRight:28,
                  marginTop:28
                }}
                >Confirmar</Button>

      {/* <Button title="test de dados" onPress={verifyData} /> */}
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ModifyPassengerScreen;