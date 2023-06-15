import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {Pindah} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<Pindah>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const reg = () => {
    if (email === '' || password === '') {
      Alert.alert('Ups!', 'Anda belum memasukkan apapun', [
        {
          text: 'ok',
        },
      ]);
    } else if (email === '') {
      Alert.alert('Ups!', 'Email wajib diisi', [
        {
          text: 'ok',
        },
      ]);
    } else if (password === '') {
      Alert.alert('Ups!', 'Password wajib diisi', [
        {
          text: 'ok',
        },
      ]);
    } else if (!email.endsWith('@gmail.com') && !email.endsWith('@email.com')) {
      Alert.alert('Ups!', 'Email yang anda masukkan tidak valid', [
        {
          text: 'ok',
        },
      ]);
    } else if (password.length < 8) {
      Alert.alert('Ups!', 'Password minimal 8 karakter', [
        {
          text: 'ok',
        },
      ]);
    } else {
      setLoading(true);
      var formdata = new FormData();
      formdata.append('email', email);
      formdata.append('password', password);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        'https://f6aa-2001-448a-404b-1e88-4a2e-91a0-1114-8b4e.ngrok-free.app/api/login',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.level == 'admin') {
            navigation.navigate('Admin');
            AsyncStorage.setItem('token', result.access_token);
          } else if (result.level == 'user') {
            navigation.navigate('Bottom');
            AsyncStorage.setItem('token', result.access_token);
          }
        })
        .catch(error => console.log('error', error))
        .finally(() => setLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.con1}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{
              width: wp('8%'),
              height: hp('4%'),
              right: wp('45%'),
              bottom: wp('8.5%'),
            }}
            source={require('../assets/quit.png')}
          />
        </TouchableOpacity>
        <Image
          style={{width: wp('25%'), height: hp('15%')}}
          source={require('../assets/lo.png')}
        />
        <Text style={styles.title}>Aboga</Text>
        <Text style={styles.loginTitle}>Login</Text>
      </View>
      <View style={styles.con2}>
        <View style={styles.input1}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="black"
            value={email}
            onChangeText={(em: string) => setEmail(em)}
          />
        </View>
        <View style={styles.input1}>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="black"
            value={password}
            onChangeText={(pw: string) => setPassword(pw)}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={() => reg()}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.regisnav}>
        <Text style={{fontSize: hp('2%'), color: 'white'}}>
          Belum punya akun?,
        </Text>
        <Text
          onPress={() => navigation.navigate('Regis')}
          style={{fontSize: hp('2%'), color: 'blue'}}>
          klik disini
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#838383',
    alignItems: 'center',
  },

  title: {
    color: 'black',
    fontSize: hp('7%'),
    fontWeight: 'bold',
  },
  loginTitle: {
    color: '#20C0CA',
    fontSize: hp('5.5%'),
    fontWeight: 'bold',
  },
  input1: {
    backgroundColor: 'white',
    width: wp('80%'),
    borderRadius: 15,
    height: hp('6%'),
    justifyContent: 'center',
    marginBottom: hp('2%'),
  },
  input: {
    fontSize: hp('2.5%'),
    marginLeft: wp('5%'),
    color: 'black',
  },
  loginButton: {
    backgroundColor: '#20C0CA',
    width: wp('70%'),
    height: hp('6%'),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    top: hp('10%'),
  },
  loginButtonText: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: 'white',
  },
  con1: {alignItems: 'center', margin: hp('5%')},
  con2: {alignItems: 'center'},
  regisnav: {flexDirection: 'row', top: hp('11%')},
});
