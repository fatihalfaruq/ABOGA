import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Pindah} from '../../App';

interface Props {
  visible: boolean;
}
const ModalEditProfile: React.FC<Props> = ({visible}) => {
  const navigation = useNavigation<NativeStackNavigationProp<Pindah>>();

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userUmur, setUserUmur] = useState('');
  const [userAlamat, setUserAlamat] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordconfirmation, setUserPasswordconfirmation] = useState('');
  const handleUserName = (nm: string) => {
    setUserName(nm);
  };
  const handleUserEmail = (em: string) => {
    setUserEmail(em);
  };
  const handleUserGender = (gd: string) => {
    setUserGender(gd);
  };
  const handleUserUmur = (um: string) => {
    setUserUmur(um);
  };
  const handleUserAlamat = (am: string) => {
    setUserAlamat(am);
  };
  const handleUserPassword = (pw: string) => {
    setUserPassword(pw);
  };
  const handleUserPasswordconfirmation = (pwc: string) => {
    setUserPasswordconfirmation(pwc);
  };

  const update = () => {
    AsyncStorage.getItem('token').then(value => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${value}`);

      var formdata = new FormData();
      formdata.append('username', userName);
      formdata.append('gender', userGender);
      formdata.append('umur', userUmur);
      formdata.append('alamat', userAlamat);
      formdata.append('email', userEmail);
      formdata.append('password', userPassword);
      formdata.append('password_confirmation', userPasswordconfirmation);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        'https://135f-2001-448a-4040-aea4-6f68-143f-d365-e06a.ngrok-free.app/api/edit',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          navigation.goBack;
        })
        .catch(error => console.log('error', error));
    });
  };

  const Delete = () => {
    AsyncStorage.getItem('token').then(value => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${value}`);

      if (value) {
        Alert.alert(
          'Confirmation',
          'Are you sure you want to delete your account?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                var requestOptions = {
                  method: 'DELETE',
                  headers: myHeaders,
                  redirect: 'follow',
                };

                fetch(
                  'https://135f-2001-448a-4040-aea4-6f68-143f-d365-e06a.ngrok-free.app/api/destroy',
                  requestOptions,
                )
                  .then(response => {
                    if (!response.ok) {
                      throw new Error('Terjadi kesalahan dalam permintaan');
                    }
                    return response.json();
                  })
                  .then(result => {
                    console.log(result);
                    AsyncStorage.removeItem('token');
                    navigation.navigate('Bottom');
                  })
                  .catch(error => {
                    console.log('Kesalahan:', error.message);
                  });
              },
            },
          ],
        );
      } else {
        console.log('Token not found.');
      }
    });
  };

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#9444C4', '#20C0CA']}
          start={{x: 0.5, y: 0}}
          style={styles.background}
          end={{x: 0.5, y: 1}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{
                width: wp('8%'),
                height: hp('4%'),
                right: wp('45%'),
                top: wp('2%'),
              }}
              source={require('../assets/quit.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: wp('6.5%'),
              fontWeight: 'bold',
              color: 'black',
              top: wp('4%'),
            }}>
            Edit profile
          </Text>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Username"
              placeholderTextColor="gray"
              style={styles.textInput}
              onChangeText={handleUserName}
            />
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="gray"
              style={styles.textInput}
              onChangeText={handleUserEmail}
            />
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Gender"
              placeholderTextColor="gray"
              style={styles.textInput}
              onChangeText={handleUserGender}
            />
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Umur"
              placeholderTextColor="gray"
              style={styles.textInput}
              onChangeText={handleUserUmur}
            />
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Alamat"
              placeholderTextColor="gray"
              style={styles.textInput}
              onChangeText={handleUserAlamat}
            />
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
              style={styles.textInput}
              onChangeText={handleUserPassword}
            />
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Password Confirmation"
              placeholderTextColor="gray"
              style={styles.textInput}
              onChangeText={handleUserPasswordconfirmation}
            />
          </View>
          <TouchableOpacity style={{top: wp('12%')}} onPress={update}>
            <View
              style={{
                backgroundColor: 'blue',
                width: wp('60%'),
                height: hp('5'),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: wp('5'),
                  fontWeight: 'bold',
                }}>
                Update
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              top: wp('15%'),
            }}
            onPress={Delete}>
            <Text
              style={{
                fontSize: wp('5%'),
                fontWeight: 'bold',
                color: 'red',
              }}>
              Hapus akun
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default ModalEditProfile;

const styles = StyleSheet.create({
  container: {flex: 1},
  background: {flex: 1, alignItems: 'center'},
  searchContainer: {
    width: wp('70%'),
    backgroundColor: 'white',
    height: hp('5.5%'),
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: wp('5%'),
    top: wp('10%'),
  },
  textInput: {
    width: '100%',
    height: '100%',
    paddingHorizontal: wp('2%'),
    color: 'black',
  },
});
