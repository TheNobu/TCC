import { StyleSheet, Text, View, Button } from "react-native";
import { Input, Icon } from '@rneui/themed';
import { Formik } from 'formik';
import { TextInput as PaperInput } from 'react-native-paper';
import axios from "axios";
import { useState } from "react";


const style = StyleSheet.create({
    container:{
        margin:24,
        marginTop:80,
        alignContent:"center",
        alignItems:"flex-start",
    },
    text:{
        fontSize:22,
        fontFamily: 'Inter_600SemiBold',
        marginLeft:12,
        fontStyle:'italic',
        
    }
})

const Cadastro = () => {
    const [nome,setNome] = useState("");
    const [ponto,setPonto] = useState("");
    const [endereco,setEndereco] = useState("");
    const [data,setData] = useState("");
    return (
        <View>
            <View>
                <Text style={style.text}>Nome</Text>
                <PaperInput
                label="Nome"
                value={nome}
                onChangeText={setNome}
                style={{
                    backgroundColor:'#fff',
                    marginLeft:12,
                    marginRight:12,
                    
                }}
                />
            </View>
            <View >
                <Text style={style.text}>Ponto</Text>
                <PaperInput
                label="Ponto"
                value={ponto}
                onChangeText={setPonto}
                style={{
                    backgroundColor:'#fff',
                    marginLeft:12,
                    marginRight:12,
                }}
                />
            </View>
            <View>
                <Text style={style.text}>Endereço</Text>
                <PaperInput
                label="Endereço"
                value={endereco}
                onChangeText={setEndereco}
                style={{
                    backgroundColor:'#fff',
                    marginLeft:12,
                    marginRight:12,
                }}
                />
            </View>
            <View>
                <Text style={style.text}>Data Nascimento</Text>
                <PaperInput
                label="Data Nascimento"
                value={data}
                onChangeText={setData}
                style={{
                    backgroundColor:'#fff',
                    marginLeft:12,
                    marginRight:12,
                }}
                />
            </View>
        </View>
        

    );
}


export default Cadastro;



{/* <View style={styles.container}>
      <Formik
        initialValues={{ nome: '', email: '', telefone: '' }}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};
          if (!values.nome) {
            errors.nome = 'Nome é obrigatório';
          }
          if (!values.email) {
            errors.email = 'Email é obrigatório';
          }
          // Adicione mais validações conforme necessário
          return errors;
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <PaperInput
              label="Nome"
              value={values.nome}
              onChangeText={handleChange('nome')}
              onBlur={handleBlur('nome')}
              error={errors.nome}
            />
            <PaperInput
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={errors.email}
            />
            <PaperInput
              label="Telefone"
              value={values.telefone}
              onChangeText={handleChange('telefone')}
              onBlur={handleBlur('telefone')}
            />
            <Button title="Enviar" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}; */}