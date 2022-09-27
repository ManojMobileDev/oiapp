import { View, Text, StatusBar, TouchableHighlight , Image , Dimensions , TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native'
import React, { useEffect, useState ,useContext } from "react";
import styles from '../styles/style'
import { OIContext } from '../context/Context';
import Header from '../components/Header';
import Circle from '../components/Circle';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { updateVehicle } from '../api/register';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import i18n from 'i18n-js';

export default function DrivingLicense() {

    const context = useContext(OIContext)
    const [lno, setLNo] = useState('');
    const [dLicenseExp, setDLicenseExp] = useState(i18n.t('driving.placeholder2'));
    const [rLicenseExp, setRLicenseExp] = useState(i18n.t('driving.placeholder2'));
    const [rInsuranceExp, setRInsuranceExp] = useState(i18n.t('driving.placeholder2'));
    // const [dob, setDob] = useState(i18n.t('signUp.placeholder4'));

    
    const [date, setDate] = useState(new Date())
    const [date2, setDate2] = useState(new Date())
    const [date3, setDate3] = useState(new Date())

    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)

    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [error3, setError3] = useState(false);
    const [error4, setError4] = useState(false);
    
    const [key1, setKey1] = useState(0);
    const [key2, setKey2] = useState(1000);
    const [key3, setKey3] = useState(2000);
    const [key4, setKey4] = useState(3000);
    
    const navigation = useNavigation();

    const save = ()=>{
        if(lno==''){            
            setError1(true)
            setKey1(key1+1)
        }
        if(dLicenseExp==i18n.t('driving.placeholder2')){
            setError2(true)
            setKey2(key2+1)            
        }
        if(rLicenseExp==i18n.t('driving.placeholder2')){
            setError3(true)
            setKey3(key3+1)            
        }
        if(rInsuranceExp==i18n.t('driving.placeholder2')){
            setError4(true)
            setKey4(key4+1)            
        }
        else{
            let data ={
                drivingLicenseNo: lno,
                drivingLicenseExp : dLicenseExp,
                revenueLicenseExp:rLicenseExp,
                revenueInsuarenceExp:rInsuranceExp
            }
            
            updateVehicle(data,context.mobile)
            goToNext()            
        }

      }
      const goToNext=()=>{
        firestore()
        .collection('users')
        .doc(context.mobile)
        .update({
            signUpProcess:6
        })
        .then(() => {
            console.log('User updated!');
            navigation.navigate('VehicleDetails')
        });
    }

  return (
    <View style={styles.container}>
        <StatusBar
            animated={true}
            backgroundColor="#fff"
            barStyle={'dark-content'}
            hidden={false} />

        <Header back={true} menu={false} title={''} subTitle={''} headerColor={'transparent'} />
        <ScrollView>
        {/* <KeyboardAvoidingView behavior={"position"}> */}
        <Text style={styles.title}>{i18n.t('driving.title')}</Text>
        
        <Text style={[styles.question,{marginTop:20}]}>{i18n.t('driving.q1')}</Text>

        <Animatable.View key={key1} animation={error1?'shake':'fadeIn'} style={[styles.inputView,{borderColor:error1?'red':'black',marginHorizontal:0}]}>
            <TextInput
                style={styles.input}
                onChangeText={(text)=>{setLNo(text);setError1(false)}}
                value={lno}
                placeholder={i18n.t('driving.placeholder1')}
                keyboardType="default"
                placeholderTextColor={'gray'}
                
            />
        </Animatable.View>

        <Animatable.View key={key2} animation={error2?'shake':'fadeIn'} style={[styles.inputView,{borderColor:error2?'red':'black',marginHorizontal:0}]}>
            <TouchableOpacity onPress={()=>{setOpen(true);setError2(false)}} style={[styles.row,{width:windowWidth-50}]}>
                <Text style={[styles.input,{textAlignVertical:'center'}]}>{dLicenseExp}</Text>
                <EvilIcons name={'calendar'} size={25}  color={'#94A3B8'}/>
            </TouchableOpacity>
        </Animatable.View>

        
        <Text style={[styles.question,{marginTop:20}]}>{i18n.t('driving.q2')}</Text>
        
        <Animatable.View key={key3} animation={error3?'shake':'fadeIn'} style={[styles.inputView,{borderColor:error3?'red':'black',marginHorizontal:0}]}>
            <TouchableOpacity onPress={()=>{setOpen2(true);setError3(false)}} style={[styles.row,{width:windowWidth-50}]}>
                <Text style={[styles.input,{textAlignVertical:'center'}]}>{rLicenseExp}</Text>
                <EvilIcons name={'calendar'} size={25}  color={'#94A3B8'}/>
            </TouchableOpacity>
        </Animatable.View>

        
        <Text style={[styles.question,{marginTop:20}]}>{i18n.t('driving.q3')} </Text>
        
        <Animatable.View key={key4} animation={error4?'shake':'fadeIn'} style={[styles.inputView,{borderColor:error4?'red':'black',marginHorizontal:0}]}>
            <TouchableOpacity onPress={()=>{setOpen3(true);setError4(false)}} style={[styles.row,{width:windowWidth-50}]}>
                <Text style={[styles.input,{textAlignVertical:'center'}]}>{rInsuranceExp}</Text>
                <EvilIcons name={'calendar'} size={25}  color={'#94A3B8'}/>
            </TouchableOpacity>
        </Animatable.View>




        <DatePicker
            modal
            open={open}
            date={date}
            mode={'date'}
            title={i18n.t('driving.modalTitle')}
            confirmText={i18n.t('driving.confirm')}
            cancelText={i18n.t('driving.cancel')}
            minimumDate={new Date(moment().subtract(18, 'years'))}
            onConfirm={(date) => {
            setOpen(false)
            setDate(date)
            setDLicenseExp(moment(date).format("MMM Do YYYY"))
            }}
            onCancel={() => {
            setOpen(false)
            setDLicenseExp(moment(new Date()).format("MMM Do YYYY"))
            setDate(new Date())
            }}
        />

        <DatePicker
            modal
            open={open2}
            date={date2}
            mode={'date'}
            title={i18n.t('driving.modalTitle2')}
            confirmText={i18n.t('driving.confirm')}
            cancelText={i18n.t('driving.cancel')}
            minimumDate={new Date(moment().subtract(18, 'years'))}
            onConfirm={(date) => {
            setOpen2(false)
            setDate2(date)
            setRLicenseExp(moment(date).format("MMM Do YYYY"))
            }}
            onCancel={() => {
            setOpen2(false)
            setRLicenseExp(moment(new Date()).format("MMM Do YYYY"))
            setDate2(new Date())
            }}
        />

        <DatePicker
            modal
            open={open3}
            date={date3}
            mode={'date'}
            title={i18n.t('driving.modalTitle3')}
            confirmText={i18n.t('driving.confirm')}
            cancelText={i18n.t('driving.cancel')}
            minimumDate={new Date(moment().subtract(18, 'years'))}
            onConfirm={(date) => {
            setOpen3(false)
            setDate3(date)
            setRInsuranceExp(moment(date).format("MMM Do YYYY"))
            }}
            onCancel={() => {
            setOpen3(false)
            setRInsuranceExp(moment(new Date()).format("MMM Do YYYY"))
            setDate3(new Date())
            }}
        />



        <TouchableHighlight style={styles.button} onPress={()=>save()}>
            <View style={styles.buttonView}>
                <Text style={styles.buttonText}>{i18n.t('driving.button')}</Text>
            </View>
        </TouchableHighlight>
        {/* </KeyboardAvoidingView> */}
        </ScrollView>
    </View>
  )
}