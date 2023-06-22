import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Pindah} from '../../App';
import ModalEditAdmin from './ModalEditAdmin';

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

const Admin = () => {
  const navigation = useNavigation<NativeStackNavigationProp<Pindah>>();
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredData[]>([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${value}`);

      var requestOptions = {
        method: 'post',
        headers: myHeaders,
        redirect: 'follow',
      };
      fetch(
        'https://135f-2001-448a-4040-aea4-6f68-143f-d365-e06a.ngrok-free.app/api/admin',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result.user), setRegisteredUsers(result.user);
        })
        .catch(error => console.log('error', error));
    });
  }, []);
  const Logout = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const requestOptions = {
        method: 'POST',
        headers: {Authorization: `bearer ${value}`},
        redirect: 'follow',
      };
      fetch(
        'https://135f-2001-448a-4040-aea4-6f68-143f-d365-e06a.ngrok-free.app/logout',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          console.log(result);
          AsyncStorage.removeItem('token');
          navigation.replace('Bottom');
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#9444C4', '#20C0CA']}
        style={styles.background}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}>
        <Text
          style={{
            fontSize: hp('3%'),
            fontWeight: 'bold',
            color: 'black',
            top: 10,
          }}>
          List data user:
        </Text>
        <View>
          <ScrollView style={{backgroundColor: 'red', top: hp('2%')}}>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Username"
                placeholderTextColor="gray"
                style={styles.textInput}
              />
            </View>
            {registeredUsers.map((user, index) => (
              <View style={styles.dc} key={index}>
                <Text style={styles.dt}>id:{user.id}</Text>
                <Text style={styles.dt}>username:{user.username}</Text>
                <Text style={styles.dt}>email:{user.email}</Text>
                <Text style={styles.dt}>level:{user.level}</Text>
                <Text style={styles.dt}>gender:{user.gender}</Text>
                <Text style={styles.dt}>alamat:{user.alamat}</Text>
                <Text style={styles.dt}>umur:{user.umur}</Text>
                <TouchableOpacity
                  style={{
                    width: wp('20%'),
                    height: hp('3.5%'),
                    left: wp('57%'),
                    bottom: wp('2%'),
                  }}
                  onPress={() => setModal(true)}>
                  <View style={styles.bottomupdate}>
                    <Text style={{color: 'white'}}>update</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
            <View
              style={{
                height: hp('20%'),
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={Logout}>
                <View
                  style={{
                    height: hp('6%'),
                    width: wp('28%'),
                    backgroundColor: 'blue',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bottom: wp('5%'),
                    borderRadius: 18,
                  }}>
                  <Text style={{fontSize: wp('5%'), color: 'white'}}>
                    Keluar
                  </Text>
                </View>
                <ModalEditAdmin visible={modal} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
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
  dc: {
    borderWidth: 2,
    backgroundColor: 'black',
    width: wp('80%'),
    height: hp('25%'),
    justifyContent: 'center',
    borderColor: 'red',
  },
  dt: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: 'green',
    marginLeft: hp('2%'),
    top: wp('3%'),
  },
  searchContainer: {
    width: wp('70%'),
    backgroundColor: 'white',
    height: hp('5.5%'),
    borderWidth: 1,
    borderRadius: 10,
    left: wp('5%'),
  },
  textInput: {
    width: '100%',
    height: '100%',
    paddingHorizontal: wp('2%'),
    color: 'black',
  },
  bottomupdate: {
    backgroundColor: 'blue',
    width: wp('20%'),
    height: hp('3.5%'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
