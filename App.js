
import { View, Text, StatusBar, TouchableHighlight } from 'react-native'
import React, { useEffect, useState ,useContext } from "react";
import styles from './styles/style'
import { OIProvider, OIContext } from './context/Context';
import Home from './screens/Home';
import LanguageSelect from './screens/LanguageSelect';
import PhoneNumber from './screens/PhoneNumber';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Sign from './stacks/Sign';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from "react-native-gesture-handler"
import SplashScreen from 'react-native-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const context = useContext(OIContext)
  
  const getMobile = async () => {
    try {
      const value = await AsyncStorage.getItem('mobile')
      if(value !== null) {
        context.setMobile(value)
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() => {
    // SplashScreen.hide();
    getMobile()
  },[]);

  return (
    <OIProvider>
        <NavigationContainer>
          <StatusBar
            animated={true}
            backgroundColor="#fff"
            barStyle={'dark-content'}
            hidden={false} />
            <Sign/>      
        </NavigationContainer>  
    </OIProvider>

  )
}