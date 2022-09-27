import { View, Text, StatusBar, TouchableHighlight , Image , TextInput, TouchableOpacity} from 'react-native'
import React, { useEffect, useState ,useContext } from "react";
import styles from '../styles/style'
import { OIContext } from '../context/Context';
import Header from '../components/Header';
import Circle from '../components/Circle';
import Octicons from 'react-native-vector-icons/Octicons'
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { Question1 } from '../datasets/Question1';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {addDocument} from '../api/register'

import { addVehicle } from '../api/register';

export default function VehicalReg1() {

    const context = useContext(OIContext)
    const [answer, setAnswer] = useState(1);
    const navigation = useNavigation();

    const save = ()=>{
      addVehicle(answer==1?'yes':'no',context.mobile)
      goToNext()
    }
    const goToNext=()=>{
      firestore()
      .collection('users')
      .doc(context.mobile)
      .update({
          signUpProcess:4
      })
      .then(() => {
        firestore()
        .collection('users')
        .doc(context.mobile)
        .get()
        .then(documentSnapshot => {
            console.log(documentSnapshot.data())
            storeUserData(documentSnapshot.data())
          navigation.navigate('VehicleRgistration')
        });
      });
  }
  const storeUserData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user', jsonValue)

    } catch (e) {
      // saving error
    }
  }
  return (
    <View style={styles.container}>
        <StatusBar
            animated={true}
            backgroundColor="#fff"
            barStyle={'dark-content'}
            hidden={false} />

        <Header back={true} menu={false} title={''} subTitle={''} headerColor={'transparent'} />
        <Text style={styles.title}>{i18n.t('reg1.title')}</Text>
        <View style={styles.questionView}>
          <Text style={styles.question}>{i18n.t('reg1.question')}</Text>

                <TouchableOpacity onPress={()=>setAnswer(1)} style={styles.answerView}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={answer==1?['#ED9939', '#FFCE31']:['rgba(255, 206, 49, 0.09)', 'rgba(255, 206, 49, 0.09)']} style={styles.linearGradiant}>
                        <View style={styles.row}>
                          <Text style={[styles.question,{color:answer==1?'white':'black'}]}>{i18n.t('reg1.answer1')}</Text> 
                          <Octicons name='check-circle-fill' size={20} color={answer==1?'white':'#E8E8E8'}/>
                        </View>
                        
                        <Text style={[styles.subtitle,{color:answer==1?'white':'black',textAlign:'left',paddingHorizontal:0}]}>{i18n.t('reg1.answer1subtitle')}</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setAnswer(2)} style={styles.answerView}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={answer==2?['#ED9939', '#FFCE31']:['rgba(255, 206, 49, 0.09)', 'rgba(255, 206, 49, 0.09)']} style={styles.linearGradiant}>
                        <View style={styles.row}>
                          <Text style={[styles.question,{color:answer==2?'white':'black'}]}>{i18n.t('reg1.answer2')}</Text> 
                          <Octicons name='check-circle-fill' size={20} color={answer==1?'white':'#E8E8E8'}/>
                        </View>
                        
                        <Text style={[styles.subtitle,{color:answer==2?'white':'black',textAlign:'left',paddingHorizontal:0}]}>{i18n.t('reg1.answer2subtitle')}</Text>
                    </LinearGradient>
                </TouchableOpacity>

        </View>
        

        <TouchableHighlight style={styles.button} 
        // onPress={()=>navigation.navigate('VehicleRgistration')}
        onPress={()=>save()}
        >
            <View style={styles.buttonView}>
                <Text style={styles.buttonText}>{i18n.t('reg1.button')}</Text>
            </View>
        </TouchableHighlight>
    </View>
  )
}