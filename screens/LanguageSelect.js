import { View, Text, StatusBar, TouchableHighlight, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState ,useContext } from "react";
import styles from '../styles/style'
import { OIContext } from '../context/Context';
import Header from '../components/Header';
import Circle from '../components/Circle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n from 'i18n-js';

import en from '../translations/en.json';
import si from '../translations/zh.json';
import tm from '../translations/tm.json';

export default function LanguageSelect() {

    const context = useContext(OIContext)

    const [lang, setLang] = useState("en");
    const [key, setKey] = useState(1);
        
    const navigation = useNavigation();

    i18n.locale = context.language;
    i18n.fallbacks = true;
    i18n.translations = { en, si, tm };

    const changeLanguage = async (value) => {
        try {
          await AsyncStorage.setItem('language', value)
        } catch (e) {
          // saving error
        }
        setLang(value)
        context.setLanguage(value)
      }

  return (
    <View style={styles.container}>
        <StatusBar
            animated={true}
            backgroundColor="#fff"
            barStyle={'dark-content'}
            hidden={false} />

        <Header back={false} menu={false} title={''} subTitle={''} headerColor={'transparent'} />
        <Circle icon={<Image source={require('../images/language.png')} style={{width:40,height:40,tintColor:'#fff'}} />} />
        <View  key={key}>
        <Animatable.Text animation={'fadeIn'} style={styles.title}>{i18n.t('lang.title')}</Animatable.Text>
        <Animatable.Text animation={'fadeIn'} style={styles.subtitle}>{i18n.t('lang.subtitle')}</Animatable.Text>
            
        </View>
        
        <Animatable.View animation={'slideInLeft'} style={styles.languages}>

            <TouchableOpacity style={styles.languagesInner} onPress={()=>{changeLanguage('en');setKey(1)}}>
                <View style={styles.languagesInner2}>
                    {
                        context.language=='en'?
                        <Image source={require('../images/english.png')} style={{width:40,height:20}} />
                        :
                        <Image source={require('../images/grayenglish.png')} style={{width:40,height:20}} />
                    }
                    
                    <Text style={[styles.languagesText,{color:context.language=='en'?'black':'#C4C4C4'}]}>English</Text>                    
                </View>
                <FontAwesome name={'check'} size={22} color={context.language=='en'?'#43D55B':'#C4C4C4'}/>
            </TouchableOpacity>

            <View style={styles.hr} />

            <TouchableOpacity style={styles.languagesInner} onPress={()=>{changeLanguage('si');setKey(2)}}>
                <View style={styles.languagesInner2}>
                    {
                        context.language=='si'?
                        <Image source={require('../images/sinhala.png')} style={{width:40,height:20}} />
                        :
                        <Image source={require('../images/graysinhala.png')} style={{width:40,height:20}} />
                    }
                    
                    <Text style={[styles.languagesText,{color:context.language=='si'?'black':'#C4C4C4'}]}>සිංහල</Text>                    
                </View>
                <FontAwesome name={'check'} size={22} color={context.language=='si'?'#43D55B':'#C4C4C4'}/>
            </TouchableOpacity>

            
            <View style={styles.hr} />

            <TouchableOpacity style={styles.languagesInner} onPress={()=>{changeLanguage('tm');setKey(3)}}>
                <View style={styles.languagesInner2}>
                    {
                        context.language=='tm'?
                        <Image source={require('../images/sinhala.png')} style={{width:40,height:20}} />
                        :
                        <Image source={require('../images/graysinhala.png')} style={{width:40,height:20}} />
                    }
                    
                    <Text style={[styles.languagesText,{color:context.language=='tm'?'black':'#C4C4C4'}]}>தமிழ்</Text>                    
                </View>
                <FontAwesome name={'check'} size={22} color={context.language=='tm'?'#43D55B':'#C4C4C4'}/>
            </TouchableOpacity>


        </Animatable.View>

        <TouchableHighlight style={styles.button} onPress={()=>navigation.navigate('PhoneNumber')}>
            <View style={styles.buttonView}>
                <Animatable.Text key={key} animation={'fadeIn'} style={styles.buttonText}>{i18n.t('lang.button')}</Animatable.Text>
            </View>
        </TouchableHighlight>
    </View>
  )
}