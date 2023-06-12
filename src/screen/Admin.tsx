import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredData[]>([]);

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
        'https://fb54-2001-448a-4041-6d4e-3e88-a02d-98cd-37ca.ngrok-free.app/api/admin',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result.user), setRegisteredUsers(result.user);
        })
        .catch(error => console.log('error', error));
    });
  }, []);
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
            {registeredUsers.map((user, index) => (
              <View style={styles.dc} key={index}>
                <Text style={styles.dt}>id:{user.id}</Text>
                <Text style={styles.dt}>username:{user.username}</Text>
                <Text style={styles.dt}>email:{user.email}</Text>
                <Text style={styles.dt}>level:{user.level}</Text>
                <Text style={styles.dt}>gender:{user.gender}</Text>
                <Text style={styles.dt}>alamat:{user.alamat}</Text>
                <Text style={styles.dt}>umur:{user.umur}</Text>
              </View>
            ))}
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
  },
});
