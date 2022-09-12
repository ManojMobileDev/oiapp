import { View, Text, StatusBar, TouchableHighlight,Platform, Image, TextInput ,TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import React, { useEffect, useState ,useContext } from "react";
import styles from '../styles/style'
import { OIContext } from '../context/Context';
import Header from '../components/Header';
import Circle from '../components/Circle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { Languages } from '../datasets/Languages';
import Picker from '../components/Picker';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResetPasswordPhoneNumber() {

    const context = useContext(OIContext)
    const [sent, setSent] = useState(false);
    const [key, setKey] = useState(0);
    const [key2, setKey2] = useState(100000);
    const [key3, setKey3] = useState(1000);
    const [number, setNumber] = useState('');
    const [click, setClick] = useState(false);
    const [country, setCountry] = useState('LK');
    const [countryCode, setCountryCode] = useState('+94');

    
    const [code1, setCode1] = useState();
    const [code2, setCode2] = useState(0);

    const [code, setCode] = useState(true);

    const [error, setError] = useState(false);
    
    const [otp, setOtp] = useState();

    const [filled, setFilled] = useState(false);

    const navigation = useNavigation();

    const storeMobile = async (value) => {
        try {
          await AsyncStorage.setItem('mobile', value.toString())
        } catch (e) {
          // saving error
        }
        context.setMobile(value)
      }


    const sendCode = ()=>{
        console.log(number.length)
        if(number.length==9){
        setCode1()
        setCode(true)
        var val = Math.floor(1000 + Math.random() * 9000);
        console.log(val);
        setOtp(val)

        fetch('https://youandmenest.com/tr_reactnative/send_sms_by_otp.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone_number: 0+number,
                otp_code: val
            })
            })
            .then(
                storeMobile(0+number),
                setSent(true),
                setKey(0)
                );
        
        }
        else{
            setError(true)
            setKey2(key2+1)
            setKey3(key3+1)
        }

    }
    const goToNext = ()=>{
        otp==code1?
        navigation.navigate('ResetPassword')
        :
        setCode(false)
    }

    useEffect(() => {
        // sendCode()
      },[]);

  return (
    <View style={styles.container}>
        <StatusBar
            animated={true}
            backgroundColor="#fff"
            barStyle={'dark-content'}
            hidden={false} />

        <Header back={true} menu={false} title={''} subTitle={''} headerColor={'transparent'} />
        <KeyboardAvoidingView behavior={"position"}>
        {
            sent?
            <Animatable.View key={key} animation={sent?'fadeInRight':'fadeOutRight'}>
                <Circle icon={<Image source={require('../images/verify.png')} style={{width:35,height:40,tintColor:'#fff'}} />} />
                <Animatable.Text animation={'fadeInRight'} style={styles.title}>{i18n.t('phone.title2')}</Animatable.Text>
                <Animatable.Text animation={'fadeInRight'} style={styles.subtitle}>{i18n.t('phone.subtitle')} {<Text onPress={()=>{setCode(true);sendCode();setKey(key+1)}} style={{color:'#4987F7'}}>{i18n.t('phone.subtitle2')}</Text>}  </Animatable.Text>
                   
                    <View style={{alignItems:'center',marginVertical:10}}>
                     <OTPInputView
                        style={{width: '60%', height: 50}}
                        pinCount={4}
                        code={code1} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        onCodeChanged = {code => { {setCode1(code),setCode2(code),setCode(true)}}}
                        autoFocusOnLoad ={false}
                        codeInputFieldStyle={code?styles.underlineStyleBase:styles.underlineStyleBase2}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled = {(code => {
                            console.log(`Code is ${code}, you are good to go!`)
                            setFilled(true)
                        })}
                    />   
                    </View>
                    {
                        code?
                        <Animatable.Text animation={'fadeInRight'} style={[styles.subtitle,{color:'red',fontSize:13}]}></Animatable.Text>
                        :
                        <Animatable.Text animation={'fadeInRight'} style={[styles.subtitle,{color:'red',fontSize:13}]}>*{i18n.t('phone.error')}  </Animatable.Text>
                    }
                    
                    <Animatable.Text animation={'fadeInRight'} onPress={()=>{setSent(false);setNumber();setKey(key+1)}} style={[styles.subtitle,{color:'#4987F7'}]}>{i18n.t('phone.change')}  </Animatable.Text>

                        {
                            code2.toString().length>3?
                            <TouchableHighlight style={styles.button} onPress={()=>{goToNext();setKey(1)}}>
                    <View style={styles.buttonView}>
                        <Text style={styles.buttonText}>{i18n.t('phone.button2')}</Text>
                        {/* <FontAwesome5 name='arrow-right' size={12} color={'white'} style={{paddingLeft:10}}/> */}
                    </View>
                </TouchableHighlight>
                :
                <TouchableHighlight style={[styles.button,{backgroundColor:'rgba(0,0,0,0.3)'}]}>
                    <View style={styles.buttonView}>
                        <Text style={styles.buttonText}>{i18n.t('phone.button2')}</Text>
                        {/* <FontAwesome5 name='arrow-right' size={12} color={'white'} style={{paddingLeft:10}}/> */}
                    </View>
                </TouchableHighlight>
                        }
                

            </Animatable.View>
            :
            <Animatable.View key={key} style={{paddingTop:70}} animation={sent==false?'fadeInRight':'fadeOutRight'}>
                <Text style={styles.title}>{i18n.t('phone.title1')}</Text>

                <Animatable.View key={key2} animation={error?'shake':'fadeIn'} style={[styles.inputView,{borderColor:error?'red':'black'}]}>
                    <View style={styles.phoneCountry}>
                        
                        {
                                Languages.map((lang)=>
                                country==lang.title?
                                    <Image key={lang.id} source={lang.image} style={{width:22,height:22,borderRadius:25}}  />
                                :
                                null
                                )
                            }
                        
                        {
                            click?
                            <TouchableOpacity onPress={()=>setClick(false)}>
                               <FontAwesome name='angle-up' size={25} color={'black'} style={{paddingLeft:10}}/> 
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=>setClick(true)}>
                                <FontAwesome name='angle-down' size={25} color={'black'} style={{paddingLeft:10}}/> 
                            </TouchableOpacity>
                            
                        }

                        <View style={{borderColor:'gray',borderRightWidth:1,height:30,width:10}} />

                        {/* <Picker data={Languages} avatar={true} click={click} onPress={()=>{setCountry(lang.title);setClick(false)}} state={country} /> */}
                        
                        {
                            click?

                        <Animatable.View duration={100} animation={click?'fadeIn':'fadeOut'} style={{backgroundColor:'white',padding:10,position:'absolute',top:40,zIndex:2,elevation:20}}>
                            {
                                Languages.map((lang)=>
                                    <TouchableOpacity key={lang.id} onPress={()=>{setCountry(lang.title);setClick(false);setCountryCode(lang.code)}} style={{margin:5}}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Image source={country==lang.title?lang.image:lang.dimage} style={{width:22,height:22,borderRadius:25}}  />
                                            <Text style={{marginLeft:10,color:country==lang.title?'black':'#C4C4C4'}}>{lang.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                        </Animatable.View>
                        : null

                        }
                      
                    </View>
                    <Text style={styles.countryCode}>{countryCode}</Text>  
                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>{setNumber(text);setError(false)}}
                        value={number}
                        placeholder="00 000 0000"
                        keyboardType="numeric"
                        
                       
                    />

                </Animatable.View>

                {
                        !error?
                        <Animatable.Text animation={'fadeInRight'} style={[styles.subtitle,{color:'red',fontSize:13}]}></Animatable.Text>
                        :
                        <Animatable.Text key={key3} animation={'fadeInRight'} style={[styles.subtitle,{color:'red',fontSize:13,marginBottom:-20}]}>*{i18n.t('phone.error2')}  </Animatable.Text>
                    }
                <TouchableHighlight style={[styles.button,{marginTop:30}]} onPress={()=>{sendCode()}}>
                    <View style={styles.buttonView}>
                        <Text style={styles.buttonText}>{i18n.t('phone.button1')}</Text>
                        <FontAwesome5 name='arrow-right' size={12} color={'white'} style={{paddingLeft:10}}/>
                    </View>
                </TouchableHighlight>

            </Animatable.View>
        }
        

        </KeyboardAvoidingView>
    </View>
  )
}