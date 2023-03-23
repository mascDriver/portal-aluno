import AsyncStorage from '@react-native-async-storage/async-storage';

export const getApiNotasSemestre = async () => {
    return fetch(`${process.env.API_URL}/notas_semestre/${await AsyncStorage.getItem('session')}`)
}

export const getApiAvaliacoesCcrSemestreDetalhada = async (cc_id) => {
    return fetch(`${process.env.API_URL}/notas_semestre/${cc_id}/detalhada/${await AsyncStorage.getItem('session')}`)
}

export const getApiNotasMatriz = async (cc_id) => {
    return fetch(`${process.env.API_URL}/notas_matriz/${await AsyncStorage.getItem('session')}`)
}