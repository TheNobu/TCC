import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet,KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import axios from 'axios';
import { TextInput as PaperInput, HelperText, Button } from 'react-native-paper';
import { Avatar, Icon } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker'
import { TextInputMask } from 'react-native-masked-text';


const ModifyPassengerScreen = ({ route, navigation }) => {
  const [passenger, setPassenger] = useState(route.params.passenger);
  const [loading, setLoading] = useState(false);

//   const[selectImage,setSelectImage] = useState(null);


   const verifyData = () =>{
    console.log(passenger)
  }
  const updatePassenger = async () => {
    if (!passenger.nome) {
      alert('Por favor, preencha o campo nome.');
      return;
    }
    if (!passenger.telefone) {
      alert('Por favor, preencha o campo telefone.');
      return;
    }
    if (!passenger.ponto) {
      alert('Por favor, preencha o campo ponto.');
      return;
    }
    if (!passenger.endereco) {
      alert('Por favor, preencha o campo endereço.');
      return;
    }
    
    // if (!passenger.dt_nascimento || !passenger.dt_nascimento.includes('-')) {
    //   alert('Utilize o formato 00-00-0000 para a data.');
    //   return;
    // }
  
    // const phoneRegex = /^[0-9]{10,11}$/;
    // if (!phoneRegex.test(passenger.telefone)) {
    //   alert('Por favor, insira um número de telefone válido.');
    //   return;
    // }
    // Verificar se pelo menos um dia da semana foi selecionado
    if (!passenger.segunda && !passenger.terca && !passenger.quarta && !passenger.quinta && !passenger.sexta) {
      alert('Por favor, selecione os dias da semana.');
      return;
    }
  
    try {
      setLoading(true);
      const response = await axios.put(`http://192.168.237.87:8080/passageiros/${passenger.id}`, passenger);
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
        marginTop:2,
       
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
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputLabel: {
      marginBottom: 5,
      fontSize: 16,
      fontWeight: 'bold',
    },
});

const deletePassenger = async () => {
  Alert.alert(
    'Confirmar Exclusão',
    'Tem certeza de que deseja excluir este passageiro?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            const response = await axios.delete(`http://192.168.237.87:8080/passageiros/${passenger.id}`);
            navigation.goBack();
            navigation.goBack();
          } catch (error) {
            console.log(error);
          }
        },
        style: 'destructive',
      },
    ],
    { cancelable: false }
  );
};



const changeTurno = () => {
  setPassenger({ ...passenger, manha: !passenger.manha });
};
const changeTurno2 = () => {
  setPassenger({ ...passenger, tarde: !passenger.tarde });
};
const changeTurno3 = () => {
  setPassenger({ ...passenger, noite: !passenger.noite });
};
const changeColor = () => {
  setPassenger({ ...passenger, segunda: !passenger.segunda });
};

const changeColor2 = () => {
  setPassenger({ ...passenger, terca: !passenger.terca });
};

const changeColor3 = () => {
  setPassenger({ ...passenger, quarta: !passenger.quarta });
};

const changeColor4 = () => {
  setPassenger({ ...passenger, quinta: !passenger.quinta });
};

const changeColor5 = () => {
  setPassenger({ ...passenger, sexta: !passenger.sexta });
};

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'} // Ajusta o comportamento de acordo com a plataforma
      keyboardVerticalOffset={Platform.OS === 'android' ? 64 : 0} // Ajusta o offset vertical do teclado conforme necessário
      >
    <ScrollView>
<View style={style.container}>
<View style={{flexDirection: 'row',
        justifyContent: 'space-around'}}>
<TouchableOpacity onPress={getImage}>           
<View style={style.avatar}>
    <Avatar
    size={220}
    rounded
    containerStyle={{
    borderColor:"#B5C7F5",
    borderStyle:'solid',
    borderWidth:3,
    marginLeft:210
    }}
    source={{uri:`data:image/jpeg;base64,${passenger.foto}`}}
    />
</View>
</TouchableOpacity>
<View style={{width:40,height:40,marginLeft:180,marginVertical:-10,justifyContent:'center',borderRadius:20}}>
            <TouchableOpacity onPress={deletePassenger}>
                <Icon
                        name='trash'
                        type='font-awesome'
                        color='#2962F4'
                        size={28}
                    />
                </TouchableOpacity>
            </View>
</View>
        
