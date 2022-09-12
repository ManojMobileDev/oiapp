import { View, Text, StatusBar, TouchableHighlight , Image , TextInput, TouchableOpacity ,ScrollView} from 'react-native'
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
import { updateVehicle } from '../api/register';

export default function VehicalReg1() {

    const context = useContext(OIContext)
    const [answer, setAnswer] = useState(1);
    const navigation = useNavigation();
    
    const save = ()=>{
      let vehicle = answer==1?'tuk':answer==2?'nano/car/mini':answer==3?'minivan/van':answer==4?'bike':'truck'
      let data ={vehicle: vehicle}
      updateVehicle(data,context.mobile)
      navigation.navigate('DrivingLicense')
    }

  return (
    <View style={styles.container}>
        <StatusBar
            animated={true}
            backgroundColor="#fff"
            barStyle={'dark-content'}
            hidden={false} />

        <Header back={true} menu={false} title={''} subTitle={''} headerColor={'transparent'} />
        <Text style={styles.title}>{i18n.t('choose.title')}</Text>
        <ScrollView>
        <View style={styles.questionView}>
          <Text style={styles.question}>{i18n.t('choose.question')}</Text>

                <TouchableOpacity onPress={()=>setAnswer(1)} style={styles.answerView}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={answer==1?['#ED9939', '#FFCE31']:['rgba(255, 206, 49, 0.09)', 'rgba(255, 206, 49, 0.09)']} style={styles.linearGradiant}>
                        <View style={styles.row}>
                          <Text style={[styles.question,{color:answer==1?'white':'black'}]}>{i18n.t('choose.topic1')}</Text> 
                          <Octicons name='check-circle-fill' size={20} color={answer==1?'white':'#E8E8E8'}/>
                        </View>
                        
                        <Text style={[styles.subtitle,{color:answer==1?'white':'black',textAlign:'left',paddingHorizontal:0}]}>{i18n.t('choose.11')}</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setAnswer(2)} style={styles.answerView}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={answer==2?['#ED9939', '#FFCE31']:['rgba(255, 206, 49, 0.09)', 'rgba(255, 206, 49, 0.09)']} style={styles.linearGradiant}>
                        <View style={styles.row}>
                          <Text style={[styles.question,{color:answer==2?'white':'black'}]}>{i18n.t('choose.topic2')}</Text> 
                          <Octicons name='check-circle-fill' size={20} color={answer==1?'white':'#E8E8E8'}/>
                        </View>
                        
                        <Text style={[styles.subtitle,{color:answer==2?'white':'black',textAlign:'left',paddingHorizontal:0}]}>{i18n.t('choose.21')}</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setAnswer(3)} style={styles.answerView}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={answer==3?['#ED9939', '#FFCE31']:['rgba(255, 206, 49, 0.09)', 'rgba(255, 206, 49, 0.09)']} style={styles.linearGradiant}>
                        <View style={styles.row}>
                          <Text style={[styles.question,{color:answer==3?'white':'black'}]}>{i18n.t('choose.topic3')}</Text> 
                          <Octicons name='check-circle-fill' size={20} color={answer==3?'white':'#E8E8E8'}/>
                        </View>
                        
                        <Text style={[styles.subtitle,{color:answer==3?'white':'black',textAlign:'left',paddingHorizontal:0}]}>{i18n.t('choose.31')}</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setAnswer(4)} style={styles.answerView}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={answer==4?['#ED9939', '#FFCE31']:['rgba(255, 206, 49, 0.09)', 'rgba(255, 206, 49, 0.09)']} style={styles.linearGradiant}>
                        <View style={styles.row}>
                          <Text style={[styles.question,{color:answer==4?'white':'black'}]}>{i18n.t('choose.topic4')}</Text> 
                          <Octicons name='check-circle-fill' size={20} color={answer==4?'white':'#E8E8E8'}/>
                        </View>
                        
                        <Text style={[styles.subtitle,{color:answer==4?'white':'black',textAlign:'left',paddingHorizontal:0}]}>{i18n.t('choose.41')}</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setAnswer(5)} style={styles.answerView}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={answer==5?['#ED9939', '#FFCE31']:['rgba(255, 206, 49, 0.09)', 'rgba(255, 206, 49, 0.09)']} style={styles.linearGradiant}>
                        <View style={styles.row}>
                          <Text style={[styles.question,{color:answer==5?'white':'black'}]}>{i18n.t('choose.topic5')}</Text> 
                          <Octicons name='check-circle-fill' size={20} color={answer==5?'white':'#E8E8E8'}/>
                        </View>
                        
                        <Text style={[styles.subtitle,{color:answer==5?'white':'black',textAlign:'left',paddingHorizontal:0}]}>{i18n.t('choose.51')}</Text>
                    </LinearGradient>
                </TouchableOpacity>

        </View>
        

        <TouchableHighlight style={styles.button} onPress={()=>save()}>
            <View style={styles.buttonView}>
                <Text style={styles.buttonText}>{i18n.t('reg1.button')}</Text>
            </View>
        </TouchableHighlight>
        </ScrollView>
    </View>
  )
}