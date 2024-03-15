import { useEffect, useState } from "react";
import { Button, SearchBar } from "react-native-elements";
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#B5C7F5',
        borderRadius:12,
        margin:4,
        height:44,
    },
    text:{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
        height: 50,
    },
    containerAll:{
        marginBottom:204,
    }
    
    
})

const Passageiros = () => {
      
    const navigation = useNavigation();
    const [info,setInfo] = useState();
    const [search,setSearch] = useState('');
    const [resultsInfo, setResultsInfo] = useState([])
   


    const getApi = async(   ) =>{
        try {
            const response = await axios.get(`http://192.168.53.31:8080/passageiros/${search}`);
            setResultsInfo(response.data);
        } catch (error) {
            console.log(error)
        }
    }
    

    const searchInApi = async(text)=> {
        setSearch(text);
        setTimeout(()=>{
                getApi();
          },500)
    }

    const navigationPage = () =>{
        navigation.navigate('Chamada')
    }

    useEffect(()=>{
        getApi()
    },[])

    return (
        <View>
        <View>
            <SearchBar
            placeholder="Pesquisar"
            platform="android"
            onChangeText={searchInApi}
            value={search}
            />  
        </View>
        <Button
        title="Adicionar Passageiro"
        onPress={navigationPage}
        buttonStyle ={{
            backgroundColor:'#2962F4',
            borderRadius:12,
            marginLeft:4,
            marginRight:4,
        }}
        />
        <View style={style.containerAll}>
            <FlatList
                data={resultsInfo}
                renderItem={({item})=>(
                    // onPress={()=> navigation.navigate('PassageiroD',{item})}
                    <TouchableOpacity>
                    <View style={style.container}>
                    <Text style={style.text}>{item.nome}</Text>
                    </View>
                    </TouchableOpacity>
                )}
        />
        </View>
      </View>
    );
}

export default Passageiros;