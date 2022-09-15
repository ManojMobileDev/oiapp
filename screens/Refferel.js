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
                    })
                    .then(() => {
                        console.log('User updated!');
                        navigation.navigate('VehicalReg1')
                    });

        }

    console.log(context.mobile)
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
                
            />
            </Animatable.View>
                <TouchableHighlight style={styles.button} onPress={()=>updateReferee()}>
                    <View style={styles.buttonView}>
                        <Text style={styles.buttonText}>{i18n.t('ref.next')}</Text>
                    </View>
                </TouchableHighlight>

                <Pressable style={{alignSelf:'center'}} onPress={()=>navigation.navigate('VehicalReg1')}>
                    <Text>{i18n.t('ref.skip')}</Text>
                </Pressable>
        </ScrollView>
    </View>
  )
}