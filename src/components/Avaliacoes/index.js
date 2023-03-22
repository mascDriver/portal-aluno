import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Avaliacoes({ data, navigation }) {
    return (
        <View style={styles.container}>
            {data.avaliacao ?
                <View>
                    <View style={styles.cabecalho}>
                        <Text style={styles.data}>{data.data}</Text>
                        <Text style={styles.avaliacao}>{data.avaliacao}</Text>
                    </View>
                    <View style={styles.notas}>
                        <View style={styles.nota}>
                            <Text>Peso:</Text>
                            <Text>{data.peso}</Text>
                        </View>
                        <View style={styles.nota}>
                            <Text>Nota Final:</Text>
                            <Text>{data.nota_final ? data.nota_final : 'NT'}</Text>
                        </View>
                    </View>
                </View>
                :
                <Text style={styles.data}>{data.data}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        elevation: 5,
        padding: 15,
        backgroundColor: '#f1f1f1',
        borderColor: '#c4c4c4',
        borderBottomWidth: 1,
    },

    cabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    data: {
        fontSize: 12
    },
    notas: {

    },
    nota: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    avaliacao: {
        fontWeight: 'bold'
    }

})