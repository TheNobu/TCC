import { View,Text, Image, StyleSheet  } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Avatar } from "react-native-elements";
import { Keyboard } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"; 



const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    textNome:{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 32,
        fontFamily: 'Inter_600SemiBold',
        height: 40,
        textAlign:"center",
        marginTop:12,
    },
    textPonto:{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        fontStyle:"italic",
        height: 28,
        textAlign:"center",
        marginTop:10,
    },
    text:{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:30,
        fontStyle:"italic",
        height:80,
        textAlign:"center",
        padding:6
    },
    avatar:{
        width:228,
        height:222,
        borderRadius:108,
        marginLeft:96,
        marginTop:30,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    containerText:{
        borderColor:"#000",
        borderStyle:'solid',
        borderWidth:2,
        borderRadius:20,
        height:50,
        marginRight:8,
        marginLeft:8,
        marginTop:26,
    }
    
})



const PassageiroD = () => {

    const route = useRoute();
    const {item} = route.params;
  
    return (
        <View style={style.container}>
            <View style={style.avatar}>
                <Avatar
                size={220}
                rounded
                containerStyle={{
                borderColor:"#000",
                borderStyle:'solid',
                borderWidth:2,
                }}
                source={{uri:"https://miro.medium.com/v2/resize:fit:736/0*e2FeM-WKmvdXJs9W.jpg"}}
                />
            </View>
            <View>
                <View>
                    <Text style={style.textNome}>{` ${item.nome}`}</Text>
                </View>
                <View>
                    <Text style={style.textPonto}>{` ${item.ponto}`}</Text>
                </View>
                <View style={style.containerText}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: 5 }} />
                    <Text style={style.text}>{` ${item.endereco}`}</Text>
                </View>
                <View style={style.containerText}>
                    <Text style={style.text}>{`${item.telefone}`}</Text>
                </View>
                <View style={style.containerText}>
                    <Text style={style.text}>{`${item.dt_nascimento}`}</Text>
                </View>
            </View>
            
        </View>
        
    );
}

export default PassageiroD;