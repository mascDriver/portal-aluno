import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Instrumentos({ data, navigation }) {
    return (
        <View style={styles.container}>
            {data.instrumento ?
                <View>
                    <View style={styles.cabecalho}>
                        <Text style={styles.avaliacao}>{data.instrumento}</Text>
                        <Text style={styles.data}>{data.data}</Text>
                    </View>
                    <View style={styles.notas}>
                        <View style={styles.nota}>
                            <Text>Peso:</Text>
                            <Text>{data.peso}</Text>
                        </View>
                        <View style={styles.nota}>
                            <Text>Nota:</Text>
                            <Text>{data.nota ? data.nota || data.nota == 'NI' : 'NT'}</Text>
                        </View>
                        <View style={styles.nota}>
                            <Text>Nota Rec:</Text>
                            <Text>{data.nota_rec ? data.nota_rec : 'NT'}</Text>
                        </View>
                        <View style={styles.viewNotaFinal}>
                            <Text style={styles.notaFinal}>Nota Final: </Text>
                            <Text style={styles.notaFinal}>{data.nota_final ? data.nota_final : 'NT'}</Text>
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
        alignItems: 'center'
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
    viewNotaFinal: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    avaliacao: {
        fontWeight: 'bold'
    },
    notaFinal: {
        fontSize: 12,
        fontWeight: 'bold',
    }

})