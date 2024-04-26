import React, { useState, useEffect } from 'react';
import { View,  Image, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { Button } from "react-native-paper";
import * as FileSystem from 'expo-file-system';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Cadastro2 = () => {

    const route = useRoute();
    const {params} = route.params; 
    const navigation = useNavigation();
    const[selectImage,setSelectImage] = useState(null);
    const[base64,setBase64] = useState("");
    const[manha,setManha] = useState(false);
    const[tarde,setTarde] = useState(false);
    const[noite,setNoite] = useState(false);

    const changeColor = () =>{
        setManha(!manha)
    }
    const changeColor2 = () =>{
        setTarde(!tarde)
    } 
    const changeColor3 = () =>{
        setNoite(!noite)
    }

    const postAxios = async() =>{
        if(manha == false && tarde == false && noite == false){
            alert("O turno e obrigatorio para proseguir")
            return;
        }
        try {
            const post = await axios.post('http://192.168.237.146:8080/passageiros',
            {
                "nome":`${params.nome}`,
                "ponto":`${params.ponto}`,
                "endereco": `${params.endereco}`,
                "telefone":`${params.telefone}`,
                "dt_nascimento":`${params.data}`,
                "foto":`${base64}`,
                "segunda": `${params.segunda}`,
                "terca": `${params.terca}`,
                "quarta": `${params.quarta}`,
                "quinta": `${params.quinta}`,
                "sexta": `${params.sexta}`,
                "manha": `${manha}`,
                "tarde": `${tarde}`,
                "noite": `${noite}`,
            })
        } catch (error) {
            console.log(error)
        } finally{
            alert('Cadastrado com sucesso')
            console.log("Deu bom")
            navigation.navigate('Passageiros')
        }
    }

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Desculpe, precisamos de permissões de acesso à mídia para fazer isso funcionar!');
            }
        })();
    }, []);
    
    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });
    
    //     console.log(result);
    
    //     if (!result.cancelled) {
    //         setSelectImage(result.assets[0].uri)
            
    //         FileSystem.readAsStringAsync(result.assets[0].uri, {
    //             encoding: FileSystem.EncodingType.Base64,
    //         }).then((base64Image) =>{
    //             setBase64(base64Image);
    //         })
    //         .catch((error) =>{
    //             console.error('Erro ao ler a imagem:', error);
    //     })
    // }

    // }
    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
    
            console.log(result);
    
            if (!result.cancelled && result.assets) {
                setSelectImage(result.assets[0].uri);
    
                try {
                    let base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                        encoding: FileSystem.EncodingType.Base64,
                    });
                    setBase64(base64Image);
                } catch (error) {
                    console.error('Erro ao ler a imagem:', error);
                }
            }
        } catch (error) {
            console.error('Erro ao selecionar a imagem:', error);
        }
    }

    
    return (
        <View style={style.container}>
            {selectImage && <Image source={{ uri: selectImage }} style={style.image} />}
            <Button mode='elevated' onPress={pickImage} textColor='#000' style={{margin:22,backgroundColor:'#fff'}}> Escolher Imagem do passageiro</Button>
            {/* {base64 && <Image source={{ uri: `data:image/jpeg;base64,${base64}` }} style={style.image} />} */}
            <Text style={style.text}>Turno</Text>
            <View style={{ flexDirection: 'row',
                          justifyContent: 'space-around',}}>
            <Button 
            mode='elevated' 
            textColor={manha ? '#fff' : '#2962F4'}
            onPress={changeColor}
            style={{
                margin:12,
                marginTop:22,
                width:100,
                backgroundColor: manha ? '#2962F4' : '#fff'
            }}>Manhã</Button>
            <Button 
            mode='elevated' 
            textColor={tarde ? '#fff' : '#2962F4'}
            onPress={changeColor2}
            style={{
                margin:12,
                marginTop:22,
                width:100,
                backgroundColor: tarde ? '#2962F4' : '#fff'
            }}>Tarde</Button>
            <Button 
            mode='elevated' 
            textColor={noite ? '#fff' : '#2962F4'}
            onPress={changeColor3}
            style={{
                margin:12,
                marginTop:22,
                width:100,
                backgroundColor: noite ? '#2962F4' : '#fff'
            }}>Noite</Button>
            </View>
            <View>
                <Button
                mode='elevated' 
                textColor= '#fff' 
                onPress={postAxios}
                style={{
                    margin:12,
                    marginTop:40,
                    width:200,
                    backgroundColor:'#2962F4'
                }}
                >Finalizar Cadastro</Button>
            </View>
        </View>
    );
}
const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor:'#fff'
    },
    image: {
      width: 300,
      height: 300,
      margin: 20,
      borderRadius:152,
      borderWidth:3,
      borderColor:'#B5C7F5'
    },
    text:{
        fontSize:22,
        fontFamily: 'Chivo_200ExtraLight_Italic', 
    },
  });
export default Cadastro2;