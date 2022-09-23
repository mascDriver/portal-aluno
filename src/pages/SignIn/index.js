import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'
import base64 from 'react-native-base64'

export default function SignIn() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const getSession = async () => {
    setLoading(true);
    const encoded =base64.encode(username + ":" + password);
    try {
      const response = await fetch('https://api-portal-aluno.mascdriver.com.br/login', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': `Basic ${encoded}`
        }
      });
      const json = await response.json();
      console.error(json);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
    }
  }
  return (
    <View style={styles.container}>
      <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation='fadeInUp' style={styles.containerForm}>
        <Text style={styles.title}>Username</Text>
        <TextInput
          onChangeText={text => setUsername(text)} placeholder='IdUFFS ou CPF' style={styles.input}/>


        <Text style={styles.title}>Senha</Text>
        <TextInput
          onChangeText={text => setPassword(text)} placeholder='Senha' style={styles.input} secureTextEntry={true}/>

        <TouchableOpacity style={styles.button} onPress={getSession}>
          <Text style={styles.buttonText}>
            {isLoading? 'Efetuando Login': 'Acessar'}
          </Text>
        </TouchableOpacity>

      </Animatable.View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006d40'
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%'
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff'
  },
  containerForm: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  title: {
    fontSize: 20,
    marginTop: 28
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16
  },
  button: {
    backgroundColor: '#006d40',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
})