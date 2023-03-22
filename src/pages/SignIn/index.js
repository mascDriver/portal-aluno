import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Anchor } from 'react-native';
import * as Animatable from 'react-native-animatable'
import base64 from 'react-native-base64'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { postLogin } from '../../services/Aluno/Post';
import { A } from '@expo/html-elements';

export default function SignIn() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const navigation = useNavigation()

  const getSession = async () => {
    setLoading(true);
    const encoded = base64.encode(username + ":" + password);
    try {
      const response = await postLogin(encoded)
      const json = await response.json();
      try {
        console.log(json)
        await AsyncStorage.setItem('session', json.session)
        await AsyncStorage.setItem('name', json.name)
        navigation.navigate('Home')
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
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
          onChangeText={text => setUsername(text)} placeholder='IdUFFS ou CPF' style={styles.input} autoCapitalize='none' />


        <Text style={styles.title}>Senha</Text>
        <TextInput
          onChangeText={text => setPassword(text)} placeholder='Senha' style={styles.input} secureTextEntry={true} />

        <TouchableOpacity style={isLoading ? styles.buttonLoading : styles.button} onPress={getSession} disabled={isLoading}>
          {isLoading ? <ActivityIndicator size={40} style={styles.activityIndicator} color="#000000" />
            : <Text style={styles.buttonText}>
              Acessar
            </Text>
          }
        </TouchableOpacity>
        <Text style={styles.textTerms}>
          Ao logar, você concorda com os <A style={styles.textLinkTerms} href="https://mascdriver.github.io/portal-aluno/terms_and_conditions.md">termos e condições</A>  para o uso do aplicativo.
        </Text>

      </Animatable.View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00693E'
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
    backgroundColor: '#00693E',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLoading: {
    width: '100%',
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  textLinkTerms: {
    textDecorationLine: 'underline',
    color: 'blue'
  },
  textTerms:{
    marginTop: 10
  }
})