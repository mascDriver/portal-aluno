import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Ccr({ data, navigation }) {
    const [notas, setNotas] = React.useState([])
    const getNotasSemestreDetalhada = async (cc_id) => {
        console.log(cc_id)
        const session = await AsyncStorage.getItem('session')
        const response = await fetch(`http://192.168.2.107:8000/notas_semestre/${cc_id}/detalhada/${session}`)
        const json = await response.json()

        setNotas(json);
        console.log(notas)
    }
    return (
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
            <View style={styles.content}>
                <TouchableOpacity onPress={async () => getNotasSemestreDetalhada(data.id)}>
                    <Text style={styles.value}>Notas:</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
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
        marginBottom: 8,
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
})