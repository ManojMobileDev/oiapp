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
import storage from '@react-native-firebase/storage';

import { SwipeablePanel } from 'rn-swipeable-panel';


import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';


import * as ImagePicker from "react-native-image-picker"
import ImagePickerChooser from '../components/ImagePickerChooser'

import { checkExist } from '../api/register';
import Uploading from '../components/Uploading';

export default function UploadVehicleDocuments() {

    const context = useContext(OIContext)

    const [answer, setAnswer] = useState(1);

    const [doc1, setDoc1] = useState(false);
    const [doc2, setDoc2] = useState(false)
    const [doc3, setDoc3] = useState(false)

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    
    const [done1, setDone1] = useState(false);
    const [done2, setDone2] = useState(false)
    const [done3, setDone3] = useState(false)
    
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');

    const [uploading1, setUploading1] = useState(false);
    const [uploading2, setUploading2] = useState(false);
    const [uploading3, setUploading3] = useState(false);

    const navigation = useNavigation();

    const [transferred, setTransferred] = useState(0);

    const [panelProps1, setPanelProps1] = useState({
      fullWidth: true,
      openLarge: false,
      showCloseButton: true,
      onClose: () => setIsPanelActive1(false),
      onPressCloseButton: () => setIsPanelActive1(false),
      closeIconStyle:{backgroundColor:'black'},
      closeRootStyle:{backgroundColor:'white'}
    });

    const [panelProps2, setPanelProps2] = useState({
      fullWidth: true,
      openLarge: false,
      showCloseButton: true,
      onClose: () => setIsPanelActive2(false),
      onPressCloseButton: () => setIsPanelActive2(false),
      closeIconStyle:{backgroundColor:'black'},
      closeRootStyle:{backgroundColor:'white'}
    });

    const [panelProps3, setPanelProps3] = useState({
      fullWidth: true,
      openLarge: false,
      showCloseButton: true,
      onClose: () => setIsPanelActive3(false),
      onPressCloseButton: () => setIsPanelActive3(false),
      closeIconStyle:{backgroundColor:'black'},
      closeRootStyle:{backgroundColor:'white'}
    });

    
    const [isPanelActive1, setIsPanelActive1] = useState(false);
    const [isPanelActive2, setIsPanelActive2] = useState(false);
    const [isPanelActive3, setIsPanelActive3] = useState(false);

    const options2 = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const onCameraPress =(doc)=>{
      ImagePicker.launchCamera(options2, (response) =>  {
         // console.log('Response = ', response);
        
         if (response.didCancel) {
           console.log('User cancelled image picker');
         } else if (response.error) {
           console.log('ImagePicker Error: ', 'response.error');
         } else if (response.customButton) {
           console.log('User tapped custom button: ', 'response.customButton');
         } else {
            const source = { uri: response.assets[0]['uri'] };
            const imdata = response.data;
 
            setImage(doc,source);

            // setFilePath(source)
            console.log(response)
            // uploadPhoto(response)
         }
       });
    }

    const onGalleryPress =(doc)=>{
      const options = {
         quality: 1.0,
         maxWidth: 500,
         maxHeight: 500,
         storageOptions: {
           skipBackup: true
         }
       }

      ImagePicker.launchImageLibrary(options, (response) => {
         // console.log('Response = ', response);
        
         if (response.didCancel) {
           console.log('User cancelled image picker');
         } else if (response.error) {
           console.log('ImagePicker Error: ', response.error);
         } else if (response.customButton) {
           console.log('User tapped custom button: ', response.customButton);
         } else {
          //  const source = { uri: response.uri };
           

           const source = { uri: response.assets[0]['uri'] };
           const imdata = response.data;

          //  console.log(response.assets[0]['uri']);

          //  if (doc==1){
          //    no==1?
          //     setImg1(source)
          //     :
          //     setImg2(source)
          //  }
           
           setImage(doc,source);
         }
       });
    }
    const setImage =(doc,source)=>{
      if(doc==1){
          setImg1(source)
      }
      else if(doc==2){
          setImg2(source)
      }
      else if(doc==3){
          setImg3(source)
      }


    }

    const save =(doc)=>{
      if(doc==1){
        uploadImage(doc,img1,context.mobile+'revenueLicense')
      }
      else if(doc==2){
        uploadImage(doc,img2,context.mobile+'vehicleRegistration')
      }
      else if(doc==3){
        uploadImage(doc,img3,context.mobile+'vehicleInsurance')
      }

    }

    const uploadImage = async (doc,image,name) => {
      
      let data = []

      const { uri } = image;
      const filetype = '.'+(uri.substring(uri.lastIndexOf('/') + 1)).split('.')[1];
      const filename = name+filetype;
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      
      if(doc==1){
          setUploading1(true)
          setDone1(true)
          data.push({revenueLicense:filename})     
      }
      else if(doc==2){
          setUploading2(true)
          setDone2(true)
          data.push({vehicleRegistration:filename})      
      }
      else if(doc==3){
        setDone3(true)
          setUploading3(true)

          data.push({vehicleInsurance:filename})    
      }
      console.log(filetype)
      
      
      setTransferred(0);
      const task = storage()
        .ref(filename)
        .putFile(uploadUri);
      // set progress state
      task.on('state_changed', snapshot => {
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
        );
      });
      try {
        await task;
      } catch (e) {
        console.error(e);
      }
      

      if(doc==1){
          setTimeout(() => {
              setUploading1(false)
          }, 1000);
            
          setTimeout(() => {
              setIsPanelActive1(false)
          }, 1500);
         
          setDone1(false);
          setDoc1(true)
          checkExist(data[0],context.mobile)
      }
      else if(doc==2){
            setTimeout(() => {
              setUploading2(false)
          }, 1000);
            
            setTimeout(() => {
              setIsPanelActive2(false)
          }, 1500);
            
            setDone2(false);
          setDoc2(true)  
          checkExist(data[0],context.mobile)
      }
      else if(doc==3){
          setTimeout(() => {
            setUploading3(false)
          }, 1000);
          
            setTimeout(() => {
              setIsPanelActive3(false)
          }, 1500);
       
          setDone3(false);
          setDoc3(true)
          checkExist(data[0],context.mobile)
      }
      
    };

  return (
    <View style={styles.container}>
        <StatusBar
            animated={true}
            backgroundColor="#fff"
            barStyle={'dark-content'}
            hidden={false} />

        <Header back={true} menu={false} title={''} subTitle={''} headerColor={'transparent'} />
        <View style={{alignItems:'center'}}>
            <Text style={[styles.title,{width:"80%"}]} numberOfLines={2}>{i18n.t('doc2.title')}</Text>
        </View>
        
        <ScrollView>
        <View style={styles.questionView}>
          <Text style={styles.question}>{i18n.t('doc2.subtitle')}</Text>

                <TouchableOpacity onPress={()=>setIsPanelActive1(true)} style={styles.answerView}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={doc1?['#ED9939', '#FFCE31']:['rgba(255, 206, 49, 0.09)', 'rgba(255, 206, 49, 0.09)']} style={styles.linearGradiant}>
                        <View style={styles.row}>
                          <Text style={[styles.question,{color:doc1==true?'white':'black'}]}>{i18n.t('doc2.topic1')}</Text> 
                          <Octicons name='check-circle-fill' size={20} color={doc1==true?'white':'#E8E8E8'}/>
                        </View>
                        
                        <Text style={[styles.subtitle,{color:doc1==true?'white':'black',textAlign:'left',paddingHorizontal:0}]}>{i18n.t('doc2.11')}</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setIsPanelActive2(true)} style={styles.answerView}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={doc2?['#ED9939', '#FFCE31']:['rgba(255, 206, 49, 0.09)', 'rgba(255, 206, 49, 0.09)']} style={styles.linearGradiant}>
                        <View style={styles.row}>
                          <Text style={[styles.question,{color:doc2?'white':'black'}]}>{i18n.t('doc2.topic2')}</Text> 
                          <Octicons name='check-circle-fill' size={20} color={doc2?'white':'#E8E8E8'}/>
                        </View>
                        
                        <Text style={[styles.subtitle,{color:doc2?'white':'black',textAlign:'left',paddingHorizontal:0}]}>{i18n.t('doc2.21')}</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setIsPanelActive3(true)} style={styles.answerView}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={doc3?['#ED9939', '#FFCE31']:['rgba(255, 206, 49, 0.09)', 'rgba(255, 206, 49, 0.09)']} style={styles.linearGradiant}>
                        <View style={styles.row}>
                          <Text style={[styles.question,{color:doc3?'white':'black'}]}>{i18n.t('doc2.topic3')}</Text> 
                          <Octicons name='check-circle-fill' size={20} color={doc3?'white':'#E8E8E8'}/>
                        </View>
                        
                        <Text style={[styles.subtitle,{color:doc3?'white':'black',textAlign:'left',paddingHorizontal:0}]}>{i18n.t('doc2.31')}</Text>
                    </LinearGradient>
                </TouchableOpacity>



        </View>
        
        {
        doc1 && doc2 && doc3 ?
        <TouchableHighlight style={styles.button} onPress={()=>navigation.navigate('Complete')}>
            <View style={styles.buttonView}>
                <Text style={styles.buttonText}>{i18n.t('doc2.button')}</Text>
            </View>
        </TouchableHighlight>
        :
        <TouchableHighlight style={[styles.button,{backgroundColor:'#cccccc'}]}>
            <View style={styles.buttonView}>
                <Text style={[styles.buttonText,{color:'gray'}]}>{i18n.t('doc2.button')}</Text>
            </View>
        </TouchableHighlight>        
      }

        </ScrollView>

        <SwipeablePanel {...panelProps1} 
        isActive={isPanelActive1}>
        <View style={styles.panelView}>
        <Uploading done={done1} show={uploading1} text={i18n.t('doc.uploading')} text2={i18n.t('doc.uploaded')}/>
        <Text style={styles.subtitle}>{i18n.t('doc2.panelsub1')}</Text>
        <View style={{flexDirection:'row'}}>

        <TouchableOpacity style={styles.photoButton}
          onPress={()=>{
            setShow1(true);                  
            setTimeout(() => {
                     setShow1(null)
                  }, 5000);
                  }}>
        <ImagePickerChooser onpress1={()=>{onCameraPress(1)}} onpress2={()=>{onGalleryPress(1)}} show={show1} />
            {
              img1==''?null:
              <Image source={img1} style={styles.img}/>
            }
            <Text style={styles.subtitle}>{i18n.t('doc2.topic1')}</Text>
          </TouchableOpacity>

        </View>
        {
         img1=='' ? 
         <TouchableOpacity style={[styles.button,{marginTop:5,alignSelf:'flex-end',width:100,backgroundColor:'#cccccc'}]}>
          <View style={styles.buttonView}>
            <Text style={[styles.buttonText,{fontSize:14,color:'gray'}]}>Save</Text>
          </View>
          
        </TouchableOpacity>
        :
        <TouchableOpacity style={[styles.button,{marginTop:5,alignSelf:'flex-end',width:100}]} onPress={()=>save(1)}>
        <View style={styles.buttonView}>
          <Text style={[styles.buttonText,{fontSize:14}]}>Save</Text>
        </View>
        
      </TouchableOpacity>
        }

        </View>
      </SwipeablePanel>

      <SwipeablePanel {...panelProps2} isActive={isPanelActive2}>
      <View style={styles.panelView}>
        <Uploading done={done2} show={uploading2} text={i18n.t('doc.uploading')} text2={i18n.t('doc.uploaded')}/>
        
        <Text style={styles.subtitle}>{i18n.t('doc2.panelsub2')}</Text>
        <View style={{flexDirection:'row'}}>
          
        <TouchableOpacity style={styles.photoButton}
          onPress={()=>{
            setShow2(true);                  
            setTimeout(() => {
                     setShow2(null)
                  }, 5000);
                  }}>
        <ImagePickerChooser onpress1={()=>{onCameraPress(2)}} onpress2={()=>{onGalleryPress(2)}} show={show2} />
            {
              img2==''?null:
              <Image source={img2} style={styles.img}/>
            }
            <Text style={styles.subtitle}>{i18n.t('doc2.topic2')}</Text>
          </TouchableOpacity>

        </View>
        
        {
         img2=='' ? 
         <TouchableOpacity style={[styles.button,{marginTop:5,alignSelf:'flex-end',width:100,backgroundColor:'#cccccc'}]}>
          <View style={styles.buttonView}>
            <Text style={[styles.buttonText,{fontSize:14,color:'gray'}]}>Save</Text>
          </View>
          
        </TouchableOpacity>
        :
        <TouchableOpacity style={[styles.button,{marginTop:5,alignSelf:'flex-end',width:100}]} onPress={()=>save(2)}>
        <View style={styles.buttonView}>
          <Text style={[styles.buttonText,{fontSize:14}]}>Save</Text>
        </View>
        
      </TouchableOpacity>
        }
        </View>
      </SwipeablePanel>

      <SwipeablePanel {...panelProps3} isActive={isPanelActive3}>
      <View style={styles.panelView}>
      <Uploading done={done3} show={uploading3} text={i18n.t('doc.uploading')} text2={i18n.t('doc.uploaded')}/>
        <Text style={styles.subtitle}>{i18n.t('doc2.panelsub3')}</Text>
        <View style={{flexDirection:'row'}}>
          
          <TouchableOpacity style={styles.photoButton}
          onPress={()=>{
            setShow3(true);                  
            setTimeout(() => {
                     setShow3(null)
                  }, 5000);
                  }}>
        <ImagePickerChooser onpress1={()=>{onCameraPress(3)}} onpress2={()=>{onGalleryPress(3)}} show={show3} />
            {
              img3==''?null:
              <Image source={img3} style={styles.img}/>
            }
            <Text style={styles.subtitle}>{i18n.t('doc2.topic3')}</Text>
          </TouchableOpacity>

          
          {/* <TouchableOpacity style={styles.photoButton}>
            <Text style={styles.subtitle}>{i18n.t('doc2.back')}</Text>    
          </TouchableOpacity> */}

        </View>
        
        {
         img3=='' ? 
         <TouchableOpacity style={[styles.button,{marginTop:5,alignSelf:'flex-end',width:100,backgroundColor:'#cccccc'}]}>
          <View style={styles.buttonView}>
            <Text style={[styles.buttonText,{fontSize:14,color:'gray'}]}>Save</Text>
          </View>
          
        </TouchableOpacity>
        :
        <TouchableOpacity style={[styles.button,{marginTop:5,alignSelf:'flex-end',width:100}]} onPress={()=>save(3)}>
        <View style={styles.buttonView}>
          <Text style={[styles.buttonText,{fontSize:14}]}>Save</Text>
        </View>
        
      </TouchableOpacity>
        }
        </View>
      </SwipeablePanel>

    </View>
  )
}