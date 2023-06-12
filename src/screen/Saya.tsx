import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  DrawerLayoutAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Pindah} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from 'react-native/Libraries/NewAppScreen';
interface RegisteredData {
  id: string;
  username: string;
  email: string;
  gender: string;
  umur: string;
  alamat: string;
  password: string;
  level: string;
}
const Saya = () => {
  const navigation = useNavigation<NativeStackNavigationProp<Pindah>>();
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredData[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const Logout = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const requestOptions = {
        method: 'POST',
        headers: {Authorization: `bearer ${value}`},
        redirect: 'follow',
      };
      fetch(
        'https://fb54-2001-448a-4041-6d4e-3e88-a02d-98cd-37ca.ngrok-free.app/api/logout',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          console.log(result);
          AsyncStorage.removeItem('token');
          navigation.replace('Login');
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${value}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
      fetch(
        'https://fb54-2001-448a-4041-6d4e-3e88-a02d-98cd-37ca.ngrok-free.app/api/profile',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result.profile), setRegisteredUsers(result.profile);
        })
        .catch(error => console.log('error', error));
    });
  }, []);
  const drawerRef = useRef<DrawerLayoutAndroid>(null);
  const navigationView = (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Regis')}>
        <Text style={{color: 'red', fontSize: hp('3%')}}>register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{color: 'red', fontSize: hp('3%')}}>login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Logout}>
        <Text style={{color: 'red', fontSize: hp('3%')}}>logout</Text>
      </TouchableOpacity>
    </View>
  );
  const toggleDrawer = () => {
    if (drawerRef.current) {
      if (isDrawerOpen) {
        drawerRef.current.closeDrawer();
      } else {
        drawerRef.current.openDrawer();
      }
    }
  };
  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition={'left'}
      drawerBackgroundColor="#fff"
      renderNavigationView={() => navigationView}
      onDrawerClose={() => setIsDrawerOpen(false)}
      onDrawerOpen={() => setIsDrawerOpen(true)}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#9444C4', '#20C0CA']}
          style={styles.background}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}>
          <View style={styles.header}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../assets/lo.png')}
                style={styles.imgprofil}
              />
              {registeredUsers.map((profile, index) => (
                <View key={index}>
                  <Text
                    style={{fontSize: wp('5%'), color: 'black', top: wp('4%')}}>
                    {profile.username}
                  </Text>
                </View>
              ))}
            </View>
            <TouchableOpacity onPress={toggleDrawer}>
              <Image style={styles.ic1} source={require('../assets/ham.png')} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: 'black',
              width: wp('100%'),
              height: hp('0.2%'),
            }}></View>
          <View
            style={{
              backgroundColor: '#20C0CA',
              width: wp('100%'),
              height: hp('3%'),
            }}></View>
          <View
            style={{
              backgroundColor: 'black',
              width: wp('100%'),
              height: hp('0.2%'),
            }}></View>
          <View
            style={{
              width: wp('100%'),
              height: hp('6%'),
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              style={styles.shiping}
              source={require('../assets/shiping.png')}
            />

            <Text
              style={{
                fontSize: wp('5%'),
                color: 'black',
                fontWeight: 'bold',
              }}>
              Riwayat pesanan
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'black',
              width: wp('100%'),
              height: hp('0.2%'),
            }}></View>
          <View
            style={{
              backgroundColor: '#20C0CA',
              width: wp('100%'),
              height: hp('1%'),
            }}></View>
          <View
            style={{
              backgroundColor: 'black',
              width: wp('100%'),
              height: hp('0.2%'),
            }}></View>
          <View
            style={{
              width: wp('100%'),
              height: hp('10%'),
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: wp('10%'),
              }}>
              <Image
                style={{width: wp('10%'), height: hp('5%')}}
                source={require('../assets/wallet.png')}
              />
              <Text style={{fontSize: wp('3.5%'), color: 'black'}}>
                Belum bayar
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: wp('10%'),
              }}>
              <Image
                style={{width: wp('10%'), height: hp('5%')}}
                source={require('../assets/box.png')}
              />
              <Text style={{fontSize: wp('3.5%'), color: 'black'}}>
                Dikemas
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: wp('10%'),
              }}>
              <Image
                style={{width: wp('10%'), height: hp('5%')}}
                source={require('../assets/carbox.png')}
              />
              <Text style={{fontSize: wp('3.5%'), color: 'black'}}>
                Di kirim
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{width: wp('10%'), height: hp('5%')}}
                source={require('../assets/feedback.png')}
              />
              <Text style={{fontSize: wp('3.5%'), color: 'black'}}>
                Beri Penilaian
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'black',
              width: wp('100%'),
              height: hp('0.2%'),
            }}></View>
          <View
            style={{
              backgroundColor: '#20C0CA',
              width: wp('100%'),
              height: hp('3%'),
            }}></View>
          <View
            style={{
              backgroundColor: 'black',
              width: wp('100%'),
              height: hp('0.2%'),
            }}></View>
          <View
            style={{
              width: wp('100%'),
              height: hp('6%'),
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              style={styles.shiping}
              source={require('../assets/dompet.png')}
            />

            <Text
              style={{
                fontSize: wp('5%'),
                color: 'black',
                fontWeight: 'bold',
              }}>
              E-saku
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'black',
              width: wp('100%'),
              height: hp('0.2%'),
            }}></View>
          <View
            style={{
              backgroundColor: '#20C0CA',
              width: wp('100%'),
              height: hp('1%'),
            }}></View>
          <View
            style={{
              backgroundColor: 'black',
              width: wp('100%'),
              height: hp('0.2%'),
            }}></View>
          <View
            style={{
              width: wp('100%'),
              height: hp('10%'),
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: wp('10%'),
              }}>
              <Image
                style={{width: wp('10%'), height: hp('5%')}}
                source={require('../assets/wallet.png')}
              />
              <Text style={{fontSize: wp('3.5%'), color: 'black'}}>
                Belum bayar
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: wp('10%'),
              }}>
              <Image
                style={{width: wp('10%'), height: hp('5%')}}
                source={require('../assets/box.png')}
              />
              <Text style={{fontSize: wp('3.5%'), color: 'black'}}>
                Dikemas
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: wp('10%'),
              }}>
              <Image
                style={{width: wp('10%'), height: hp('5%')}}
                source={require('../assets/carbox.png')}
              />
              <Text style={{fontSize: wp('3.5%'), color: 'black'}}>
                Di kirim
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{width: wp('10%'), height: hp('5%')}}
                source={require('../assets/feedback.png')}
              />
              <Text style={{fontSize: wp('3.5%'), color: 'black'}}>
                Beri Penilaian
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'black',
              width: wp('100%'),
              height: hp('0.2%'),
            }}></View>
          <View
            style={{
              backgroundColor: '#20C0CA',
              width: wp('100%'),
              height: hp('3%'),
            }}></View>
          <View
            style={{
              backgroundColor: 'black',
              width: wp('100%'),
              height: hp('0.2%'),
            }}></View>
        </LinearGradient>
      </View>
    </DrawerLayoutAndroid>
  );
};
export default Saya;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    backgroundColor: '#838383',
    width: wp('100%'),
    height: hp('28%'),
    alignItems: 'center',
  },
  imgprofil: {
    width: wp('30%'),
    height: hp('15.4%'),
    borderRadius: 100,
    top: hp('2%'),
  },
  ic1: {
    width: wp('10%'),
    height: hp('5%'),
    position: 'absolute',
    bottom: hp('9%'),
    right: wp('38%'),
  },
  shiping: {
    width: wp('8%'),
    height: hp('4%'),
    marginRight: wp('2%'),
  },
});
