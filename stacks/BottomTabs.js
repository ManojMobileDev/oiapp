import React, { useEffect, useState ,useContext } from "react";
import { Text, View ,StatusBar,Platform,TouchableOpacity,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import i18n from 'i18n-js';

import en from '../translations/en.json';
import si from '../translations/zh.json';
import tm from '../translations/tm.json';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather'
import { lang } from "moment";
import Splash from "../screens/Splash";
import styles from "../styles/style";
import MyAccount from "../screens/MyAccount";
import MyPerformance from "../screens/MyPerformance";
import Inbox from "../screens/Inbox";

function PerformanceScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Performance!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function AccountScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Account!</Text>
      </View>
    );
  }

  function InboxScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Inbox!</Text>
      </View>
    );
  }

  function MyTabBar({ state, descriptors, navigation }) {

    

    return (
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

              const icon = options.tabBarIcon 
              const name = route.name

          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          const color = isFocused ? '#000' : '#222'
          const tintcolor = isFocused ? '#ED9939' : '#cccccc'
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{ flex: 1 }}
            >
                <View style={{alignItems:'center',padding:0,paddingBottom:10,paddingTop:5,justifyContent:'space-between'}}>
                    {name=='HomeTab'?
                    <View style={{height:30}}>
                    <Feather name="map" color={ color } size={22} />
                    </View>
                        :
                    name=='AccountTab'?
                    <View style={{height:30}}>
                    <MaterialCommunityIcons name="account-circle-outline" color={ color } size={25} />
                    </View>
                        :
                    name=='InboxTab'?
                    <View style={{height:30}}>
                    <Feather name="message-circle" color={ color } size={25} />
                    </View>
                        :
                    <View style={{height:30}}>
                    <Octicons name="meter" color={ color } size={22} />
                     </View>             
                    }

                    <Text style={{ color: color , paddingBottom:4}}>
                        {label}
                    </Text> 
                    <View style={{height:3,width:'100%',backgroundColor:tintcolor}} />
                </View>
              
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator 
    tabBar={(props) => <MyTabBar {...props} />}
    // detachInactiveScreens
        screenOptions={{
            headerShown:false,
            tabBarActiveTintColor: '#000',
            tabBarStyle:{height:60,shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            
            elevation: 5,backgroundColor:'#fff'},
            tabBarLabelStyle:{fontSize:14,marginBottom:5,fontFamily:'Poppins-Medium'}
        }} 
    >
            <Tab.Screen name="HomeTab" component={Home} 
              options={{
                tabBarLabel: i18n.t('home.map'),
                tabBarIcon: ({ color, size }) => (
                  <Feather name="map" color={color} size={size} />
                ),
                
                // tabBarBadge: 3,
              }}
              />

            <Tab.Screen name="AccountTab" component={MyAccount} 
              options={{
                tabBarLabel: i18n.t('home.account'),
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />
                ),
                
                // tabBarBadge: 3,
              }}
              />

            <Tab.Screen name="InboxTab" component={Inbox} 
              options={{
                tabBarLabel: i18n.t('home.inbox'),
                tabBarIcon: ({ color, size }) => (
                  <Feather name="message-circle" color={color} size={size} />
                ),
                
                // tabBarBadge: 3,
              }}
              />

            <Tab.Screen name="PerformanceTab" component={MyPerformance} 
              options={{
                tabBarLabel: i18n.t('home.performance'),
                tabBarIcon: ({ color, size }) => (
                  <Octicons name="meter" color={color} size={size} />
                ),
                
                // tabBarBadge: 3,
              }}
              />

      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

export default function BottomTabs() {




  const [language, setLanguage] = useState("");

  const getLanguage = async () => {
      try {
      const value = await AsyncStorage.getItem('language')
      if(value !== null) {
          setLanguage(value)
          console.log(value)

          i18n.locale = value;
          i18n.fallbacks = true;
          i18n.translations = { en, si, tm };
          // value previously stored
      }
      } catch(e) {
      // error reading value
      }
  } 
  
  React.useEffect(() => {
    console.log('done')
    getLanguage()
  },[]);

  return (
    <>
    {/* {
      language==''?
            <View style={styles.splashcontainer} onLayout={()=>getLanguage()}>
        <Image source={require('../assets/images/logo.jpeg')} 
        style={{width:115,height:115}} />
    </View>: */}
      <MyTabs />
    {/* } */}
    </>
  );
}