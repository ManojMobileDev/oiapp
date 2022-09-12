import { View, Text, StatusBar, TouchableHighlight , Image , TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native'
import React, { useEffect, useState ,useContext } from "react";
import styles from '../styles/style'
import { OIContext } from '../context/Context';
import Header from '../components/Header';
import Circle from '../components/Circle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

import * as Animatable from 'react-native-animatable';

import i18n from 'i18n-js';

import { firebase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp() {

    const context = useContext(OIContext)
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [email, setEmail] = useState();
    const [check, setCheck] = useState(false);
    const [dob, setDob] = useState(i18n.t('signUp.placeholder4'));
    
    const [date, setDate] = useState(new Date(moment().subtract(18, 'years')))
    const [open, setOpen] = useState(false)
    
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [error3, setError3] = useState(false);
    const [error4, setError4] = useState(false);
    
    const [key1, setKey1] = useState(0);
    const [key2, setKey2] = useState(1000);
    const [key3, setKey3] = useState(2000);
    const [key4, setKey4] = useState(3000);

    const navigation = useNavigation();

    const changeDOB = () =>{
        setOpen(true)
        setError4(false)
        // setDob(moment(date).format("MMM Do YYYY"))
    }

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

      
    const checkUser =  (fname,lname,email,dob)=>{

        getMobile()
        
        // if(fname == null || lname == null || email == null || dob == i18n.t('signUp.placeholder4')){
        //     setError1(true)
        //     setKey1(key1+1)

        //     setError2(true)
        //     setKey2(key2+1)

        //     setError3(true)
        //     setKey3(key3+1)

        //     setError4(true)
        //     setKey4(key4+1)
        // }
        // else 
        if(fname == null ){
          
            setError1(true)
            setKey1(key1+1)

            // if(lname == null ){
            //   setError1(true)
            //   setKey1(key1+1)
            // }
        }
        if(lname == null ){
            setError2(true)
            setKey2(key2+1)
        }
        if(email == null ){
            setError3(true)
            setKey3(key3+1)
        }
        if(dob == i18n.t('signUp.placeholder4') ){
            setError4(true)
            setKey4(key4+1)
        }
        
        else {

          firestore()
          .collection('users')
          .doc(context.mobile)
          .get()
          .then(documentSnapshot => {
            console.log('User exists: ', documentSnapshot.exists);
        
            if (documentSnapshot.exists) {
              console.log('User data: ', documentSnapshot.data());
            }
            else {
              addUser(fname,lname,email,dob)
            }
          });

    }
    }

    const addUser =(fname,lname,email,dob)=>{
      firestore()
      .collection('users')
      .doc(context.mobile)
      .set({
          first_name: fname,
          last_name: lname,
          email: email,
          dob : dob,
          password:'',
          mobile:context.mobile
      })
      .then(() => {
        getData();
      });
    }

    const getData = () =>{
        firestore()
        .collection('users')
        .doc(context.mobile)
        .get()
        .then(collectionSnapshot => {
            console.log('Total users: ', collectionSnapshot.data());
            navigation.navigate('Password')
        });

    }

    const [itemsArray, setItemsArray] = React.useState([]);

    useEffect(() => {
      getMobile()
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
        <KeyboardAvoidingView behavior={"position"}>
        <Text style={styles.title}>{i18n.t('signUp.title')}</Text>
        <Circle icon={<Image source={require('../images/signup.png')} style={{width:40,height:40,tintColor:'#fff'}} />} />
        
        <Animatable.View key={key1} animation={error1?'shake':'fadeIn'} style={[styles.inputView,{borderColor:error1?'red':'black'}]}>
            <TextInput
                style={styles.input}
                onChangeText={(text)=>{setFname(text);setError1(false)}}
                value={fname}
                placeholder={i18n.t('signUp.placeholder1')}
                keyboardType="default"
                
            />
        </Animatable.View>

        <Animatable.View key={key2} animation={error2?'shake':'fadeIn'} style={[styles.inputView,{borderColor:error2?'red':'black'}]}>
            <TextInput
                style={styles.input}
                onChangeText={(text)=>{setLname(text);setError2(false)}}
                value={lname}
                placeholder={i18n.t('signUp.placeholder2')}
                keyboardType="default"
                
            />
        </Animatable.View>

        <Animatable.View key={key3} animation={error3?'shake':'fadeIn'} style={[styles.inputView,{borderColor:error3?'red':'black'}]}>
            <TextInput
                style={styles.input}
                onChangeText={(text)=>{setEmail(text);setError3(false)}}
                value={email}
                placeholder={i18n.t('signUp.placeholder3')}
                keyboardType="email-address"
                
            />
        </Animatable.View>



        <Animatable.View key={key4} animation={error4?'shake':'fadeIn'} style={[styles.inputView,{borderColor:error4?'red':'black'}]}>
            <TouchableOpacity onPress={()=>changeDOB()}>
                <Text style={[styles.input,{textAlignVertical:'center'}]}>{dob}</Text>
            </TouchableOpacity>
        </Animatable.View>

        
        


        <View style={{paddingHorizontal:15,paddingTop:10,flexDirection:'row'}}>
            {
                check?
                <MaterialIcons name='check-box' size={17} color={'black'} onPress={()=>setCheck(false)}/>
                :
                <MaterialIcons name='check-box-outline-blank' size={17} color={'black'} onPress={()=>setCheck(true)}/>
            }
            
            <Text onPress={()=>setCheck(!check)} style={styles.terms}>{i18n.t('signUp.check')}{<Text>{i18n.t('signUp.term')}</Text>} {<Text>{i18n.t('signUp.and')}</Text>} {<Text>{i18n.t('signUp.condition')}</Text>} {<Text>{i18n.t('signUp.rest')}</Text>}</Text>
        </View>

        <DatePicker
            modal
            open={open}
            date={date}
            mode={'date'}
            title={i18n.t('signUp.modalTitle')}
            confirmText={i18n.t('signUp.confirm')}
            cancelText={i18n.t('signUp.cancel')}
            maximumDate={new Date(moment().subtract(18, 'years'))}
            onConfirm={(date) => {
            setOpen(false)
            setDate(date)
            setDob(moment(date).format("MMM Do YYYY"))
            }}
            onCancel={() => {
            setOpen(false)
            setDob(moment(new Date()).format("MMM Do YYYY"))
            setDate(new Date(moment().subtract(18, 'years')))
            }}
        />

            {
              check?
              
        <TouchableHighlight style={styles.button} 
        // onPress={()=>navigation.navigate('VehicalReg1')}
        onPress={()=>checkUser(fname,lname,email,dob)}
        
        >
            <View style={styles.buttonView}>
                <Text style={styles.buttonText}>{i18n.t('signUp.button')}</Text>
            </View>
        </TouchableHighlight>
        :
        
        <TouchableHighlight style={[styles.button,{backgroundColor:'rgba(0,0,0,0.2)'}]}>
            <View style={styles.buttonView}>
                <Text style={[styles.buttonText,{color:'gray'}]}>{i18n.t('signUp.button')}</Text>
            </View>
        </TouchableHighlight>

            }
        
        <Text style={styles.subtitle}>{i18n.t('signUp.subtitle')} {<Text style={{color:'#4987F7'}} onPress={()=>navigation.navigate('SignIn')} >{i18n.t('signUp.subtitle2')}</Text>} </Text>
        </KeyboardAvoidingView>
        </ScrollView>
    </View>
  )
}