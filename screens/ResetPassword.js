import { View, Text, StatusBar, TouchableHighlight , Image , TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native'
import React, { useEffect, useState ,useContext } from "react";
import styles from '../styles/style'
import { OIContext } from '../context/Context';
import Header from '../components/Header';
import Circle from '../components/Circle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

import i18n from 'i18n-js';

import { firebase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';

// const reference = firebase
//   .app()
//   .database('https://oi-app-2af0a-default-rtdb.asia-southeast1.firebasedatabase.app/')
//   .ref('/users/123');

export default function ResetPassword() {

    const context = useContext(OIContext)
    const [dob, setDob] = useState(i18n.t('signUp.placeholder4'));
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
 
    const [ps, setPS] = useState(false); 
    const [rps, setRPS] = useState(false);

    const [pView, setPView] = useState(false); 
    const [rpView, setRPView] = useState(false);

    const [match, setMatch] = useState(false);
    
    
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    
    const [key1, setKey1] = useState(0);
    const [key2, setKey2] = useState(1000);
    
    const navigation = useNavigation();


    const changeId = async (value) => {
        try {
          await AsyncStorage.setItem('id', value.toString())
        } catch (e) {
          // saving error
        }
        context.setId(value)
      }

      const getId = async () => {
        try {
          const value = await AsyncStorage.getItem('id')
          if(value !== null) {
            context.setId(value)
            // value previously stored
          }
        } catch(e) {
          // error reading value
        }
      }
    const updatePassword =  (pass,repass)=>{
        if(pass==''){
            setError1(true)
            setKey1(key1+1)
        }
        
        if(repass==''){
            setError2(true)
            setKey2(key2+1)
        }

        else{
            if(pass==repass){
                firestore()
                    .collection('users')
                    .doc(context.mobile)
                    .update({
                        password: pass,
                    })
                    .then(() => {
                        console.log('User updated!');
                        setMatch(false)
                        navigation.navigate('SignIn')
                    });
            }
            else{
                setMatch(true)
                setError2(true)
                setKey2(key2+1)
            }

        }

    console.log(context.mobile)
    }

    const getData = () =>{
        firebase
        .app()
        .database('https://oi-app-2af0a-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref('/users/')
        .on('value', snapshot => {
            console.log('User data: ', snapshot.val());
        });
    }

    const [itemsArray, setItemsArray] = React.useState([]);

    useEffect(() => {

    }, []);


  return (
    <View style={[styles.container,{padding:0}]}>
        <StatusBar
            animated={true}
            backgroundColor="#fff"
            barStyle={'dark-content'}
            hidden={false} />

        <Header back={true} menu={false} title={''} subTitle={''} headerColor={'transparent'} />
        <ScrollView contentContainerStyle={{padding:15}}>
        {/* <KeyboardAvoidingView behavior={"position"}> */}
        <Text style={styles.title}>{i18n.t('forgot.title')}</Text>
        <Circle icon={<SimpleLineIcons name='screen-smartphone' size={40} color={'white'}/>} />
        
        
        <Animatable.View key={key1} animation={error1?'shake':'fadeIn'} style={[styles.inputView,{borderColor:error1?'red':'black'}]}>
            <TextInput
                style={styles.input}
                onChangeText={(text)=>{setPassword(text);setError1(false)}}
                value={password}
                placeholder={i18n.t('forgot.placeholder2')}
                keyboardType="default"
                onFocus={()=>{setPView(true)}}
                onBlur={()=>setPView(false)} 
                secureTextEntry={ps}
                
            />

                {
                    pView==true?
                    ps==true?
                    <Ionicons 
                        name="eye" 
                        size={20} 
                        color="gray" 
                        onPress={()=>{setPS(false);console.log(pView)}}
                    />
                    :
                    <Ionicons 
                        name="eye-off" 
                        size={20} 
                        color="gray" 
                        onPress={()=>setPS(true)}
                    />

                    :
                    null
                }
        </Animatable.View>

        <Animatable.View key={key2} animation={error2?'shake':'fadeIn'} style={[styles.inputView,{borderColor:error2?'red':'black'}]}>
            <TextInput
                style={styles.input}
                onChangeText={(text)=>{setRePassword(text);setError2(false)}}
                value={rePassword}
                placeholder={i18n.t('forgot.placeholder3')}
                keyboardType="default"
                onFocus={()=>{setRPView(true);setMatch(false)}}
                onBlur={()=>setRPView(false)} 
                secureTextEntry={rps}
            />

                {
                    rpView==true?
                    rps==true?
                    <Ionicons 
                        name="eye" 
                        size={20} 
                        color="gray" 
                        onPress={()=>setRPS(false)}
                    />
                    :
                    <Ionicons 
                        name="eye-off" 
                        size={20} 
                        color="gray" 
                        onPress={()=>setRPS(true)}
                    />

                    :
                    null
                }
        </Animatable.View>


        {
                    match?
                    <Animatable.Text animation={'fadeIn'} style={[styles.subtitle,{fontSize:13,color:'red',marginTop:10,height:30,marginBottom:-5}]}>{i18n.t('signUp.subtitle3')}</Animatable.Text>
                    :
                    <Text style={[styles.subtitle,{fontSize:12,marginTop:10,height:30,marginBottom:-5}]}></Text>
                }

        <TouchableHighlight style={styles.button} onPress={()=>updatePassword(password,rePassword)}>
            <View style={styles.buttonView}>
                <Text style={styles.buttonText}>{i18n.t('forgot.button')}</Text>
            </View>
        </TouchableHighlight>
        {/* <Text style={styles.subtitle}>{i18n.t('signUp.subtitle')} {<Text style={{color:'#4987F7'}} onPress={()=>navigation.navigate('SignIn')} >{i18n.t('signUp.subtitle2')}</Text>} </Text> */}
        {/* </KeyboardAvoidingView> */}
        </ScrollView>
    </View>
  )
}