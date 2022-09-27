import { View, Text, StatusBar, ScrollView , Image, TextInput, TouchableHighlight, Pressable} from 'react-native'
import React, { useContext, useState } from 'react'
import styles from '../styles/style'
import Header from '../components/Header'
import i18n from 'i18n-js'
import Circle from '../components/Circle'
import * as Animatable from 'react-native-animatable';
import { OIContext } from '../context/Context';
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Refferel() {

    const context = useContext(OIContext)

    const [ref, setRef] = useState('')
    const [error, setError] = useState(false);
    const [key1, setKey1] = useState(0);

    const navigation = useNavigation();

    const updateReferee =  ()=>{
        if(ref==''){
            setError(true)
            setKey1(key1+1)
        }
        else{
                firestore()
                    .collection('users')
                    .doc(context.mobile)
                    .update({
                        referee: ref,
                        signUpProcess:3
                    })
                    .then(() => {
                        console.log('User updated!');
                        navigation.navigate('VehicalReg1')
                    });

        }

    console.log(context.mobile)
    }

    const goToNext=()=>{
        firestore()
        .collection('users')
        .doc(context.mobile)
        .update({
            signUpProcess:3
        })
        .then(() => {
            firestore()
            .collection('users')
            .doc(context.mobile)
            .get()
            .then(documentSnapshot => {
                console.log(documentSnapshot.data())
                storeUserData(documentSnapshot.data())
                navigation.navigate('VehicalReg1')
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
    <View style={[styles.container,{padding:0}]}>
        <StatusBar
            animated={true}
            backgroundColor="#fff"
            barStyle={'dark-content'}
            hidden={false} />
        <Header back={true} menu={false} title={''} subTitle={''} headerColor={'transparent'} />
        <ScrollView contentContainerStyle={{padding:15}}>
            <Text style={styles.title}>
                {/* {I18n.t('signUp.title')} */}
                {i18n.t('ref.title')}
            </Text>
            <Circle icon={<Image source={require('../images/ref.png')} style={{width:40,height:40,tintColor:'#fff'}} />} />
            
            <Animatable.View animation={error?'shake':'fadeIn'} style={[styles.inputView,{borderColor:error?'red':'black'}]}>
        
            <TextInput
                style={styles.input}
                onChangeText={(text)=>{setRef(text);setError(false)}}
                value={ref}
                placeholder={i18n.t('ref.placeholder')}
                keyboardType="default"
                placeholderTextColor={'gray'}
                
            />
            </Animatable.View>
                <TouchableHighlight style={styles.button} onPress={()=>updateReferee()}>
                    <View style={styles.buttonView}>
                        <Text style={styles.buttonText}>{i18n.t('ref.next')}</Text>
                    </View>
                </TouchableHighlight>

                <Pressable style={{alignSelf:'center'}} onPress={()=>{goToNext()}}>
                    <Text style={{color:'black'}}>{i18n.t('ref.skip')}</Text>
                </Pressable>
        </ScrollView>
    </View>
  )
}