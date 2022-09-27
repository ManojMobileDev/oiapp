import { View, Text, StatusBar, Platform, Dimensions ,TouchableOpacity,Image} from 'react-native'
import React, { useEffect, useState ,useContext, useRef } from "react";
import styles from '../styles/style'
import { OIContext } from '../context/Context';
import Header from '../components/Header';
import { DrawerActions } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/dist/Feather';

import MapView, { PROVIDER_GOOGLE ,Marker,AnimatedRegion }  from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import RBSheet from "react-native-raw-bottom-sheet";
import i18n from 'i18n-js';
import firestore from '@react-native-firebase/firestore';
import Geolocation from 'react-native-geolocation-service';
// import Geolocation from '@react-native-community/geolocation';
import {  PermissionsAndroid } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Home() {

    const [online, setOnline] = useState(true); 
    
    const [bg, setBg] = useState('green');
    const [coords, setCoods] = useState(null); 
    const [realcoords, setRealCoods] = useState(null); 
    const [marker, setMarker] = useState(null);

    const navigation = useNavigation();

    const context = useContext(OIContext)

    const refRBSheet = useRef();
    const refRBSheet2 = useRef();

    const toggleOnline =()=>{


        firestore()
        .collection('users')
        .doc(context.mobile)
        .update({online:!online})
        .then(() => {
            // console.log('updated')
            setOnline(!online)
        })
    }

    const vehicleCollection = firestore().collection('vehicles');

    const getVehicle =()=>{
        firestore()
        .collection('vehicleDetails')
        .doc(context.mobile)
        .get()
        .then(documentSnapshot => {
        
            if (documentSnapshot.exists) {
                var data = documentSnapshot.data()
                firestore()
                .collection('vehicles')
                .doc(data.vehicle)
                .get()
                .then(documentSnapshot => {
                
                    if (documentSnapshot.exists) {
                        var data2 = documentSnapshot.data()
                        console.log(data2)
                        setMarker(data2.imgdark)
                    }
                  });
                
            }
          });
    }

     const requestPermissions =async()=> {
        if (Platform.OS === 'ios') {
          const auth = await Geolocation.requestAuthorization("whenInUse");
          if(auth === "granted") {
            getLocation()
        }
        }
      
        if (Platform.OS === 'android') {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            // console.log(PermissionsAndroid.RESULTS)
          );
          
          if ('granted' === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation()          }
        }
      }

      const getLocation=()=>{
        Geolocation.getCurrentPosition(
            (position) => {
            //   console.log(position);
              setCoods(position.coords)
              setRealCoods(position.coords)
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }

    const getCurrent =()=>{
        // navigator.geolocation.watchPosition(
        //     position => {
        //      console.log(position);
        //     }, 
        //     error => console.log(error),
        //     { 
        //       enableHighAccuracy: true,
        //       timeout: 20000,
        //       maximumAge: 1000,
        //       distanceFilter: 10
        //     }
        //    );

        //    navigator.geolocation.getCurrentPosition(
        //     position => {
        //       console.log(position);

        //     })
        console.log(navigator)
    }
    //   const getLocation = () => {
    //     Geolocation.getCurrentPosition(
    //       (pos) => {
    //         setCoods(pos.coords);
    //       },
    //       (error) => console.log('GetCurrentPosition Error', JSON.stringify(error)),
    //       { enableHighAccuracy: true }
    //     );
    //   };


    useEffect(() => {
        requestPermissions()
        getVehicle()
        // getCurrent()
    },[]);

  return (
    <View style={[styles.container,{padding:0}]} onLayout={()=>getVehicle()}>
        <StatusBar
            animated={true}
            backgroundColor="#fff"
            barStyle={'dark-content'}
            hidden={false} />

            {
                coords==null?
                null
                :
                <MapView
                provider={PROVIDER_GOOGLE}
                style={{flex:1}}
                region={{
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                }}
                
                onUserLocationChange={event => {
                    setRealCoods(event.nativeEvent.coordinate);
                    console.log(event.nativeEvent)
                }}
                mapType='standard'
                showsUserLocation={true} 
                // followUserLocation
                loadingEnabled
                followsUserLocation={true}
                
                >
                    {realcoords==null?
                    null
                    :
                        <Marker
                            key={1}
                            coordinate={{ latitude : realcoords.latitude , longitude : realcoords.longitude }}
                            title={'Me'}
                            onPress={(click)=>{console.log('click')}}
                            hideCallout
                            // image={{uri:marker}}
                            flat={true}
                            // description={'rest esc'}
                        />                    
                     } 


                </MapView>               
            }


        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={windowHeight/2}
            customStyles={{
            wrapper: {
                backgroundColor: "rgba(0,0,0,0.2)"
            },
            draggableIcon: {
                backgroundColor: "#000",
                marginTop:0
            },
            container: {
                borderTopLeftRadius:50,
                borderTopRightRadius:50,
                padding:15,
                alignItems:'center'
            },
            }}
        >
        <View>
            <Text style={[styles.title,{fontSize:18}]}>{i18n.t('home.quick')}</Text>
            <View style={styles.quickmenu}>
                
                <TouchableOpacity 
                onPress={()=>{navigation.navigate('MyIncentive');refRBSheet.current.close()}}
                style={styles.menuitem}>
                    <View style={{alignItems:'center'}}>
                        <MaterialCommunityIcons name="bullhorn-outline" size={35} color={'black'} />
                        <Text style={[styles.question,{textAlign:'center'}]}>{i18n.t('home.incentive')}</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                onPress={()=>{navigation.navigate('MyMainProgram');refRBSheet.current.close()}}
                style={styles.menuitem}>
                    <View style={{alignItems:'center'}}>
                        <MaterialCommunityIcons name="trophy-outline" size={35} color={'black'} />
                        <Text style={[styles.question,{textAlign:'center'}]}>{i18n.t('home.main')}</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                onPress={()=>{navigation.navigate('DirectionalHire');refRBSheet.current.close()}}
                style={styles.menuitem}>
                    <View style={{alignItems:'center'}}>
                        <MaterialCommunityIcons name="arrow-left-right-bold-outline" size={35} color={'black'} />
                        <Text style={[styles.question,{textAlign:'center'}]}>{i18n.t('home.directional')}</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                onPress={()=>{navigation.navigate('RoadPickup');refRBSheet.current.close()}}
                style={styles.menuitem}>
                    <View style={{alignItems:'center'}}>
                        <MaterialCommunityIcons name="walk" size={35} color={'black'} />
                        <Text style={[styles.question,{textAlign:'center'}]}>{i18n.t('home.road')}</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                onPress={()=>{navigation.navigate('NoticeBoard');refRBSheet.current.close()}}
                style={styles.menuitem}>
                    <View style={{alignItems:'center'}}>
                        <MaterialCommunityIcons name="bell-outline" size={35} color={'black'} />
                        <Text style={[styles.question,{textAlign:'center'}]}>{i18n.t('home.notice')}</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                onPress={()=>{navigation.navigate('SuportService');refRBSheet.current.close()}}
                style={styles.menuitem}>
                    <View style={{alignItems:'center'}}>
                        <MaterialCommunityIcons name="help-circle-outline" size={35} color={'black'} />
                        <Text style={[styles.question,{textAlign:'center'}]}>{i18n.t('home.support')}</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
      </RBSheet>

      <RBSheet
            ref={refRBSheet2}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={windowHeight/2}
            customStyles={{
            wrapper: {
                backgroundColor: "rgba(0,0,0,0.2)"
            },
            draggableIcon: {
                backgroundColor: "#000",
                marginTop:0
            },
            container: {
                borderTopLeftRadius:50,
                borderTopRightRadius:50,
                padding:15,
                alignItems:'center'
            },
            }}
        >
        <View>
            {
                marker==null?
                null:
                <View>
                    <Image source={{uri:marker.imgdark}} style={{width:50,height:30,resizeMode:'contain'}}/> 
                    <Text style={styles.question}>{marker.type}</Text>
                </View>
                        
            }
            <View style={styles.hr}/>
            <View >
                <Text style={styles.question}>{i18n.t('request.pickup')}</Text>
                
                <Text style={styles.question}>{i18n.t('request.drop')}</Text>

            </View>
        </View>
      </RBSheet>


        <View style={styles.absoluteContainer}>

             
            <View style={styles.row}>

                <TouchableOpacity style={styles.menu} onPress={()=>{navigation.dispatch(DrawerActions.openDrawer())}}>
                    <Image source={require('../assets/images/menu.png')} style={{width:16,height:16}} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.menu,{backgroundColor:online?'green':'red'}]} onPress={()=>{toggleOnline()}}>
                    <View>
                        {
                            online?
                            <Text style={[styles.buttonText,{paddingHorizontal:10}]}>{i18n.t('home.online')}</Text>
                            :
                            <Text style={[styles.buttonText,{paddingHorizontal:10}]}>{i18n.t('home.offline')}</Text>
                        }
                        {/* <Text>{coords.latitude}</Text> */}
                        {/* <Text>{JSON.stringify(coords)}</Text> */}
                    </View>
                </TouchableOpacity>

                    <TouchableOpacity style={[styles.menu,{padding:4}]} onPress={()=>{refRBSheet.current.open()}}>
                        <Image source={require('../assets/images/wheel.png')} style={{width:30,height:30}} />
                    </TouchableOpacity>

            </View>
            <View style={styles.row}>

                <TouchableOpacity style={[styles.menu,{padding:7,borderRadius:0}]} onPress={()=>{refRBSheet2.current.open()}}>
                    <View style={styles.row}>
                        <Ionicons name={'refresh'} size={17} color={'black'}/>
                        <Text style={styles.question}>  {i18n.t('home.refresh')}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.menu,{padding:7,borderRadius:0}]} onPress={()=>{getLocation()}}>
                    <Image source={require('../assets/images/direction.png')} style={{width:23,height:23}} />

                </TouchableOpacity>
                
            </View>
        </View>

    </View>
  )
}