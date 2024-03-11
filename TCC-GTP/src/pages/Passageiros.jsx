import { useEffect, useState } from "react";
import { SearchBar } from "react-native-elements";
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
        marginBottom:128,
    }
    
    
})

const Passageiros = () => {
    const [info,setInfo] = useState();
    const [search,setSearch] = useState('');
    const [resultsInfo, setResultsInfo] = useState([])


    const getApi = async() =>{
        try {
            const { data } = await axios.get(`https://rickandmortyapi.com/api/character?name=${search}`);
            setResultsInfo(data.results);
        } catch (error) {
            console.log(error)
        }
    }
    

    const searchInApi = (text)=> {
        setSearch(text);
            
        setTimeout(()=>{
                getApi();
          },500)
    }

    useEffect(()=>{
        getApi();
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
        <View style={style.containerAll}>
            <FlatList
                data={resultsInfo}
                renderItem={({item})=>(
                    <TouchableOpacity>
                    <View style={style.container}>
                    <Text style={style.text}>{item.name}</Text>
                    </View>
                    </TouchableOpacity>
                )}
        />
        </View>
      </View>
    );
}

export default Passageiros;