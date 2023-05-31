import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Pindah} from '../../App';

const Cart = () => {
  const navigation = useNavigation<NativeStackNavigationProp<Pindah>>();
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Regis')}>
        <Text>Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
