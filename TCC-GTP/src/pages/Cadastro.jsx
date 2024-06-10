import { StyleSheet, Text, View } from "react-native";
import { Input, Icon } from '@rneui/themed';
import { Formik } from 'formik';
import { TextInput as PaperInput, HelperText } from 'react-native-paper';
import axios from "axios";
import { useState } from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { TextInputMask } from 'react-native-masked-text';
import { size } from "lodash";

const style = StyleSheet.create({
    container: {
        margin: 24,
        marginTop: 80,
        alignContent: "center",
        alignItems: "flex-start",
    },
    text: {
        fontSize: 22,
        fontFamily: 'Chivo_200ExtraLight_Italic',
        marginLeft: 12,
    },
    text2: {
        fontSize: 22,
        fontFamily: 'Chivo_200ExtraLight_Italic',
        marginLeft: 12,
        marginTop: 20,
    }
});

const Cadastro = () => {
    const navigation = useNavigation();
    const [nome, setNome] = useState("");
    const [ponto, setPonto] = useState("");
    const [endereco, setEndereco] = useState("");
    const [data, setData] = useState("");
    const [dataError, setDataError] = useState('');
    const [telefone, setTelefone] = useState("");
    const [telefoneError, setTelefoneError] = useState('');
    const [segunda, setSegunda] = useState(false);
    const [terca, setTerca] = useState(false);
    const [quarta, setQuarta] = useState(false);
    const [quinta, setQuinta] = useState(false);
    const [sexta, setSexta] = useState(false);

    const changeColor = () => setSegunda(!segunda);
    const changeColor2 = () => setTerca(!terca);
    const changeColor3 = () => setQuarta(!quarta);
    const changeColor4 = () => setQuinta(!quinta);
    const changeColor5 = () => setSexta(!sexta);

    const validacao = () => {
        if (!nome.trim()) {
            alert('Por favor, preencha o campo nome.');
            return;
        }
        if (!telefone.trim()) {
            alert('Por favor, preencha o campo telefone.');
            return;
        }
        if (!ponto.trim()) {
            alert('Por favor, preencha o campo ponto.');
            return;
        }
        if (!endereco.trim()) {
            alert('Por favor, preencha o campo endereço.');
            return;
        }
        if (!data.trim() || !data.includes('-')) {
            setDataError('Utilize o formato 00-00-0000');
            return;
        }

        // const phoneRegex = /^[0-9]{10,11}$/;
        // if (!phoneRegex.test(telefone)) {
        //     setTelefoneError('Por favor, insira um número de telefone válido.');
        //     return;
        // }
        if (!segunda && !terca && !quarta && !quinta && !sexta) {
            alert("Por favor selecione os dias da semana");
            return;
        }

        navigation.navigate('Cadastro2', { params: { nome, telefone, ponto, endereco, data, segunda, terca, quarta, quinta, sexta } });
    };

    return (
        <View>
            <View>
                <Text style={style.text}>Nome</Text>
                <PaperInput
                    label="Nome"
                    value={nome}
                    onChangeText={setNome}
                    maxLength={40}
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
                        backgroundColor: '#fff',
                        marginLeft: 12,
                        marginRight: 12,
                    }}
                />
            </View>
            <View>
                <Text style={style.text}>Telefone</Text>
                <TextInputMask
                    type={'cel-phone'}
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) '
                    }}
                    value={telefone}
                    onChangeText={setTelefone}
                    customTextInput={PaperInput}
                    customTextInputProps={{
                        label: "Telefone",
                        keyboardType: "phone-pad",
                        maxLength: 15,
                        theme: {
                            roundness: 10,
                            colors: {
                                primary: '#2962F4',
                                text: '#000000',
                                placeholder: '#CCCCCC',
                                background: '#FFFFFF',
                            },
                        },
                        style: {
                            backgroundColor: '#fff',
                            marginLeft: 12,
                            marginRight: 12,
                        }
                    }}
                />
                {telefoneError ? <Text style={{ fontSize: 16, marginLeft: 14, color: '#d44' }}>{telefoneError}</Text> : null}
            </View>
            <View>
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
                        backgroundColor: '#fff',
                        marginLeft: 12,
                        marginRight: 12,
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
                        backgroundColor: '#fff',
                        marginLeft: 12,
                        marginRight: 12,
                    }}
                />
            </View>
            <View>
                <Text style={style.text}>Data Nascimento</Text>
                <TextInputMask
                    type={'datetime'}
                    options={{
                        format: 'DD-MM-YYYY'
                    }}
                    value={data}
                    onChangeText={setData}
                    customTextInput={PaperInput}
                    customTextInputProps={{
                        label: "Data Nascimento",
                        keyboardType: "phone-pad",
                        maxLength: 10,
                        theme: {
                            roundness: 10,
                            colors: {
                                primary: '#2962F4',
                                text: '#000000',
                                placeholder: '#CCCCCC',
                                background: '#FFFFFF',
                            },
                        },
                        style: {
                            backgroundColor: '#fff',
                            marginLeft: 12,
                            marginRight: 12,
                        }
                    }}
                />
                {dataError ? <Text style={{ fontSize: 16, marginLeft: 14, color: '#d44' }}>{dataError}</Text> : null}
            </View>
            <Text style={style.text2}>Agenda do Passageiro</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                <Button
                    mode="elevated"
                    onPress={changeColor}
                    textColor={segunda ? '#fff' : '#2962F4'}
                    style={{
                        backgroundColor: segunda ? '#2962F4' : '#fff',
                        margin: 8,
                        marginTop: 22,
                        width: 74,
                    }}
                >Seg</Button>
                <Button
                    mode="elevated"
                    onPress={changeColor2}
                    textColor={terca ? '#fff' : '#2962F4'}
                    style={{
                        backgroundColor: terca ? '#2962F4' : '#fff',
                        margin: 8,
                        marginTop: 22,
                        width: 74,
                    }}
                >Ter</Button>
                <Button
                    mode="elevated"
                    onPress={changeColor3}
                    textColor={quarta ? '#fff' : '#2962F4'}
                    style={{
                        backgroundColor: quarta ? '#2962F4' : '#fff',
                        margin: 8,
                        marginTop: 22,
                        width: 74,
                    }}
                >Qua</Button>
                <Button
                    mode="elevated"
                    onPress={changeColor4}
                    textColor={quinta ? '#fff' : '#2962F4'}
                    style={{
                        backgroundColor: quinta ? '#2962F4' : '#fff',
                        margin: 8,
                        marginTop: 22,
                        width: 74,
                    }}
                >Qui</Button>
                <Button
                    mode="elevated"
                    onPress={changeColor5}
                    textColor={sexta ? '#fff' : '#2962F4'}
                    style={{
                        backgroundColor: sexta ? '#2962F4' : '#fff',
                        margin: 8,
                        marginTop: 22,
                        width: 74,
                    }}
                >Sex</Button>
            </View>
            <Button
                mode="elevated"
                textColor='#fff'
                onPress={validacao}
                style={{
                    backgroundColor: '#2962F4',
                    marginLeft: 28,
                    marginRight: 28,
                    marginTop: 28
                }}
            >Continuar cadastro</Button>
        </View>
    );
}

export default Cadastro;
