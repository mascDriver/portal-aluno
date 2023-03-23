import React from 'react';
import {
  View, Text, StyleSheet, FlatList,
  SafeAreaView, RefreshControl, ActivityIndicator
} from 'react-native';
import Header from '../../components/Header';
import Ccr from '../../components/Ccr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getApiNotasSemestre } from '../../services/Aluno/Get';
import Toast from 'react-native-toast-message';


export default function Home() {
  const [notas, setNotas] = React.useState([])
  const [nameUser, setName] = React.useState('')
  const [refreshing, setRefreshing] = React.useState(true);
  const navigation = useNavigation()

  const getNameUser = async () => {
    const name = await AsyncStorage.getItem('name')
    setName(name.split(' ')[0])
  }

  const getNotas = async () => {
    setRefreshing(true)
    const session = await AsyncStorage.getItem('session')
    const response = await getApiNotasSemestre()
    const json = await response.json()
    if (response.ok) {
      setNotas(json);
      setRefreshing(false)
    }
    else {
      console.log(json)
      Toast.show({
        type: 'error',
        text1: 'Sessão expirada!',
        text2: 'Por favor, efetue o login novamente.'
      });
      AsyncStorage.removeItem('session').then(() => navigation.navigate('Welcome'))
    }
  }

  React.useEffect(() => {
    getNotas();
    getNameUser();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentHeader}>
        <Header name={nameUser} />
      </View>

      <Text style={styles.titlePage}>Notas do semestre</Text>
      <View style={styles.content}>
        {
          refreshing ?
            <ActivityIndicator size={75} style={styles.activityIndicator} color="#000000" />
            :
            <FlatList style={styles.list} data={notas} keyExtractor={(item) => String(item.id)}
              showsVerticalScrollIndicator={false} renderItem={({ item }) => <Ccr data={item} navigation={navigation} />}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={getNotas} style={styles.list} />
              } />
        }
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00693E'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14
  },
  titlePage: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14,
    color: '#FFF',

  },
  list: {
    marginStart: 14,
    marginEnd: 14,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
  contentHeader: {
    flex: 1,
    backgroundColor: "#00693E",
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 5,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
  }
})