import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'

export default function NotasMatriz({ data }) {
    return (
        <Animatable.View
            style={styles.container}
            animation='fadeInUp'
            delay={600}
        >
            <View style={styles.content}>
                <Text style={styles.label}>{data.ccr}</Text>
                <Text>Fase: {data.fase}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.value}>Média: {data.notafinal}</Text>
                {data.frequencia ? <Text style={styles.value}>Frequência: {data.frequencia}</Text>: <Text></Text>}
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