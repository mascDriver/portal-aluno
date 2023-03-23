import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, FlatList } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Avaliacoes from '../Avaliacoes';
import { getApiAvaliacoesCcrSemestreDetalhada } from '../../services/Aluno/Get';

export default function Ccr({ data, navigation }) {
    const [notas, setNotas] = React.useState([])
    const [press, setPress] = React.useState(false)
    const [loading, setLoading] = React.useState(false);
    const getNotasSemestreDetalhada = async (cc_id) => {
        setLoading(true)
        const session = await AsyncStorage.getItem('session')
        const response = await getApiAvaliacoesCcrSemestreDetalhada(cc_id)
        const json = await response.json()

        setNotas(json);
        setLoading(false)
    }
    return (
        <Pressable onPress={() => setPress(!press)}>
            <Animatable.View
                style={styles.container}
                animation='fadeInUp'
                delay={600}
            >
                <Text style={styles.label}>{data.ccr}</Text>
                <View style={styles.content}>
                    <Text style={styles.value}>Média: {data.media_final}</Text>
                    <Text style={styles.value}>{data.frequencia}</Text>
                </View>
                <View style={styles.contentNota}>
                    <Pressable style={styles.buttonAvaliacoes} onPress={async () => {
                        setPress(true)
                        getNotasSemestreDetalhada(data.id)
                    }
                    }>
                        <Text style={styles.textAtualizarNotas}>{press ? 'Atualizar notas' :  'Visualizar Notas'}</Text>
                        <MaterialIcons name={'update'} size={20} style={{ paddingRight: 20 }} color={'grey'} />
                    </Pressable>
                    {press ? (loading ? <ActivityIndicator size={40} style={styles.activityIndicator} color="#000000" />
                        :
                        <FlatList style={styles.list} data={notas} keyExtractor={(item) => String(item.id)}
                            renderItem={({ item }) => <Avaliacoes data={item} />}
                        />) : <></>
                    }
                </View>
            </Animatable.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24,
        borderBottomWidth: 0.5,
        borderBottomColor: '#DADADA',

    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    value: {
        marginTop: 16,
        fontSize: 16,
    },
    textAtualizarNotas:{
        paddingRight: 5,
        marginTop: 10,
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    list: {
        marginBottom: 15,
        marginTop: 15,
    },
    buttonAvaliacoes: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-end',
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10
    }
})