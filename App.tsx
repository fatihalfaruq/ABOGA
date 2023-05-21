import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Bottom from './src/router/Bottom';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './src/screen/Splash';
import Index from './src/router/Index';
import Login from './src/screen/Login';
import Regis from './src/screen/Regis';

const Stack = createNativeStackNavigator();
export type Pindah = {
  Home: undefined;
  Splash: undefined;
  Logreg: undefined;
  Bottom: undefined;
  Regis: undefined;
  Login: undefined;
  Index: undefined;
};
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Splash"
          component={Splash}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Bottom"
          component={Bottom}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Index"
          component={Index}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Regis"
          component={Regis}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
