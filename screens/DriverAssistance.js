import { View, Text } from 'react-native'
import React from 'react'
import styles from '../styles/style'
import { useNavigation } from '@react-navigation/native';
import DrawerHeader from '../components/DrawerHeader';
import i18n from 'i18n-js';

export default function DriverAssistance() {
  return (
    <View style={styles.container}>

      <DrawerHeader 
        headerColor={'#fff'}  
        menu={true} 
        back={false}
        title={i18n.t('drawer.64')} 
      />

      <View style={styles.innercontainer}>
        <Text>{i18n.t('drawer.64')} </Text>
      </View>
      
    </View>
  )
}