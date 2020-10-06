import React from 'react';
import { View } from 'react-native';
import Cep from './src/pages/Cep';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Cep />
    </View>
  );
}