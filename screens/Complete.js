import { View, Text,StatusBar,Image,TouchableHighlight,BackHandler } from 'react-native'
import React, { useEffect, useState ,useContext } from "react";
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/style';
import WhiteCircle from '../components/WhiteCircle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OIContext } from '../context/Context';
import firestore from '@react-native-firebase/firestore';

export default function Complete() {
  
  const navigation = useNavigation();


  const context = useContext(OIContext)

  const gotoHome = () =>{
          firestore()
          .collection('users')
          .doc(context.mobile)
          .get()
          .then(collectionSnapshot => {
              console.log('Total users: ', collectionSnapshot.data());
              var data =collectionSnapshot.data()
              // navigation.navigate('Password')
              storeUserData(data)
              navigation.navigate('Home')
          })}

  const storeUserData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user', jsonValue)

    } catch (e) {
      // saving error
    }
  }

  useEffect(() => {
    const backAction = () => {
      return true;
    };
    

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View>
        <StatusBar barStyle='dark-content' backgroundColor={'#FFCE31'} />
        <LinearGradient start={{x: 1, y: 1}} end={{x: 0, y: 0}} colors={['#ED9939', '#FFCE31']} style={styles.linearGradiantFlex}>
        <WhiteCircle icon={<FontAwesome name='check' size={55} color={'#FDDF97'}/> } />
        <Text style={[styles.title,{marginVertical:15}]}>{i18n.t('complete.title')}</Text>
        <Text style={[styles.subtitle,{color:'#000'}]}>{i18n.t('complete.subtitle')}</Text>
        <TouchableHighlight style={[styles.button,{marginTop:30}]} onPress={()=>{gotoHome()}}>
                    <View style={styles.buttonView}>
                        <Text style={styles.buttonText}>{i18n.t('complete.button')}</Text>
                    </View>
                </TouchableHighlight>           
        </LinearGradient>
    </View>
  )
}