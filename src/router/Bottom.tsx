import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Saya from '../screen/Saya';
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

        tabBarStyle: {height: 45, backgroundColor: '#838383'},

        tabBarIcon: ({focused, size, color}) => {
          let iconName: any;
          if (route.name === 'Saya') {
            iconName = focused ? 'account' : 'account';
            color = focused ? '#20C0CA' : 'black';
            size = focused ? size + 20 : size + 6;
          } else if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
            color = focused ? '#20C0CA' : 'black';
            size = focused ? size + 20 : size + 6;
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart';
            color = focused ? '#20C0CA' : 'black';
            size = focused ? size + 20 : size + 6;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen options={{headerShown: false}} name="Home" component={Home} />
      <Tab.Screen options={{headerShown: false}} name="Cart" component={Cart} />
      <Tab.Screen options={{headerShown: false}} name="Saya" component={Saya} />
    </Tab.Navigator>
  );
};

export default Bottom;

const styles = StyleSheet.create({});
