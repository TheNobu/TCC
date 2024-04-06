import { View,Text, Image, StyleSheet  } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Avatar } from "react-native-elements";
import { Keyboard } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"; 
import { Icon } from "react-native-elements";



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
        marginLeft:96,
        marginTop:30,
        flexDirection: 'row',
        justifyContent: 'space-around',
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
                borderColor:"#B5C7F5",
                borderStyle:'solid',
                borderWidth:3,
                }}
                source={{uri:`data:image/jpeg;base64,${item.foto}`}}
                // data:image/jpeg;base64,${foto}
                />
            </View>
            <View>
                <View>
                    <Text style={style.textNome}>{` ${item.nome}`}</Text>
                </View>
                <View style= {style.containerPonto}>
                    <Icon
                        name='map-marker'
                        type='font-awesome'
                        color='#2962F4'
                        size={18}
                        style={{marginTop:8}}
                    />
                    <Text style={style.textPonto}>{` ${item.ponto}`}</Text>
                </View>
                <View style={style.containerText}>
                    <Icon
                        name='home'
                        type='font-awesome'
                        color='#2962F4'
                        style={{marginLeft:10}}
                    />
                    <Text style={style.text}>{` ${item.endereco}`}</Text>
                </View>
                <View style={style.containerText}>
                <Icon
                        name='phone'
                        type='font-awesome'
                        color='#2962F4'
                        style={{marginLeft:12, marginRight:6,marginTop:2}}
                    />
                    <Text style={style.text}>{`${item.telefone}`}</Text>
                </View>
                <View style={style.containerText}>
                <Icon
                        name='calendar'
                        type='font-awesome'
                        color='#2962F4'
                        size={20}
                        style={{marginLeft:12, marginRight:6,}}
                    />
                    <Text style={style.text}>{`${item.dt_nascimento}`}</Text>
                </View>
                <View>
                    <Text style={style.text2}>Agenda</Text>
                </View>
                <View style={style.container2}>
                    <View style={{
                        marginLeft:10,
                        marginRight:10,
                        width:58,
                        alignItems:'center',
                        borderRadius:8,
                     
                    }}>
                        <Text style={style.text3}>Seg</Text>
                    </View>
                    <View >
                        <Text style={style.text3}>Ter</Text>
                    </View>
                    <View >
                        <Text style={style.text3}>Qua</Text>
                    </View>
                    <View >
                        <Text style={style.text3}>Qui</Text>
                    </View>
                    <View >
                        <Text style={style.text3}>Sex</Text>
                    </View>
                </View>
            </View>
            
        </View>
        
    );
}

export default PassageiroD;