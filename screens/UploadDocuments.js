import { View, Text, StatusBar, TouchableHighlight , Image ,Platform, TextInput, TouchableOpacity ,ScrollView} from 'react-native'
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
import * as Animatable from 'react-native-animatable';
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

// import ImagePicker from 'react-native-image-picker';

import * as ImagePicker from "react-native-image-picker"
import ImagePickerChooser from '../components/ImagePickerChooser'

import { checkExist } from '../api/register';
import Uploading from '../components/Uploading';

export default function UploadDocuments() {

    const context = useContext(OIContext)

    const [answer, setAnswer] = useState(1);

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [show5, setShow5] = useState(false);
    const [show6, setShow6] = useState(false);

    
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('');
    const [img5, setImg5] = useState('');
    const [img6, setImg6] = useState('');


    const [transferred, setTransferred] = useState(0);

    const [uploading1, setUploading1] = useState(false);
    const [uploading2, setUploading2] = useState(false);
    const [uploading3, setUploading3] = useState(false);
    const [uploading4, setUploading4] = useState(false);

    const [doc1, setDoc1] = useState(false);
    const [doc2, setDoc2] = useState(false)
    const [doc3, setDoc3] = useState(false)
    const [doc4, setDoc4] = useState(false)
    const [doc5, setDoc5] = useState(false)

    
    const [done1, setDone1] = useState(false);
    const [done2, setDone2] = useState(false)
    const [done3, setDone3] = useState(false)
    const [done4, setDone4] = useState(false)

    const navigation = useNavigation();

    const [panelProps1, setPanelProps1] = useState({
      fullWidth: true,
      openLarge: false,
      showCloseButton: true,
      onClose: () => setIsPanelActive1(false),
      onPressCloseButton: () => setIsPanelActive1(false),
      closeIconStyle:{backgroundColor:'black',zIndex:4},
      closeRootStyle:{backgroundColor:'white',zIndex:4}
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

    const [panelProps4, setPanelProps4] = useState({
      fullWidth: true,
      openLarge: false,
      showCloseButton: true,
      onClose: () => setIsPanelActive4(false),
      onPressCloseButton: () => setIsPanelActive4(false),
      closeIconStyle:{backgroundColor:'black'},
      closeRootStyle:{backgroundColor:'white'}
    });
    
    const [isPanelActive1, setIsPanelActive1] = useState(false);
    const [isPanelActive2, setIsPanelActive2] = useState(false);
    const [isPanelActive3, setIsPanelActive3] = useState(false);
    const [isPanelActive4, setIsPanelActive4] = useState(false);
    
    const options2 = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const onCameraPress =(doc,no)=>{
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
 
            setImage(doc,no,source);

            // setFilePath(source)
            console.log(response)
            // uploadPhoto(response)
         }
       });
    }

    const onGalleryPress =(doc,no)=>{
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

           if (doc==1){
             no==1?
              setImg1(source)
              :
              setImg2(source)
           }
           
           setImage(doc,no,source);
         }
       });
    }
    const setImage =(doc,no,source)=>{
      if(doc==1){
        no==1?
          setImg1(source)
          :
          setImg2(source)
      }
      else if(doc==2){
        no==1?
          setImg3(source)
          :
          setImg4(source)
      }
      else if(doc==3){
          setImg5(source)
      }
      else if(doc==4){
          setImg6(source)
      }


    }

    const save =(doc)=>{
      if(doc==1){
        uploadImage(doc,1,img1,context.mobile+'nicfront')
        uploadImage(doc,2,img2,context.mobile+'nicback')
      }
      else if(doc==2){
        uploadImage(doc,1,img3,context.mobile+'drivingLicenseSide1')
        uploadImage(doc,2,img4,context.mobile+'drivingLicenseSide2')
      }
      else if(doc==3){
        uploadImage(doc,1,img5,context.mobile+'billingProof')
      }
      else if(doc==4){
        uploadImage(doc,1,img6,context.mobile+'profilePic')
      }

    }

    const uploadImage = async (doc,no,image,name) => {
      
      let data = []

      const { uri } = image;
      const filetype = '.'+(uri.substring(uri.lastIndexOf('/') + 1)).split('.')[1];
      const filename = name+filetype;
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      

      console.log(filetype)
      
      const reference = storage().ref(filename);

      setTransferred(0);
      const task = storage()
        .ref(filename)
        .putFile(uploadUri);

        const url = await reference.getDownloadURL();

        console.log(url)
        if(doc==1){
          if(no==1){
            setUploading1(true)
            setDone1(true)
            data.push({nicFront:url})
          } 
          else{
  
            data.push({nicBack:url})
          }       
        }
        else if(doc==2){
          if(no==1){
            setUploading2(true)
            setDone2(true)
            data.push({drivingLicenseSide1:url})
          } 
          else{
  
            data.push({drivingLicenseSide2:url})
          }       
        }
        else if(doc==3){
          setDone3(true)
            setUploading3(true)
  
            data.push({billingProof:url})    
        }
        else if(doc==4){
          setDone4(true)
            setUploading4(true)
  
            data.push({profilePic:url})
        }
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
        if(no==2){
          setTimeout(() => {
            setUploading1(false)
         }, 1000);
         
         setTimeout(() => {
          setIsPanelActive1(false)
       }, 1500);
         
            setDone1(false);
          setDoc1(true)
        }    
          checkExist(data[0],context.mobile)
      }
      else if(doc==2){
        if(no==2){
          setTimeout(() => {
            setUploading2(false)
         }, 1000);
         
         setTimeout(() => {
          setIsPanelActive2(false)
       }, 1500);
         
            setDone2(false);
          setDoc2(true)
        }    
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
      else if(doc==4){
        setTimeout(() => {
          setUploading4(false)
       }, 1000);
       
       setTimeout(() => {
        setIsPanelActive4(false)
     }, 1500);
       
          setDone4(false);
          setDoc4(true)   
          checkExist(data[0],context.mobile)
      }
      
    };

    useEffect(() => {
      console.log(context.mobile)
    },[]);

  return (
    <View style={styles.container}>
        <StatusBar
            animated={true}
            backgroundColor="#fff"
            barStyle={'dark-content'}
            hidden={false} />

        <Header back={true} menu={false} title={''} subTitle={''} headerColor={'transparent'} />
        <Text style={styles.title}>{i18n.t('doc.title')}</Text>
        <ScrollView>
        <View style={styles.questionView}>
          <Text style={styles.question}>{i18n.t('doc.subtitle')}</Text>

                <TouchableOpacity onPress={()=>setIsPanelActive1(true)} style={styles.answerView}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={doc1?['#ED9939', '#FFCE31']:['rgba(255, 206, 49, 0.09)', 'rgba(255, 206, 49, 0.09)']} style={styles.linearGradiant}>
                        <View style={styles.row}>
                          <Text style={[styles.question,{color:doc1==true?'white':'black'}]}>{i18n.t('doc.topic1')}</Text> 
                          <Octicons name='check-circle-fill' size={20} color={doc1==true?'white':'#E8E8E8'}/>
                        </View>
                        
                        <Text style={[styles.subtitle,{color:doc1==true?'white':'black',textAlign:'left',paddingHorizontal:0}]}>{i18n.t('doc.11')}</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setIsPanelActive2(true)} style={styles.answerView}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={doc2?['#ED9939', '#FFCE31']:['rgba(255, 206, 49, 0.09)', 'rgba(255, 206, 49, 0.09)']} style={styles.linearGradiant}>
                        <View style={styles.row}>
                          <Text style={[styles.question,{color:doc2?'white':'black'}]}>{i18n.t('doc.topic2')}</Text> 
                          <Octicons name='check-circle-fill' size={20} color={doc2?'white':'#E8E8E8'}/>
                        </View>
                        
                        <Text style={[styles.subtitle,{color:doc2?'white':'black',textAlign:'left',paddingHorizontal:0}]}>{i18n.t('doc.21')}</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setIsPanelActive3(true)} style={styles.answerView}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={doc3?['#ED9939', '#FFCE31']:['rgba(255, 206, 49, 0.09)', 'rgba(255, 206, 49, 0.09)']} style={styles.linearGradiant}>
                        <View style={styles.row}>
                          <Text style={[styles.question,{color:doc3?'white':'black'}]}>{i18n.t('doc.topic3')}</Text> 
                          <Octicons name='check-circle-fill' size={20} color={doc3?'white':'#E8E8E8'}/>
                        </View>
                        
                        <Text style={[styles.subtitle,{color:doc3?'white':'black',textAlign:'left',paddingHorizontal:0}]}>{i18n.t('doc.31')}</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setIsPanelActive4(true)} style={styles.answerView}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={doc4?['#ED9939', '#FFCE31']:['rgba(255, 206, 49, 0.09)', 'rgba(255, 206, 49, 0.09)']} style={styles.linearGradiant}>
                        <View style={styles.row}>
                          <Text style={[styles.question,{color:doc4?'white':'black'}]}>{i18n.t('doc.topic4')}</Text> 
                          <Octicons name='check-circle-fill' size={20} color={doc4?'white':'#E8E8E8'}/>
                        </View>
                        
                        <Text style={[styles.subtitle,{color:doc4?'white':'black',textAlign:'left',paddingHorizontal:0}]}>{i18n.t('doc.41')}</Text>
                    </LinearGradient>
                </TouchableOpacity>


        </View>
        
      {
        doc1 && doc2 && doc3 && doc4?
        <TouchableHighlight style={styles.button} onPress={()=>navigation.navigate('UploadVehicleDocuments')}>
            <View style={styles.buttonView}>
                <Text style={styles.buttonText}>{i18n.t('doc.button')}</Text>
            </View>
        </TouchableHighlight>
        :
        <TouchableHighlight style={[styles.button,{backgroundColor:'#cccccc'}]}>
            <View style={styles.buttonView}>
                <Text style={[styles.buttonText,{color:'gray'}]}>{i18n.t('doc.button')}</Text>
            </View>
        </TouchableHighlight>        
      }



        </ScrollView>

        <SwipeablePanel {...panelProps1} 
        isActive={isPanelActive1}>
        <View style={styles.panelView}>
          
      <Uploading done={done1} show={uploading1} text={i18n.t('doc.uploading')} text2={i18n.t('doc.uploaded')}/>

        <Text style={styles.subtitle}>{i18n.t('doc.panelsub1')}</Text>
        <View style={{flexDirection:'row'}}>
          
          <TouchableOpacity style={styles.photoButton} 
          onPress={()=>{
            setShow1(true);
            setShow2(false);                  
            setTimeout(() => {
                     setShow1(null)
                  }, 5000);
                  }}>
            <ImagePickerChooser onpress1={()=>{onCameraPress(1,1)}} onpress2={()=>{onGalleryPress(1,1)}} show={show1} />
            {
              img1==''?null:
              <Image source={img1} style={styles.img}/>
            }
            <Text style={styles.subtitle}>{i18n.t('doc.front')}</Text>
          </TouchableOpacity>

          
          <TouchableOpacity style={styles.photoButton}onPress={()=>{
            setShow2(true);
            setShow1(false);                  
            setTimeout(() => {
                     setShow2(null)
                  }, 5000);
                  }}>
          <ImagePickerChooser onpress1={()=>{onCameraPress(1,2)}} onpress2={()=>{onGalleryPress(1,2)}} show={show2} />
          {
              img2==''?null:
              <Image source={img2} style={styles.img}/>
            }
            <Text style={styles.subtitle}>{i18n.t('doc.back')}</Text>    
          </TouchableOpacity>

        </View>
        {
         img1=='' || img2==''  ? 
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
        <Text style={styles.subtitle}>{i18n.t('doc.panelsub2')}</Text>
        <View style={{flexDirection:'row'}}>
          
          <TouchableOpacity style={styles.photoButton}onPress={()=>{
            setShow3(true);
            setShow4(false);                  
            setTimeout(() => {
                     setShow3(null)
                  }, 5000);
                  }}>
          <ImagePickerChooser onpress1={()=>{onCameraPress(2,1)}} onpress2={()=>{onGalleryPress(2,1)}} show={show3} />
          {
              img3==''?null:
              <Image source={img3} style={styles.img}/>
            }
            <Text style={styles.subtitle}>{i18n.t('doc.front')}</Text>
          </TouchableOpacity>

          
          <TouchableOpacity style={styles.photoButton}onPress={()=>{
            setShow4(true);
            setShow3(false);                  
            setTimeout(() => {
                     setShow4(null)
                  }, 5000);
                  }}>
          <ImagePickerChooser onpress1={()=>{onCameraPress(2,2)}} onpress2={()=>{onGalleryPress(2,2)}} show={show4} />
            
          {
              img4==''?null:
              <Image source={img4} style={styles.img}/>
            }
            <Text style={styles.subtitle}>{i18n.t('doc.back')}</Text>    
          </TouchableOpacity>

        </View>
        
        {
         img3=='' || img4==''  ? 
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
        <Text style={styles.subtitle}>{i18n.t('doc.panelsub3')}</Text>
        <View style={{flexDirection:'row'}}>
          
          <TouchableOpacity style={styles.photoButton}onPress={()=>{
            setShow5(true);                  
            setTimeout(() => {
                     setShow5(null)
                  }, 5000);
                  }}>
          <ImagePickerChooser onpress1={()=>{onCameraPress(3,1)}} onpress2={()=>{onGalleryPress(3,1)}} show={show5} />
          {
              img5==''?null:
              <Image source={img5} style={styles.img}/>
            }
            <Text style={styles.subtitle}>{i18n.t('doc.panel31')}</Text>
          </TouchableOpacity>

          
          {/* <TouchableOpacity style={styles.photoButton}>
            <Text style={styles.subtitle}>{i18n.t('doc.back')}</Text>    
          </TouchableOpacity> */}

        </View>
        
        {
         img5==''  ? 
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

      <SwipeablePanel {...panelProps4} isActive={isPanelActive4}>
      <View style={styles.panelView}>
      <Uploading done={done4} show={uploading4} text={i18n.t('doc.uploading')} text2={i18n.t('doc.uploaded')}/>
        <Text style={styles.subtitle}>{i18n.t('doc.panelsub4')}</Text>
        <View style={{flexDirection:'row'}}>
          
          <TouchableOpacity style={styles.photoButton}onPress={()=>{
            setShow6(true);                  
            setTimeout(() => {
                     setShow6(null)
                  }, 5000);
                  }}>
          <ImagePickerChooser onpress1={()=>{onCameraPress(4,1)}} onpress2={()=>{onGalleryPress(4,1)}} show={show6} />
          {
              img6==''?null:
              <Image source={img6} style={styles.img}/>
            }
            <Text style={styles.subtitle}>{i18n.t('doc.41')}</Text>
          </TouchableOpacity>

          
          {/* <TouchableOpacity style={styles.photoButton}>
            <Text style={styles.subtitle}>{i18n.t('doc.back')}</Text>    
          </TouchableOpacity> */}

        </View>
        
        {
         img6==''  ? 
         <TouchableOpacity style={[styles.button,{marginTop:5,alignSelf:'flex-end',width:100,backgroundColor:'#cccccc'}]}>
          <View style={styles.buttonView}>
            <Text style={[styles.buttonText,{fontSize:14,color:'gray'}]}>Save</Text>
          </View>
          
        </TouchableOpacity>
        :
        <TouchableOpacity style={[styles.button,{marginTop:5,alignSelf:'flex-end',width:100}]} onPress={()=>save(4)}>
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