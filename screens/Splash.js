import { View, Text, Image, StatusBar } from 'react-native'
import React, { useEffect, useState ,useContext } from "react";
import { OIContext } from '../context/Context';
import SplashScreen from 'react-native-splash-screen'

import i18n from 'i18n-js';

import en from '../translations/en.json';
import si from '../translations/zh.json';
import tm from '../translations/tm.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/style';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Splash() {

    // const [screen, setScreen] = React.useState(<MyStack2 />);
    const context = useContext(OIContext)
    const [language, setLanguage] = useState("en");
    const navigation = useNavigation();

    i18n.locale = language;
    i18n.fallbacks = true;
    i18n.translations = { en, si, tm };

    const getLanguage = async () => {
        try {
        const value = await AsyncStorage.getItem('language')
        if(value !== null) {
            setLanguage(value)
            // value previously stored
        }
        } catch(e) {
        // error reading value
        }
    }

    const getData = async () => {
        
        try {
        const jsonValue = await AsyncStorage.getItem('user')
        return jsonValue != null ? 
        [
            // console.log(JSON.parse(jsonValue)),
        navigation.navigate('Home'),
        context.setUser(JSON.parse(jsonValue))
        // SplashScreen.hide()
        ]
        : 
        [console.log('no data'),
        navigation.navigate('LanguageSelect'),
        ]
        ;
        } 
        catch(e) {
        // error reading value
        }
        finally{
            SplashScreen.hide()
        }
    }

    React.useEffect(() => {
        
        getData()  
        getLanguage()
      },[]);

  return (
    <View style={styles.splashcontainer}>
        <Image source={require('../assets/images/logo.jpeg')} 
        style={{width:115,height:115}} />
      {/* <Text>Splash</Text> */}
    </View>
  )
}