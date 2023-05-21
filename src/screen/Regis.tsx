import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
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

const Regis = () => {
  const navigation = useNavigation<NativeStackNavigationProp<Pindah>>();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [umur, setUmur] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [alamat, setAlamat] = useState('');

  const reg = () => {
    if (
      username == '' &&
      email == '' &&
      password == '' &&
      confirmPassword == ''
    ) {
      Alert.alert('Ups!', 'Anda belum memasukkan apapun', [
        {
          text: 'ok',
        },
      ]);
    } else if (username == '') {
      Alert.alert('Ups!', 'Name wajib diisi', [
        {
          text: 'ok',
        },
      ]);
    } else if (email == '') {
      Alert.alert('Ups!', 'Email wajib diisi', [
        {
          text: 'ok',
        },
      ]);
    } else if (password == '') {
      Alert.alert('Ups!', 'Password wajib diisi', [
        {
          text: 'ok',
        },
      ]);
    } else if (
      email.split('@')[1] !== 'gmail.com' &&
      email.split('@')[1] !== 'email.com'
    ) {
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
    } else if (confirmPassword !== password) {
      Alert.alert('Ups!', 'password Confirmation tidak sesuai', [
        {
          text: 'ok',
        },
      ]);
    } else {
      setLoading(true);
      var formdata = new FormData();
      formdata.append('username', username);
      formdata.append('email', email);
      formdata.append('alamat', alamat);
      formdata.append('gender', gender);
      formdata.append('umur', umur);
      formdata.append('email', email);
      formdata.append('password', password);
      formdata.append('confirmation_password', confirmPassword);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        'https://frontendreq.pondokprogrammer.com/api/register',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          navigation.navigate('Login');
        })
        .catch(error => console.log('error', error))
        .finally(() => setLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Register</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="black"
              onChangeText={(nm: string) => setUsername(nm)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="black"
              onChangeText={(em: string) => setEmail(em)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="black"
              onChangeText={(pass: string) => setPassword(pass)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="black"
              value={confirmPassword}
              onChangeText={(passConfirm: string) =>
                setConfirmPassword(passConfirm)
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Gender"
              placeholderTextColor="black"
              onChangeText={(gd: string) => setGender(gd)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Umur"
              placeholderTextColor="black"
              onChangeText={(um: string) => setUmur(um)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Alamat"
              placeholderTextColor="black"
              onChangeText={(am: string) => setAlamat(am)}
            />
          </View>
          <TouchableOpacity style={styles.registerButton} onPress={() => reg()}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Regis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#838383',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    bottom: 50,
  },
  title: {
    fontSize: hp('5.5%'),
    fontWeight: 'bold',
    color: '#20C0CA',
    marginTop: 10,
  },
  inputContainer: {
    backgroundColor: 'white',
    width: wp('87%'),
    borderRadius: 15,
    height: hp('6%'),
    justifyContent: 'center',
    marginTop: 10,
  },
  input: {
    fontSize: 20,
    width: wp('80%'),
    marginLeft: 10,
  },
  registerButton: {
    backgroundColor: '#20C0CA',
    width: wp('70%'),
    height: hp('6.5%'),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: 'white',
  },
});
