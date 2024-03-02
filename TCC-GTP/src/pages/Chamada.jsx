import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import {useFonts,Sen_700Bold} from "@expo-google-fonts/sen"
import {Inter_600SemiBold} from "@expo-google-fonts/inter"


const style = StyleSheet.create({
    container:{
        marginTop:36,
        marginLeft:10,
        marginBottom:2,
        width:200,
        
    },
    header:{
        fontSize:40,
        fontFamily:'Sen_700Bold',
        height:46
    },
    passageiros:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:14,
        fontSize:20,
        fontFamily:'Inter_600SemiBold'
    },
    containerP: {
        backgroundColor:'#B5C7F5',
        borderRadius:22,
        marginTop:15,
        marginLeft:10,
        marginRight:10,
        width:390,
        height:105,
    }
});

const Chamada = () => {

        const [fontLoad]  =  useFonts({
            Inter_600SemiBold,
            Sen_700Bold,
        })

        
    

    const [info,setInfo] = useState([])
    
    const fetchDados = async () =>{
        try {
            const {data} = await axios.get('https://rickandmortyapi.com/api/character')
            setInfo(data.results)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchDados()
    },[])


    const Informacao = ({i}) =>{
        return(
            <View style ={style.containerP}>
                <Text style={style.passageiros}>{i.name}</Text>
                <Text style= {style.passageiros}>Ponto</Text>
            </View>
        )
    }
    
    
    return (
            <View>
                <View style ={style.container}>
                    <Text style={style.header}>Passgeiros</Text>
                    
                </View>
                <View>
               <FlatList
                   data={info}
                   renderItem={({item})=> <Informacao i ={item}/>}
               />
               </View>
            </View>
    );
}

export default Chamada;