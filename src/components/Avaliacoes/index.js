import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Avaliacoes({ data, navigation }) {
    return (
        <View style={styles.container}>
            <Text>{data.data}</Text>
            <Text>{data.avaliacao}</Text>
            <Text>{data.nota}</Text>
            <Text>{data.peso}</Text>
            <Text>{data.nota_final}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    }
})