import { View, Text, StatusBar, TouchableHighlight , Image , TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native'
import React, { useEffect, useState ,useContext } from "react";
import styles from '../styles/style'
import { OIContext } from '../context/Context';
import Header from '../components/Header';
import Circle from '../components/Circle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

import i18n from 'i18n-js';

export default function VehicleRgistration() {

    const context = useContext(OIContext)

    
    const [date, setDate] = useState(new Date(moment().subtract(18, 'years')))
    const [open, setOpen] = useState(false)
    
    const navigation = useNavigation();


  return (
    <View style={styles.container}>
        <StatusBar
            animated={true}
            backgroundColor="#fff"
            barStyle={'dark-content'}
            hidden={false} />

        <Header back={true} menu={false} title={''} subTitle={''} headerColor={'transparent'} />
        <ScrollView>
        <Text style={styles.title}>{i18n.t('reg2.title')}</Text>
        <View style={styles.questionView}>
            <Text style={styles.question}>{i18n.t('reg2.question')}</Text>
            <View style={styles.center}>
               <Text style={[styles.question,{fontWeight:'bold',textDecorationLine:'underline',}]}>{i18n.t('reg2.topic1')}</Text> 
            </View>

            <View style={styles.row}>
                <MaterialIcons name='check-circle-outline' size={17} color={'#ED9939'}/>
                <Text style={styles.point}>{i18n.t('reg2.11')}</Text> 
            </View>

            <View style={styles.row}>
                <MaterialIcons name='check-circle-outline' size={17} color={'#ED9939'}/>
                <Text style={styles.point}>{i18n.t('reg2.12')}</Text> 
            </View>

            <View style={styles.row}>
                <MaterialIcons name='check-circle-outline' size={17} color={'#ED9939'}/>
                <Text style={styles.point}>{i18n.t('reg2.13')}</Text> 
            </View>

            <View style={styles.row}>
                <MaterialIcons name='check-circle-outline' size={17} color={'#ED9939'}/>
                <Text style={styles.point}>{i18n.t('reg2.14')}</Text> 
            </View>

            <View style={styles.row}>
                <MaterialIcons name='check-circle-outline' size={17} color={'#ED9939'}/>
                <Text style={styles.point}>{i18n.t('reg2.15')}</Text> 
            </View>


            <View style={styles.center}>
               <Text style={[styles.question,{fontWeight:'bold',textDecorationLine:'underline'}]}>{i18n.t('reg2.topic2')}</Text> 
            </View>

            <View style={styles.row}>
                <MaterialIcons name='check-circle-outline' size={17} color={'#ED9939'}/>
                <Text style={styles.point}>{i18n.t('reg2.21')}</Text> 
            </View>

            <View style={styles.row}>
                <MaterialIcons name='check-circle-outline' size={17} color={'#ED9939'}/>
                <Text style={styles.point}>{i18n.t('reg2.22')}</Text> 
            </View>

            <View style={styles.row}>
                <MaterialIcons name='check-circle-outline' size={17} color={'#ED9939'}/>
                <Text style={styles.point}>{i18n.t('reg2.23')}</Text> 
            </View>

            <View style={styles.row}>
                <MaterialIcons name='check-circle-outline' size={17} color={'#ED9939'}/>
                <Text style={styles.point}>{i18n.t('reg2.24')}</Text> 
            </View>

        </View>
        


        <TouchableHighlight style={styles.button} onPress={()=>navigation.navigate('VehicleChoose')}>
            <View style={styles.buttonView}>
                <Text style={styles.buttonText}>{i18n.t('reg2.button')}</Text>
            </View>
        </TouchableHighlight>
        </ScrollView>
    </View>
  )
}