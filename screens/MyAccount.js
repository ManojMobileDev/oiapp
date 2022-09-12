import { View, Text, TouchableOpacity , Image} from 'react-native'
import React from 'react'
import styles from '../styles/style'
import { useNavigation } from '@react-navigation/native';
import DrawerHeader from '../components/DrawerHeader';
import i18n from 'i18n-js';

export default function MyAccount() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>

    <DrawerHeader 
    headerColor={'#fff'}  
    menu={true} 
    back={false}
    title={i18n.t('drawer.21')} 

    />
  <View style={styles.innercontainer}>
    <Text>{i18n.t('drawer.21')}</Text>
  </View>
      
    </View>
  )
}