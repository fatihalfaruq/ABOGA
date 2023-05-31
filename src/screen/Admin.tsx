import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
interface RegisteredData {
  username: string;
  email: string;
  gender: string;
  umur: string;
  alamat: string;
  password: string;
}

const Admin = () => {
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredData[]>([]);

  useEffect(() => {
    fetch(
      'https://1a30-2001-448a-4046-2a99-9529-ab16-7a13-3d07.ngrok-free.app/api/admin',
    )
      .then(response => response.json())
      .then((data: RegisteredData[]) => {
        setRegisteredUsers(data);
      })
      .catch(error => {
        console.log('Error fetching registered users:', error);
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
        <View style={styles.datauser}>
          <View style={styles.ls1}></View>
          <View style={styles.ls2}></View>
          <View style={styles.ls3}></View>
          <View style={styles.ls4}></View>
          <View style={styles.ls5}></View>
        </View>
        <View>
          {registeredUsers.map((user, index) => (
            <View key={index}>
              <Text>{user.username}</Text>
              <Text>{user.email}</Text>
              <Text>{user.gender}</Text>
              <Text>{user.umur}</Text>
              <Text>{user.alamat}</Text>
            </View>
          ))}
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
  ls1: {width: wp('80%'), height: hp('6%'), borderWidth: 3},
  ls2: {width: wp('80%'), height: hp('6%'), borderWidth: 3},
  ls3: {width: wp('80%'), height: hp('6%'), borderWidth: 3},
  ls4: {width: wp('80%'), height: hp('6%'), borderWidth: 3},
  ls5: {width: wp('80%'), height: hp('6%'), borderWidth: 3},
  datauser: {top: wp('10')},
});
