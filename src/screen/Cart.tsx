import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Cart = () => {
  const images = [
    {price: '$30', name: 'barang1', image: require('../assets/id.jpeg')},
    {price: '$31', name: 'barang2', image: require('../assets/d.png')},
    {price: '$32', name: 'barang3', image: require('../assets/id2.jpeg')},
  ];
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#9444C4', '#20C0CA']}
        style={styles.background}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}>
        <View style={styles.header}>
          <Text style={styles.textheader}>Keranjang Saya</Text>
        </View>
        {images.map((product, index) => (
          <View
            style={{
              marginBottom: hp('2%'),
              top: hp('2%'),
              backgroundColor: '#838383',
              width: wp('75%'),
              height: hp('17%'),
              justifyContent: 'center',
              borderRadius: hp('2%'),
              elevation: 5,
            }}
            key={index}>
            <Image
              style={{
                width: wp('40%'),
                height: hp('15%'),
                marginLeft: wp('2'),
                top: hp('2.7%'),
                borderRadius: hp('2%'),
              }}
              source={product.image}
            />
            <Text
              style={{
                marginLeft: hp('23%'),
                bottom: hp('12%'),
                color: 'black',
                fontSize: hp('2%'),
                fontWeight: 'bold',
              }}>
              {product.name}
            </Text>
            <Text
              style={{
                marginLeft: hp('35%'),
                bottom: hp('4%'),
                color: '#02f740',
                fontSize: hp('2%'),
                fontWeight: 'bold',
              }}>
              {product.price}
            </Text>
          </View>
        ))}

        <View style={styles.checkout}>
          <Text
            style={{
              fontSize: hp('3$'),
              color: 'black',
              fontWeight: 'bold',
              marginLeft: wp('1%'),
            }}>
            Total:
          </Text>
          <Text
            style={{fontSize: hp('3$'), color: 'green', fontWeight: 'bold'}}>
            $100
          </Text>
          <View style={styles.bottomcheckout}>
            <Text style={styles.txtcheck}>CheckOut</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: wp('100%'),
    height: hp('5.8%'),
    backgroundColor: '#20C0CA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textheader: {fontSize: wp('5%'), color: 'black', fontWeight: 'bold'},
  checkout: {
    backgroundColor: '#51bbf5',
    width: wp('100%'),
    height: hp('10%'),
    top: hp('18.7%'),
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomcheckout: {
    backgroundColor: 'blue',
    width: wp('25%'),
    height: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('46%'),
    borderRadius: 15,
  },
  txtcheck: {fontSize: hp('2%'), color: 'white'},
});
