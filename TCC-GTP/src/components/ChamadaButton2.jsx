import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const style = StyleSheet.create({
    cointainer:{
        width:80,
        height:60,
        borderRadius:16,
        backgroundColor:"#fff"

    },
    text:{
        marginTop:10,
        marginLeft:4,
        fontSize:18,
        padding:8,
        fontWeight:'bold'
    }
})
const ChamadaButton2 = ({title,onPressButton,color}) => {
    return (
        <TouchableOpacity style={[style.cointainer,{backgroundColor:color}]} onPress={onPressButton}>
                <Text style={style.text}>text</Text>
        </TouchableOpacity>
    );
}

export default ChamadaButton2;