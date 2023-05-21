import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import {Pindah} from '../../App';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Splash = () => {
  const navigation = useNavigation<NativeStackNavigationProp<Pindah>>();
  setTimeout(() => {
    navigation.replace('Bottom');
  }, 3000);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#9444C4', '#20C0CA']}
        style={styles.background}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image style={styles.lo} source={require('../assets/lo.png')} />
          <Text
            style={{fontSize: hp('4%'), fontWeight: 'bold', color: 'black'}}>
            ABOGA
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  lo: {width: wp('27%'), height: hp('15%')},
  container: {flex: 1},
  background: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
