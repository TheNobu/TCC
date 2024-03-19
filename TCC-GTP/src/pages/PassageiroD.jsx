import { View,Text, Image, StyleSheet  } from "react-native";
import { useRoute } from '@react-navigation/native';

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#B5C7F5',
    },
    textNome:{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30,
        fontFamily: 'Inter_600SemiBold',
        height: 40,
        marginRight:16,
        textAlign:"center",
    },
    textPonto:{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 22,
        fontStyle:"italic",
        height: 28,
        marginRight:16,
        textAlign:"center"
    },
    text:{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30,
        fontStyle:"italic",
        height: 80,
        marginRight:16,
        textAlign:"center"
    },
    
})


const PassageiroD = () => {

    const route = useRoute();
    const {item} = route.params;
  
    return (
        <View style={style.container}>
            <Text style={style.textNome}> {` ${item.nome}`}</Text>
            <Text style={style.textPonto}>{` ${item.ponto}`}</Text>
            <Text style={style.text}>{`endereço: ${item.endereco}`}</Text>
            <Text style={style.text}>{`CPF: ${item.cpf}`}</Text>
            <Text style={style.text}>{`telefone: ${item.telefone}`}</Text>
            <Text style={style.text}>{`nascimento: ${item.dt_nascimento}`}</Text>
             
        </View>
    );
}

export default PassageiroD;