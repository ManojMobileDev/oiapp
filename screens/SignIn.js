import { View, Text, StatusBar, TouchableHighlight , Image , TextInput} from 'react-native'
import React, { useEffect, useState ,useContext } from "react";
import styles from '../styles/style'
import { OIContext } from '../context/Context';
import Header from '../components/Header';
import Circle from '../components/Circle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore';
import Response from '../components/Response';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Animatable from 'react-native-animatable';

export default function SignIn() {

    const context = useContext(OIContext)
    const [number, setNumber] = useState();
    
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();

    const [ps, setPS] = useState(true); 
    const [rps, setRPS] = useState(true);

    const [pView, setPView] = useState(false); 
    const [rpView, setRPView] = useState(false); 
    
    const [key, setKey] = useState(0);
    const [key2, setKey2] = useState(1000);

    const [error, setError] = useState(false);

    const [title, setTitle] = React.useState('');
    const [subtitle, setSubtitle] = React.useState('');
    const [state, setState] = React.useState(0);
        
    const [modalVisible, setModalVisible] = React.useState(false);
    
    const message = (title,subtitle,state) => {
        setTitle(title)
        setSubtitle(subtitle)
        setState(state)
    }

    const storeUserData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('user', jsonValue)
          
        //   console.log(jsonValue)
        } catch (e) {
          // saving error
        }
      }

    const navigation = useNavigation();

    const login = (pass) =>{
        
    message(i18n.t('response.wait'),'',0)
    setModalVisible(true)

        firestore()
        .collection('users')
        .doc(context.mobile)
        .get()          
        .then(documentSnapshot => {
            console.log('User exists: ', documentSnapshot.exists);
        
            if (documentSnapshot.exists) {
              logCheck(documentSnapshot.data(),pass);
              console.log(documentSnapshot.data(),pass)
                        
            }
            else {
                console.log('User data: ');
                message(i18n.t('response.error'),i18n.t('response.accountnotfound'),1)
                setTimeout(function(){setModalVisible(false)}, 2000)      
            }
          });

    }
    const logCheck =(data,pass)=>{
        if (pass==data.password){
            message(i18n.t('response.success'),i18n.t('response.loginsuccess'),2)
            context.getLanguage()
            storeUserData(data)
            context.setUser(data)
            setTimeout(function(){navigation.navigate('Home');setModalVisible(false)}, 2000)

        }
        else{
            setPassword()
            setError(true)
            setKey2(key2+1)
            setKey(key+1)
            message(i18n.t('response.error'),i18n.t('response.passworderror'),1)
            setTimeout(function(){setModalVisible(false)}, 2000)
        }
            // console.log(data.password)
    }

  return (
    <View style={styles.container}>
        <StatusBar
            animated={true}
            backgroundColor="#fff"
            barStyle={'dark-content'}
            hidden={false} />

        <Header back={true} menu={false} title={''} subTitle={''} headerColor={'transparent'} />
        <Text style={styles.title}>{i18n.t('signIn.title')}</Text>
        <Circle icon={<SimpleLineIcons name='screen-smartphone' size={40} color={'white'}/>} />
        
        <Animatable.View key={key2} animation={error?'shake':'fadeIn'} style={[styles.inputView,{borderColor:error?'red':'black'}]}>
            <TextInput
                style={styles.input}
                onChangeText={(text)=>{setPassword(text);setError(false)}}
                value={password}
                placeholder={i18n.t('signIn.placeholder')}
                keyboardType="default"
                onFocus={()=>{setPView(true)}}
                onBlur={()=>setPView(false)} 
                secureTextEntry={ps}
                placeholderTextColor={'gray'}
            />

{
                    pView==true?
                    ps==true?
                    <Ionicons 
                        name="eye" 
                        size={20} 
                        color="gray" 
                        style={{marginLeft:0,marginRight:0}}
                        onPress={()=>setPS(false)}
                    />
                    :
                    <Ionicons 
                        name="eye-off" 
                        size={20} 
                        color="gray" 
                        style={{marginLeft:0,marginRight:0}}
                        onPress={()=>setPS(true)}
                    />

                    :
                    null
                }
        </Animatable.View>
        {/* <Animatable.Text animation={'fadeInRight'} style={[styles.subtitle,{color:'red',fontSize:13}]}>*{i18n.t('phone.error2')}  </Animatable.Text> */}
                
        {
                        !error?
                        <Animatable.Text animation={'fadeInRight'} style={[styles.subtitle,{color:'red',fontSize:13}]}></Animatable.Text>
                        :
                        <Animatable.Text key={key} animation={'fadeInRight'} style={[styles.subtitle,{color:'red',fontSize:13}]}>*{i18n.t('signIn.error1')}  </Animatable.Text>
                    }
        <Text style={[styles.subtitle,{color:'#4987F7',marginTop:10}]} onPress={()=>navigation.navigate('ResetPasswordPhoneNumber')}>{i18n.t('signIn.forgot')} </Text>

        <TouchableHighlight style={styles.button} onPress={()=>{login(password)}}>
            <View style={styles.buttonView}>
                <Text style={styles.buttonText}>{i18n.t('signIn.button')}</Text>
            </View>
        </TouchableHighlight>
        <Text style={styles.subtitle}>{i18n.t('signIn.subtitle')} {<Text style={{color:'#4987F7'}} onPress={()=>navigation.navigate('SignUpPhoneNumber')} >{i18n.t('signIn.subtitle2')}</Text>} </Text>
        <Response modalVisible={modalVisible} title={title} subtitle={subtitle} state={state} />
</View>
  )
}