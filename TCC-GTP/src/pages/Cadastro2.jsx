import React, { useState, useEffect } from 'react';
import { View,  Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { Button } from "react-native-paper";
// import RNFS from 'react-native-fs';


const Cadastro2 = () => {

    const[selectImage,setSelectImage] = useState(null);
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


    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Desculpe, precisamos de permissões de acesso à mídia para fazer isso funcionar!');
            }
        })();
    }, []);
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            setSelectImage(result.assets[0].uri)
            
                
            // RNFS.readFile(result.assets[0].uri, 'base64')
            // .then(base64Image => {
            // // Use a string base64 como desejar, por exemplo, exibindo uma imagem
            // console.log(base64Image);
            // })
            // .catch(error => {
            // console.error('Erro ao ler a imagem:', error);
            // });

        }
    }

    
    return (
        <View style={style.container}>
            {selectImage && <Image source={{ uri: selectImage }} style={style.image} />}
            <Button mode='elevated' onPress={pickImage} textColor='#000' style={{margin:22}}> Escolher Imagem</Button>
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
      borderColor:'#000'
    },
  });
export default Cadastro2;