import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'

export default function Ccr({ data }) {
    return (
        <Animatable.View 
        style={styles.container}
        animation='zoomIn'
        delay={600}
        >
        <Text  style={styles.label}>{data.ccr}</Text>
            <View style={styles.content}>
                <Text style={styles.value}>Média: {data.media_final}</Text>
                <Text style={styles.value}>{data.frequencia}</Text>
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