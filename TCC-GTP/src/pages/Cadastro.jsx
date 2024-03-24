import { StyleSheet, Text, View } from "react-native";
import axios from "axios";


const style = StyleSheet.create({
    container:{
        margin:22
    },
    text:{
        fontSize:18
    }
})

const Cadastro = () => {
    return (
        <View>
            <View style={style.container}>
                <Text style={style.text}>Nome</Text>
            </View>
            <View>
                <Text>Ponto</Text>
            </View>
            <View>
                <Text>Endereço</Text>
            </View>
            <View>
                <Text>Data Nascimento</Text>
            </View>
        </View>
    );
}

export default Cadastro;