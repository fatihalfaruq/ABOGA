import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Bottom from './src/router/Bottom';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './src/screen/Splash';
import Login from './src/screen/Login';
import Regis from './src/screen/Regis';
import Admin from './src/screen/Admin';
import Home from './src/screen/Home';

const Stack = createNativeStackNavigator();
export type Pindah = {
  navigate(arg0: string): unknown;
  Home: undefined;
  Splash: undefined;
  Logreg: undefined;
  Regis: undefined;
  Login: undefined;
  Bottom: undefined;
  Notif: undefined;
  Admin: undefined;
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
          name="Home"
          component={Home}
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
        <Stack.Screen
          options={{headerShown: false}}
          name="Admin"
          component={Admin}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
