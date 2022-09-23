import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { Routes } from './src/routes';


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#00693E" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}
