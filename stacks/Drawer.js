import * as React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Home from '../screens/Home';
import BottomTabs from './BottomTabs';
import MyAccount from '../screens/MyAccount'
import AccountSummery from '../screens/AccountSummery'
import RevenueStatement from '../screens/RevenueStatement'
import MyIncentive from '../screens/MyIncentive'
import BoostTimetable from '../screens/BoostTimetable'
import InviteFriends from '../screens/InviteFriends'

import MyPerformance from '../screens/MyPerformance'
import MyMainProgram from '../screens/MyMainProgram'
import OnlineTraining from '../screens/OnlineTraining'

import TripList from '../screens/TripList'
import PreviousTrip from '../screens/PreviousTrip'
import SelectService from '../screens/SelectService'
import JobBoard from '../screens/JobBoard'

import NoticeBoard from '../screens/NoticeBoard'
import SuportService from '../screens/SuportService'
import Demo from '../screens/Demo'
import DriverAssistance from '../screens/DriverAssistance'
import PlaceOfPayment from '../screens/PlaceOfPayment'

import DirectionalHire from '../screens/DirectionalHire'
import RoadPickup from '../screens/RoadPickup'

import LanguageSelect from '../screens/LanguageSelect';
import styles from '../styles/style';
import LinearGradient from 'react-native-linear-gradient';
import storage from '@react-native-firebase/storage';
import { OIContext } from '../context/Context';
import firestore from '@react-native-firebase/firestore';
import { Collapse , CollapseHeader , CollapseBody } from 'accordion-collapse-react-native';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/dist/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import i18n from 'i18n-js';

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}
function CustomDrawerContent(props) {

  const context = React.useContext(OIContext)
  // const isFocused = useIsFocused();
  
  const [imageurl, setImageUrl] = React.useState('');
  const [focused, setFocused] = React.useState(0);
  const [colls, setColls] = React.useState(false);
  const [colls2, setColls2] = React.useState(false);
  const [colls3, setColls3] = React.useState(false);
  const [colls4, setColls4] = React.useState(false);
  const [colls5, setColls5] = React.useState(false);

  React.useEffect(() => {
    const subscriber = firestore()
      .collection('docs')
      .doc(context.mobile)
      .onSnapshot(documentSnapshot => {
        var data = documentSnapshot.data()
        // console.log(documentSnapshot.data())
        data==undefined?
        null
        :
          storage()
          .ref( data.profilePic) //name in storage in firebase console
          .getDownloadURL()
          .then((url) => {
            setImageUrl(url);
            // console.log(url)
          })
          .catch((e) => console.log('Errors while downloading => ', e));
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [imageurl,context.mobile]);

  return (
    <DrawerContentScrollView style={{backgroundColor:'#FFCE31'}} {...props}>
      <LinearGradient start={{x: 1, y: 1}} end={{x: 1, y: 0}} 
      colors={['#ED9939', '#FFCE31']} style={styles.drawerLinearView}>
        <View style={styles.drawerTopView}>
          {
            imageurl==''?
            null:
            <Image source={{uri:imageurl}} style={{width:60,height:60,borderRadius:50}} />
          }
          
            {
              context.user==[]?
              <Text>--</Text>
              :
              <View style={{paddingLeft:10}}>
              <Text style={styles.username}>{context.user.first_name} {context.user.last_name}</Text>
              <Text style={[styles.username,{fontSize:12}]}>{context.user.email} </Text>
              </View>
            }
          
          
        </View>
        <View style={{backgroundColor:'gray',height:1,width:'90%',marginVertical:5,alignSelf:'center'}} />
      {/* <DrawerItemList {...props} /> */}            
      <ScrollView contentContainerStyle={{paddingBottom:60}}>
      <TouchableHighlight 
      onPress={()=>{props.navigation.navigate('HomeScreen');setFocused(0)}}
      style={[styles.drawerItem,{backgroundColor:focused==0?'rgba(255,255,255,0.25)':'transparent'}]} 
      underlayColor={'rgba(255,255,255,0.2)'}
      >
            <View style={styles.row}>
                    <Octicons name="home" size={20} color={'black'} />
                    <Text style={styles.drawerText}>{i18n.t('drawer.1')}</Text>
                </View>
            </TouchableHighlight>
            
      <Collapse isExpanded={false} onToggle={(isExpanded)=>setColls(isExpanded)}	>
            <CollapseHeader>
              <View style={styles.drawerItem}>
                <View style={styles.row}>
                  <MaterialIcons name="payment" size={20} color={'black'} />
                  <Text style={styles.drawerText}>{i18n.t('drawer.2')}</Text>
                </View>
                
                {!colls?<FontAwesome name="angle-down" size={22} color={'black'} />:<FontAwesome name="angle-up" size={22} color={'black'}/>}  
              </View>
            </CollapseHeader>
            <CollapseBody>
            <TouchableHighlight
      onPress={()=>{props.navigation.navigate('MyAccount');setFocused(21)}}
      style={[styles.drawerItem,{backgroundColor:focused==21?'rgba(255,255,255,0.25)':'transparent'}]} 
      underlayColor={'rgba(255,255,255,0.2)'}
      >
            <View style={[styles.row,{paddingLeft:30}]}>
                  {/* <Text>hhh</Text> */}
                  <Text style={styles.drawerText}>{i18n.t('drawer.21')}</Text>
                </View>
            </TouchableHighlight>

            
            <TouchableHighlight
      onPress={()=>{props.navigation.navigate('AccountSummery');setFocused(22)}}
      style={[styles.drawerItem,{backgroundColor:focused==22?'rgba(255,255,255,0.25)':'transparent'}]} 
      underlayColor={'rgba(255,255,255,0.2)'}
      >
        <View style={[styles.row,{paddingLeft:30}]}>
                  {/* <Text>hhh</Text> */}
                  <Text style={styles.drawerText}>{i18n.t('drawer.22')}</Text>
                </View>
            </TouchableHighlight>


            <TouchableHighlight
      onPress={()=>{props.navigation.navigate('RevenueStatement');setFocused(23)}}
      style={[styles.drawerItem,{backgroundColor:focused==23?'rgba(255,255,255,0.25)':'transparent'}]} 
      underlayColor={'rgba(255,255,255,0.2)'}
      >
                    <View style={[styles.row,{paddingLeft:30}]}>
                  {/* <Text>hhh</Text> */}
                  <Text style={styles.drawerText}>{i18n.t('drawer.23')}</Text>
                </View>
            </TouchableHighlight>

            </CollapseBody>
          </Collapse> 

      <Collapse isExpanded={false} onToggle={(isExpanded)=>setColls2(isExpanded)}	>
            <CollapseHeader>
              <View style={styles.drawerItem}>
                <View style={styles.row}>
                  <MaterialCommunityIcons name="trophy-outline" size={20} color={'black'} />
                  <Text style={styles.drawerText}>{i18n.t('drawer.3')}</Text>
                </View>
                
                {!colls2?<FontAwesome name="angle-down" size={22} color={'black'} />:<FontAwesome name="angle-up" size={22} color={'black'}/>}  
              </View>
            </CollapseHeader>
            <CollapseBody>

            <TouchableHighlight
      onPress={()=>{props.navigation.navigate('MyIncentive');setFocused(3)}}
      style={[styles.drawerItem,{backgroundColor:focused==3?'rgba(255,255,255,0.25)':'transparent'}]} 
      underlayColor={'rgba(255,255,255,0.2)'}
      >            
      <View style={[styles.row,{paddingLeft:30}]}>
                  {/* <Text>hhh</Text> */}
                  <Text style={styles.drawerText}>{i18n.t('drawer.3')}</Text>
                </View>
            </TouchableHighlight>


            <TouchableHighlight
      onPress={()=>{props.navigation.navigate('BoostTimetable');setFocused(31)}}
      style={[styles.drawerItem,{backgroundColor:focused==31?'rgba(255,255,255,0.25)':'transparent'}]} 
      underlayColor={'rgba(255,255,255,0.2)'}
      >
                    <View style={[styles.row,{paddingLeft:30}]}>
                  {/* <Text>hhh</Text> */}
                  <Text style={styles.drawerText}>{i18n.t('drawer.31')}</Text>
                </View>
            </TouchableHighlight>


            <TouchableHighlight
      onPress={()=>{props.navigation.navigate('InviteFriends');setFocused(32)}}
      style={[styles.drawerItem,{backgroundColor:focused==32?'rgba(255,255,255,0.25)':'transparent'}]} 
      underlayColor={'rgba(255,255,255,0.2)'}
      >
                    <View style={[styles.row,{paddingLeft:30}]}>
                  {/* <Text>hhh</Text> */}
                  <Text style={styles.drawerText}>{i18n.t('drawer.32')}</Text>
                </View>
            </TouchableHighlight>

            </CollapseBody>
          </Collapse> 

     <Collapse isExpanded={false} onToggle={(isExpanded)=>setColls3(isExpanded)}	>
            <CollapseHeader>
              <View style={styles.drawerItem}>
                <View style={styles.row}>
                  <Octicons name="meter" size={20} color={'black'} />
                  <Text style={styles.drawerText}>{i18n.t('drawer.4')}</Text>
                </View>
                
                {!colls3?<FontAwesome name="angle-down" size={22} color={'black'} />:<FontAwesome name="angle-up" size={22} color={'black'}/>}  
              </View>
            </CollapseHeader>
            <CollapseBody>

            <TouchableHighlight
      onPress={()=>{props.navigation.navigate('MyPerformance');setFocused(41)}}
      style={[styles.drawerItem,{backgroundColor:focused==41?'rgba(255,255,255,0.25)':'transparent'}]} 
      underlayColor={'rgba(255,255,255,0.2)'}
      >
                    <View style={[styles.row,{paddingLeft:30}]}>
                  {/* <Text>hhh</Text> */}
                  <Text style={styles.drawerText}>{i18n.t('drawer.41')}</Text>
                </View>
            </TouchableHighlight>


            <TouchableHighlight
      onPress={()=>{props.navigation.navigate('MyMainProgram');setFocused(42)}}
      style={[styles.drawerItem,{backgroundColor:focused==42?'rgba(255,255,255,0.25)':'transparent'}]} 
      underlayColor={'rgba(255,255,255,0.2)'}
      >
                    <View style={[styles.row,{paddingLeft:30}]}>
                  {/* <Text>hhh</Text> */}
                  <Text style={styles.drawerText}>{i18n.t('drawer.42')}</Text>
                </View>
            </TouchableHighlight>


            <TouchableHighlight
      onPress={()=>{props.navigation.navigate('OnlineTraining');setFocused(43)}}
      style={[styles.drawerItem,{backgroundColor:focused==43?'rgba(255,255,255,0.25)':'transparent'}]} 
      underlayColor={'rgba(255,255,255,0.2)'}
      >
                    <View style={[styles.row,{paddingLeft:30}]}>
                  {/* <Text>hhh</Text> */}
                  <Text style={styles.drawerText}>{i18n.t('drawer.43')}</Text>
                </View>
            </TouchableHighlight>

            </CollapseBody>
          </Collapse> 

     <Collapse isExpanded={false} onToggle={(isExpanded)=>setColls4(isExpanded)}	>
            <CollapseHeader>
              <View style={styles.drawerItem}>
                <View style={styles.row}>
                  <MaterialCommunityIcons name="train-car" size={20} color={'black'} />
                  <Text style={styles.drawerText}>{i18n.t('drawer.5')}</Text>
                </View>
                
                {!colls4?<FontAwesome name="angle-down" size={22} color={'black'} />:<FontAwesome name="angle-up" size={22} color={'black'}/>}  
              </View>
            </CollapseHeader>
            <CollapseBody>

            <TouchableHighlight
      onPress={()=>{props.navigation.navigate('TripList');setFocused(51)}}
      style={[styles.drawerItem,{backgroundColor:focused==51?'rgba(255,255,255,0.25)':'transparent'}]} 
      underlayColor={'rgba(255,255,255,0.2)'}
      >
                    <View style={[styles.row,{paddingLeft:30}]}>
                  {/* <Text>hhh</Text> */}
                  <Text style={styles.drawerText}>{i18n.t('drawer.51')}</Text>
                </View>
            </TouchableHighlight>


            <TouchableHighlight
      onPress={()=>{props.navigation.navigate('PreviousTrip');setFocused(52)}}
      style={[styles.drawerItem,{backgroundColor:focused==52?'rgba(255,255,255,0.25)':'transparent'}]} 
      underlayColor={'rgba(255,255,255,0.2)'}
      >
                    <View style={[styles.row,{paddingLeft:30}]}>
                  {/* <Text>hhh</Text> */}
                  <Text style={styles.drawerText}>{i18n.t('drawer.52')}</Text>
                </View>
            </TouchableHighlight>


            <TouchableHighlight
      onPress={()=>{props.navigation.navigate('SelectService');setFocused(53)}}
      style={[styles.drawerItem,{backgroundColor:focused==53?'rgba(255,255,255,0.25)':'transparent'}]} 
      underlayColor={'rgba(255,255,255,0.2)'}
      >
                    <View style={[styles.row,{paddingLeft:30}]}>
                  {/* <Text>hhh</Text> */}
                  <Text style={styles.drawerText}>{i18n.t('drawer.53')}</Text>
                </View>
            </TouchableHighlight>


            <TouchableHighlight
      onPress={()=>{props.navigation.navigate('JobBoard');setFocused(54)}}
      style={[styles.drawerItem,{backgroundColor:focused==54?'rgba(255,255,255,0.25)':'transparent'}]} 
      underlayColor={'rgba(255,255,255,0.2)'}
      >
                    <View style={[styles.row,{paddingLeft:30}]}>
                  {/* <Text>hhh</Text> */}
                  <Text style={styles.drawerText}>{i18n.t('drawer.54')}</Text>
                </View>
            </TouchableHighlight>

            </CollapseBody>
          </Collapse> 


     <Collapse isExpanded={false} onToggle={(isExpanded)=>setColls5(isExpanded)}	>
            <CollapseHeader>
              <View style={styles.drawerItem}>
                <View style={styles.row}>
                  <Feather name="info" size={20} color={'black'} />
                  <Text style={styles.drawerText}>{i18n.t('drawer.6')}</Text>
                </View>
                
                {!colls5?<FontAwesome name="angle-down" size={22} color={'black'} />:<FontAwesome name="angle-up" size={22} color={'black'}/>}  
              </View>
            </CollapseHeader>
            <CollapseBody>

            <TouchableHighlight
      onPress={()=>{props.navigation.navigate('NoticeBoard');setFocused(61)}}
      style={[styles.drawerItem,{backgroundColor:focused==61?'rgba(255,255,255,0.25)':'transparent'}]} 
      underlayColor={'rgba(255,255,255,0.2)'}
      >
                    <View style={[styles.row,{paddingLeft:30}]}>
                  {/* <Text>hhh</Text> */}
                  <Text style={styles.drawerText}>{i18n.t('drawer.61')}</Text>
                </View>
            </TouchableHighlight>


            <TouchableHighlight
      onPress={()=>{props.navigation.navigate('SuportService');setFocused(62)}}
      style={[styles.drawerItem,{backgroundColor:focused==62?'rgba(255,255,255,0.25)':'transparent'}]} 
      underlayColor={'rgba(255,255,255,0.2)'}
      >
                    <View style={[styles.row,{paddingLeft:30}]}>
                  {/* <Text>hhh</Text> */}
                  <Text style={styles.drawerText}>{i18n.t('drawer.62')}</Text>
                </View>
            </TouchableHighlight>


            <TouchableHighlight
      onPress={()=>{props.navigation.navigate('Demo');setFocused(63)}}
      style={[styles.drawerItem,{backgroundColor:focused==63?'rgba(255,255,255,0.25)':'transparent'}]} 
      underlayColor={'rgba(255,255,255,0.2)'}
      >
                    <View style={[styles.row,{paddingLeft:30}]}>
                  {/* <Text>hhh</Text> */}
                  <Text style={styles.drawerText}>{i18n.t('drawer.63')}</Text>
                </View>
            </TouchableHighlight>


            <TouchableHighlight
      onPress={()=>{props.navigation.navigate('DriverAssistance');setFocused(64)}}
      style={[styles.drawerItem,{backgroundColor:focused==64?'rgba(255,255,255,0.25)':'transparent'}]} 
      underlayColor={'rgba(255,255,255,0.2)'}
      >
                    <View style={[styles.row,{paddingLeft:30}]}>
                  {/* <Text>hhh</Text> */}
                  <Text style={styles.drawerText}>{i18n.t('drawer.64')}</Text>
                </View>
            </TouchableHighlight>


            <TouchableHighlight
      onPress={()=>{props.navigation.navigate('PlaceOfPayment');setFocused(65)}}
      style={[styles.drawerItem,{backgroundColor:focused==65?'rgba(255,255,255,0.25)':'transparent'}]} 
      underlayColor={'rgba(255,255,255,0.2)'}
      >
                    <View style={[styles.row,{paddingLeft:30}]}>
                  {/* <Text>hhh</Text> */}
                  <Text style={styles.drawerText}>{i18n.t('drawer.65')}</Text>
                </View>
            </TouchableHighlight>

            </CollapseBody>
          </Collapse>           
          </ScrollView>

          <View style={{position:'absolute',bottom:0,left:0,width:'100%'}}>
          <View style={{backgroundColor:'gray',height:1,width:'90%',marginTop:5,marginBottom:-5,alignSelf:'center'}} />

          <TouchableHighlight 
          onPress={()=>props.navigation.navigate('Logout')}
          style={[styles.button,{alignSelf:'center',width:'60%'}]} 
          underlayColor={'gray'}>
            <View style={styles.buttonView}>
            <MaterialCommunityIcons name="logout-variant" size={20} color={'white'} />
                  <Text style={styles.buttonText}>{i18n.t('drawer.7')}</Text>
                </View>
            </TouchableHighlight>
          </View>
      </LinearGradient>
    </DrawerContentScrollView>
  );
}
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator 
    useLegacyImplementation 
    screenOptions={{headerShown:false}}
    drawerContent={(props) => <CustomDrawerContent {...props} />
  
  }
    >
      <Drawer.Screen name="HomeScreen" component={BottomTabs} />
      <Drawer.Screen name="MyAccount" component={MyAccount} />
      <Drawer.Screen name="AccountSummery" component={AccountSummery} />
      <Drawer.Screen name="RevenueStatement" component={RevenueStatement} />

      <Drawer.Screen name="MyIncentive" component={MyIncentive} />
      <Drawer.Screen name="BoostTimetable" component={BoostTimetable} />
      <Drawer.Screen name="InviteFriends" component={InviteFriends} />

      <Drawer.Screen name="MyPerformance" component={MyPerformance} />
      <Drawer.Screen name="MyMainProgram" component={MyMainProgram} />
      <Drawer.Screen name="OnlineTraining" component={OnlineTraining} />

      <Drawer.Screen name="TripList" component={TripList} />
      <Drawer.Screen name="PreviousTrip" component={PreviousTrip} />
      <Drawer.Screen name="SelectService" component={SelectService} />
      <Drawer.Screen name="JobBoard" component={JobBoard} />

      <Drawer.Screen name="NoticeBoard" component={NoticeBoard} />
      <Drawer.Screen name="SuportService" component={SuportService} />
      <Drawer.Screen name="Demo" component={Demo} />
      <Drawer.Screen name="DriverAssistance" component={DriverAssistance} />
      <Drawer.Screen name="PlaceOfPayment" component={PlaceOfPayment} />

      <Drawer.Screen name="DirectionalHire" component={DirectionalHire} />
      <Drawer.Screen name="RoadPickup" component={RoadPickup} />

      <Drawer.Screen name="Logout" component={LanguageSelect} />
    </Drawer.Navigator>
  );
}

export default function MainDrawer() {
  return (
    <>
      <MyDrawer />
    </>
  );
}