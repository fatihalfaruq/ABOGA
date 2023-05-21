import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Admin = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#9444C4', '#20C0CA']}
        style={styles.background}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}>
        <View style={styles.header}>
          <Text style={styles.th}>ABOGA</Text>
          <View style={{flexDirection: 'row', right: 10}}>
            <Icon name="magnify" size={hp('5.5%')} color={'black'} />
            <Icon name="menu" size={hp('5.5%')} color={'black'} />
          </View>
        </View>
        <Text
          style={{
            fontSize: hp('3%'),
            fontWeight: 'bold',
            color: 'black',
            top: 10,
          }}>
          List data user:
        </Text>
      </LinearGradient>
    </View>
  );
};

export default Admin;

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
    height: hp('5.5%'),
    backgroundColor: '#20C0CA',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  th: {
    fontSize: hp('3.5%'),
    color: 'black',
    fontWeight: 'bold',
    left: 10,
  },
});
