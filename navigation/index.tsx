// navigation/index.tsx の内容
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../src/screens/HomeScreen';
import MatrixScreen from '../src/screens/MatrixScreen';
import DetailScreen from '../src/screens/DetailScreen';
import MachineInfoScreen from '../src/screens/MachineInfoScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Matrix" component={MatrixScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="MachineInfo" component={MachineInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}