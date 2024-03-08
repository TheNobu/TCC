import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const style = StyleSheet.create({
    cointainer:{
        borderRadius:50,
        width:100,
        height:60,
        marginLeft:280,
        marginVertical:-78,
        borderRadius:16,
        backgroundColor:"#fff"

    },
    text:{
        marginTop:10,
        marginLeft:8,
        fontSize:18,
        padding:8,
        fontWeight:'bold'
    }
})
const ChamadaButton = ({title,onPressButton,color}) => {
    return (
        <TouchableOpacity style={[style.cointainer,{backgroundColor:color}]} onPress={onPressButton}>
                <Text style={style.text}>{title}</Text>
        </TouchableOpacity>
    );
}

export default ChamadaButton;