import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer 3|ap17TmILRrdwkh50VnQQqZVhKMATH6DfBZkv1a4A',
    );

    const formdata = new FormData();
    formdata.append('email', username);
    formdata.append('password', password);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://354e-182-4-103-51.ngrok-free.app/api/login', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../assets/styl.png')}
      />
      <Text style={styles.title}>Aboga</Text>
      <Text style={styles.loginTitle}>Login</Text>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="black"
            value={username}
            onChangeText={text => setUsername(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="black"
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
  },
  backgroundImage: {
    width: wp('150%'),
    bottom: wp('9%'),
    height: hp('50%'),
  },
  title: {
    color: 'black',
    fontSize: hp('7%'),
    fontWeight: 'bold',
    bottom: wp('80%'),
  },
  loginTitle: {
    color: '#20C0CA',
    fontSize: hp('5.5%'),
    bottom: wp('75%'),
    fontWeight: 'bold',
  },
  inputContainer: {
    backgroundColor: 'white',
    width: wp('80%'),
    borderRadius: 15,
    height: hp('6%'),
    justifyContent: 'center',
    bottom: wp('60%'),
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
    bottom: wp('40%'),
    marginTop: hp('2%'),
  },
  loginButtonText: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: 'white',
  },
});
