import { StyleSheet, Text, View } from "react-native";
import { Input, Icon } from '@rneui/themed';
import { Formik } from 'formik';
import { TextInput as PaperInput } from 'react-native-paper';
import axios from "axios";
import { useState } from "react";
import { Button } from "react-native-paper";


const style = StyleSheet.create({
    container:{
        margin:24,
        marginTop:80,
        alignContent:"center",
        alignItems:"flex-start",
    },
    text:{
        fontSize:22,
        fontFamily: 'Chivo_200ExtraLight_Italic',
        marginLeft:12,
        
        
    }
})

const Cadastro = () => {
    const [nome,setNome] = useState("");
    const [ponto,setPonto] = useState("");
    const [endereco,setEndereco] = useState("");
    const [data,setData] = useState("");
    const [boo,setBoo] =useState(false);
    const [segunda,setSegunda] = useState(false);
    const [terca, setTerca] = useState(false);
    const [quarta, setQuarta] = useState(false);
    const [quinta, setQuinta] = useState(false);
    const [sexta, setSexta] = useState(false);
    const [sabado, setSabado] = useState(false);
    const [domingo, setDomingo] = useState(false);
  
  


    const changeColor = ()=>{
   
      setSegunda(!segunda);
   
      
  
      if (!segunda) {
        console.log("Segunda vai")
      } else {
        console.log("Segunda não vai")
      }
      
    }
    const changeColor2 = ()=>{
      setTerca(!terca);
    }
    const changeColor3 = ()=>{
      setQuarta(!quarta);
    }
    const changeColor4 =()=>{
      setQuinta(!quinta);
    }
    const changeColor5 =()=>{
      setSexta(!sexta);
    }

    return (
        <View>
            <View>
                <Text style={style.text}>Nome</Text>
                <PaperInput
                label="Nome"
                value={nome}
                onChangeText={setNome}
                theme={{
                  roundness: 10,
                  colors: {
                    primary: '#2962F4', // Mudando a cor primária (cor do rótulo, linha indicadora, etc.)
                    text: '#000000', // Mudando a cor do texto
                    placeholder: '#CCCCCC', // Mudando a cor do placeholder
                    background: '#FFFFFF', // Mudando a cor de fundo do input
                  },
                }}
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
                theme={{
                  roundness: 10,
                  colors: {
                    primary: '#2962F4', 
                    text: '#000000',
                    placeholder: '#CCCCCC', 
                    background: '#FFFFFF', 
                  },
                }}
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
                theme={{
                  roundness: 10,
                  colors: {
                    primary: '#2962F4', 
                    text: '#000000',
                    placeholder: '#CCCCCC', 
                    background: '#FFFFFF', 
                  },
                }}
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
                theme={{
                  roundness: 10,
                  colors: {
                    primary: '#2962F4', 
                    text: '#000000',
                    placeholder: '#CCCCCC', 
                    background: '#FFFFFF', 
                  },
                }}
                style={{
                    backgroundColor:'#fff',
                    marginLeft:12,
                    marginRight:12,
                }}
                />
            </View>
            <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',}}>
              <Button 
                mode="elevated"
                onPress={changeColor}
                textColor= {segunda ? '#fff' : '#2962F4'}
                style={{
                  backgroundColor: segunda ? '#2962F4' : '#fff',
                  margin:8,
                  marginTop:22,
                  width:80,
                }} 
              >Seg</Button>
              <Button 
                mode="elevated"
                onPress={changeColor2}
                textColor="#2962F4"
                style={{
                  backgroundColor: terca ? '#000' : '#fff',
                  margin:8,
                  marginTop:22,
                  width:80,
                }} 
              >Ter</Button>
               <Button 
                mode="elevated"
                onPress={changeColor3}
                textColor="#2962F4"
                style={{
                  backgroundColor: quarta ? '#000' : '#fff',
                  margin:8,
                  marginTop:22,
                  width:80,
                }} 
              >Qua</Button>
               <Button 
                mode="elevated"
                onPress={changeColor4}
                textColor="#2962F4"
                style={{
                  backgroundColor: quinta ? '#000' : '#fff',
                  margin:8,
                  marginTop:22,
                  width:80,
                }} 
              >Qui</Button>
               <Button 
                mode="elevated"
                onPress={changeColor5}
                textColor="#2962F4"
                style={{
                  backgroundColor: sexta ? '#000' : '#fff',
                  margin:8,
                  marginTop:22,
                  width:80,
                }} 
              >Sex</Button>
             
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