import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Keyboard
} from 'react-native';
import api from '../services/api';
//https://viacep.com.br/ws/79560000/json

export default function Cep() {
  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setcepUser] = useState(null)

  async function buscar() {
    if (cep == '' || cep.length < 8) {
      alert('Digite um Cep Válido');
      setCep('');
      return;//
    }
    try {
      const response = await api.get(`/${cep}/json`);
      setcepUser(response.data);
      Keyboard.dismiss(); //Garantir que o teclado será fechado
    } catch (error) {
      console.log('Error: ' + error);
    }

  }

  function limpar() {
    setCep('');
    inputRef.current.focus();
    setcepUser(null);

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        alignItems: "center"
      }}>
        <Text style={styles.text}>Digite o Cep Desejado</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o Cep Desejado"
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          keyboardType="numeric"
          ref={inputRef} />
      </View>
      <View style={styles.areabtns}>


        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#1d75cd' }]}
          onPress={buscar}>
          <Text style={styles.textobotao}>
            Buscar
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#cd3e1d' }]}
          onPress={limpar}
        >
          <Text style={styles.textobotao}>
            Limpar
          </Text>
        </TouchableOpacity>

      </View>
      {cepUser &&
        <View style={styles.resultado}>
          <Text style={styles.itemtext}> CEP: {cepUser.cep}</Text>
          <Text style={styles.itemtext}> Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemtext}> Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemtext}> Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemtext}> Estado:{cepUser.uf}</Text>
          <Text style={styles.itemtext}> DDD: {cepUser.ddd}</Text>
        </View>}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center"
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '90%',
    padding: 10
  },
  areabtns: {
    alignItems: 'center',
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-around"
  },
  botao: {
    height: 50,
    justifyContent: 'center',
    alignItems: "center",
    padding: 15,
    borderRadius: 5
  },
  textobotao: {
    fontSize: 22,
    color: '#fff',
    fontWeight: "bold"
  },
  resultado: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  itemtext: {
    fontSize: 22,
    fontWeight: "bold"
  }
})