import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const style = StyleSheet.create({
    cointainer:{
        borderRadius:4,
        width:60,
        height:60,
        marginLeft:310,
        marginVertical:-78,
        borderRadius:16,
    },
    text:{
        marginTop:10,
        marginLeft:2,
        fontSize:20,
        padding:8,
    }
})
const ChamadaButton = ({title,onPressButton,color}) => {
    return (
        <TouchableOpacity onPress={onPressButton}>
            <View style={[style.cointainer,{backgroundColor:color}]}>
                <Text style={style.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default ChamadaButton;