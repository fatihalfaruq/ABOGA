import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Logreg from '../screen/Logreg';
import Home from '../screen/Home';
import Cart from '../screen/Cart';
import Admin from '../screen/Admin';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const Bottom = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {height: 60, backgroundColor: '#838383'},

        tabBarIcon: ({focused, size, color}) => {
          let iconName: any;
          if (route.name === 'Admin') {
            iconName = focused ? 'cog' : 'cog';
            color = focused ? '#20C0CA' : 'black';
            size = focused ? size + 25 : size + 10;
          } else if (route.name === 'Logreg') {
            iconName = focused ? 'account' : 'account';
            color = focused ? '#20C0CA' : 'black';
            size = focused ? size + 25 : size + 10;
          } else if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
            color = focused ? '#20C0CA' : 'black';
            size = focused ? size + 25 : size + 10;
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart';
            color = focused ? '#20C0CA' : 'black';
            size = focused ? size + 25 : size + 10;
          } else if (route.name === 'Notif') {
            iconName = focused ? 'bell' : 'bell';
            color = focused ? '#20C0CA' : 'black';
            size = focused ? size + 25 : size + 10;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        options={{headerShown: false}}
        name="Admin"
        component={Admin}
      />
      <Tab.Screen options={{headerShown: false}} name="Home" component={Home} />

      <Tab.Screen options={{headerShown: false}} name="Cart" component={Cart} />
      <Tab.Screen
        options={{headerShown: false}}
        name="Logreg"
        component={Logreg}
      />
    </Tab.Navigator>
  );
};

export default Bottom;

const styles = StyleSheet.create({});
