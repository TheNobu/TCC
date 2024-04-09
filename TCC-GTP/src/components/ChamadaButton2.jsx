import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const style = StyleSheet.create({
    cointainer:{
        width:50,
        height:50,
        marginVertical:-76,
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
                <Icon
                    name='arrow-up'
                    type='font-awesome'
                    color='#003785'
                    size={26}
                    style={{margin:12}}
                />
        </TouchableOpacity>
    );
}

export default ChamadaButton2;