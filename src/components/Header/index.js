import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable'

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;
export default function Header({ name }) {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Animatable.View animation='fadeInLeft' delay={500}  style={styles.content}>
                <Text style={styles.username}>Seja bem-vindo(a) 
                <Text style={{textTransform: 'capitalize'}}> {name}</Text>
                </Text>

                <TouchableOpacity activeOpacity={0.9} style={styles.buttonLogOut} 
                onPress={async () => {
                    await AsyncStorage.removeItem('session')
                    await AsyncStorage.removeItem('name')
                    navigation.navigate('Welcome')
                }}
                >
                    <Feather name='log-out' size={20} color="#fff" />
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#006d40',
        paddingTop: statusBarHeight,
        flexDirection: 'row',
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 44,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    username: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    },
    buttonLogOut: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40 / 2

    }
})