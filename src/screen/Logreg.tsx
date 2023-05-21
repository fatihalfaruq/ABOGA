import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Pindah} from '../../App';

const Logreg = () => {
  const navigation = useNavigation<NativeStackNavigationProp<Pindah>>();
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
        <View style={{top: hp('40%')}}>
          <View style={{alignItems: 'center', bottom: 40}}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View style={styles.bb1}>
                <Text style={styles.bte1}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center', bottom: 20}}>
            <TouchableOpacity onPress={() => navigation.navigate('Regis')}>
              <View style={styles.bb2}>
                <Text style={styles.bte2}>Register</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Logreg;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
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
  bb1: {
    backgroundColor: '#D8D8D8',
    width: wp('60%'),
    height: hp('7%'),
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bb2: {
    backgroundColor: '#D8D8D8',
    width: wp('60%'),
    height: hp('7%'),
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bte1: {fontSize: wp('8%'), fontWeight: 'bold', color: 'black'},
  bte2: {fontSize: wp('8%'), fontWeight: 'bold', color: 'black'},
});
