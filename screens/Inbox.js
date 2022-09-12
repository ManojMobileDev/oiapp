import { View, Text } from 'react-native'
import React from 'react'
import styles from '../styles/style'
import { useNavigation } from '@react-navigation/native';
import DrawerHeader from '../components/DrawerHeader';
import i18n from 'i18n-js';

export default function Inbox() {
  return (
    <View style={styles.container}>

    <DrawerHeader 
    headerColor={'#fff'}  
    menu={true} 
    back={false}
    title={i18n.t('home.inbox')} 

    />
  <View style={styles.innercontainer}>
    <Text>{i18n.t('home.inbox')} </Text>
  </View>
      
    </View>
  )
}