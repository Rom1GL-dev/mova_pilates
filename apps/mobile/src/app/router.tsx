import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home/home';
import { ROUTES } from '@/config/routes.config';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function AppRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTES.home.index}>
        <Stack.Screen name={ROUTES.home.index} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
