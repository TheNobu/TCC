import { View,Text, Image, StyleSheet  } from "react-native";
import { useRoute } from '@react-navigation/native';



const PassageiroD = () => {

    const route = useRoute();
    const {name} = route.params;
  
    return (
        <View>
            <Text>{`Name: ${name}`}</Text>
        </View>
    );
}

export default PassageiroD;