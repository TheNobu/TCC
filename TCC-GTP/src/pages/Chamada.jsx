import { View, Text, StyleSheet, SafeAreaView, FlatList, Button } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import {useFonts,Sen_700Bold} from "@expo-google-fonts/sen"
import {Inter_600SemiBold} from "@expo-google-fonts/inter"
import ChamadaButton from "../components/ChamadaButton";


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
        alignItems:'center',
        justifyContent:'center',
        padding:14,
        fontSize:20,
        fontFamily:'Inter_600SemiBold',
        height:50,
        width:310,
        borderColor:'#44d',
        borderRadius:30,
    },
    containerP: {
        backgroundColor:'#B5C7F5',
        borderRadius:22,
        marginTop:15,
        marginLeft:10,
        marginRight:10,
        width:390,
        height:105,
    },
    botao:{
        width:50,
        height:40,
        marginLeft:320,
        marginVertical:-66,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius:10,
    }
});

const Chamada = () => {

        const [fontLoad]  =  useFonts({
            Inter_600SemiBold,
            Sen_700Bold,
        })

    const [info,setInfo] = useState([])
    const [B,setB] = useState(false)
    const [colorButton,setColorButton] = useState('#fff')
    
    const ChangeButton = () =>{
        setB(!B)
        console.log("a")
    }

    const ChangeColor = () =>{
        if(B == false){
            setColorButton('#fff')
        }
        if(B == true){
            setColorButton('#44749D')
        }
    
    }

    

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
        ChangeColor()
    },[])


    const Informacao = ({i}) =>{
        return(            
                <View style ={style.containerP}>
                    <Text style={style.passageiros}>{i.name}</Text>
                    <Text style= {style.passageiros}>Ponto</Text>
                    <ChamadaButton title="Test" onPressButton={ChangeButton} color={colorButton}/>
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