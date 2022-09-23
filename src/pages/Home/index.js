import React from 'react';
import {
  View, Text, StyleSheet, FlatList,
  SafeAreaView, RefreshControl, ActivityIndicator
} from 'react-native';
import Header from '../../components/Header';
import Ccr from '../../components/Ccr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function Home() {
  const [notas, setNotas] = React.useState([])
  const [refreshing, setRefreshing] = React.useState(true);
  const navigation = useNavigation()

  const getNotasSemestre = async () => {
    setRefreshing(true)
    const session = await AsyncStorage.getItem('session')
    fetch(`https://api-portal-aluno.mascdriver.com.br/notas_semestre/${session}`)
      .then((response) => response.json())
      .then((json) => {
        setNotas(json);
        setRefreshing(false)
      })
      .catch((error) => {
        AsyncStorage.removeItem('session').then(() => navigation.navigate('Welcome'))
      });
  }

  React.useEffect(() => {
    getNotasSemestre();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header name="Diogo" />
      {refreshing ? <ActivityIndicator size={75} style={styles.activityIndicator} color="#000000"/> :
        <FlatList style={styles.list} data={notas} keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false} renderItem={({ item }) => <Ccr data={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getNotasSemestre} style={styles.list} />
          } />
      }

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#b5ccba'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14
  },
  list: {
    marginStart: 14,
    marginEnd: 14,
    paddingStart: 14
  },
  activityIndicator:{
    flex: 1,
    justifyContent: 'center',
  }
})