<View>
         </View>
         <View>
         <PaperInput
                label="Nome"
                value={passenger.nome}
                maxLength={40}
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
                    height:52,
                    margin:2,
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
                    height:52,
                    margin:2,
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
                    height:52,
                    margin:2,
                }}
                />
      
      {/* <PaperInput
                label="Telefone"
                value={passenger.telefone}
                onChangeText={(text) => setPassenger({ ...passenger, telefone: text })}
                keyboardType="phone-pad"
                maxLength={11}
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
                    height:52,
                    margin:6,
                }}
                />
                <PaperInput
                label="Data de Nascimento"
                value={passenger.dt_nascimento}
                onChangeText={(text) => setPassenger({ ...passenger, dt_nascimento: text })}
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
                    height:52,
                    margin:2,
                }}
                />
               */}
               <TextInputMask
               label="Telefone"
              type={'cel-phone'}
              options={{
                mask: '(99) 99999-9999'
              }}
              value={passenger.telefone}
              onChangeText={(text) => setPassenger({ ...passenger, telefone: text })}
              placeholder="Telefone"
              customTextInput={PaperInput}
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
                  height:52,
                  margin:2,
              }}
            />
            <TextInputMask
              label="Data de nascimento"
              type={'datetime'}
              options={{
                format: 'DD-MM-YYYY'
              }}
              value={passenger.dt_nascimento}
              onChangeText={(text) => setPassenger({ ...passenger, dt_nascimento: text })}
              placeholder="Data de Nascimento"
              customTextInput={PaperInput}
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
                  height:52,
                  margin:2,
              }}
            />
      <Text style={style.text2}>Agenda do Passageiro</Text>
      </View>
            <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',}}>
                <Button 
                    mode="elevated"
                    onPress={changeTurno}
                    textColor= {passenger.manha ? '#fff' : '#2962F4'}
                    style={{
                      backgroundColor: passenger.manha ? '#2962F4' : '#fff',
                      margin:8,
                      marginTop:12,
                      width:100,
                      height:40,
                    }} 
                  >Manhã</Button>
                  <Button 
                    mode="elevated"
                    onPress={changeTurno2}
                    textColor= {passenger.tarde? '#fff' : '#2962F4'}
                    style={{
                      backgroundColor: passenger.tarde ? '#2962F4' : '#fff',
                      margin:8,
                      marginTop:12,
                      width:100,
                      height:40,
                    }} 
                  >Tarde</Button>
                  <Button 
                    mode="elevated"
                    onPress={changeTurno3}
                    textColor= {passenger.noite? '#fff' : '#2962F4'}
                    style={{
                      backgroundColor: passenger.noite ? '#2962F4' : '#fff',
                      margin:8,
                      marginTop:12,
                      width:100,
                      height:40,
                    }} 
                  >Noite</Button>
            </View>
            <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',}}>
              <Button 
                mode="elevated"
                onPress={changeColor}
                textColor= {passenger.segunda ? '#fff' : '#2962F4'}
                style={{
                  backgroundColor: passenger.segunda ? '#2962F4' : '#fff',
                  margin:8,
                  marginLeft:12,
                  marginTop:22,
                  width:74,
                }} 
              >Seg</Button>
              <Button 
                mode="elevated"
                onPress={changeColor2}
                textColor={passenger.terca ? '#fff' : '#2962F4'}
                style={{
                  backgroundColor: passenger.terca ? '#2962F4' : '#fff',
                  margin:8,
                  marginLeft:12,
                  marginTop:22,
                  width:74,
                }} 
              >Ter</Button>
               <Button 
                mode="elevated"
                onPress={changeColor3}
                textColor={passenger.quarta ? '#fff' : '#2962F4'}
                style={{
                  backgroundColor: passenger.quarta ? '#2962F4' : '#fff',
                  margin:8,
                  marginLeft:12,
                  marginTop:22,
                  width:74,
                }} 
              >Qua</Button>
               <Button 
                mode="elevated"
                onPress={changeColor4}
                textColor={passenger.quinta ? '#fff' : '#2962F4'}
                style={{
                  backgroundColor: passenger.quinta ? '#2962F4' : '#fff',
                  margin:8,
                  marginLeft:12,
                  marginTop:22,
                  width:74,
                }} 
              >Qui</Button>
               <Button 
                mode="elevated"
                onPress={changeColor5}
                textColor={passenger.sexta ? '#fff' : '#2962F4'}
                style={{
                  backgroundColor: passenger.sexta ? '#2962F4' : '#fff',
                  margin:8,
                  marginLeft:12,
                  marginTop:22,
                  width:74,
                }} 
              >Sex</Button>
            </View>
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
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ModifyPassengerScreen;

