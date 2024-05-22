import { useEffect, useState } from "react";
import { Button, SearchBar } from "react-native-elements";
import { FlatList, View, Text, StyleSheet,ActivityIndicator } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import _ from 'lodash';
import axios from "axios";
import { Keyboard } from 'react-native';
import PassageiroD from "./PassageiroD";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";


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
        margin:11,
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
    const [loading, setLoading] = useState(false);
   

    const reloandingPage = ()=>{
        getApi()
    }
    const getApi = async() =>{
        try {
            setLoading(true);
            const response = await axios.get(`http://192.168.228.32:8080/passageiros/passageiros?nome=${search}`);
            setResultsInfo(response.data);
        } catch (error) {
            console.log(error)
        } finally {
        setLoading(false);
        }
    }
    
    const delayedSearch = _.debounce(getApi, 0);

    const searchInApi = async(text)=> {
        setSearch(text);
        if (text.trim() === '') {
            getApi();
        } else {
            delayedSearch(text);
        }
        // setTimeout(()=>{
        //     getApi();   
        //    },400)
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
        <View style={{
            flexDirection: 'row', 
            alignItems: 'center',
            justifyContent: 'space-between',}}>
        <Button
        title="Adicionar Passageiro"
        buttonStyle ={{
            backgroundColor:'#2962F4',
            borderRadius:12,
            marginLeft:4,
            marginRight:4,
            width:358,
            marginTop:4
        }}
        onPress={()=>{navigation.navigate('Cadastro')}}
        />
        <TouchableOpacity onPress={reloandingPage}>
        <Icon
          name='refresh'
          type='font-awesome'
          color='#2962F4'
          size={30}
          style={{marginRight:12, marginTop:2}}
        />
        </TouchableOpacity>
        </View>
        <View style={style.containerAll}>
         {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={resultsInfo}
                        renderItem={({item})=>(
                            <TouchableOpacity onPress={()=>{navigation.navigate('PassageiroD',{item})}}>
                                <View style={style.container}>
                                    <Text style={style.text}>{item.nome}</Text>
                                </View>
                            </TouchableOpacity>
                     )}
                />
            )}
        </View>
      </View>
    );
}

export default Passageiros;