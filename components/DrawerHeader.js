import React, { useEffect, useState ,useRef} from "react";
import {Image, Text, View, Dimensions, TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DrawerHeader = ({
  title,
  subTitle,
  headerColor,
  back,
  menu
}) => {

        
  const navigation = useNavigation();

  return (
    <View style={[styles.menubar,{backgroundColor:headerColor,justifyContent:'flex-start'}]}>
        {
            back?
            <TouchableOpacity  onPress={()=>navigation.goBack()} style={{zIndex:999,backgroundColor:'white'}} >
              <AntDesign name="arrowleft" size={25} color="#000"/>
            </TouchableOpacity>
            :null
        }
        {
            menu?
            
            <TouchableOpacity style={styles.headermenu} onPress={()=>{navigation.dispatch(DrawerActions.openDrawer())}}>
                <Image source={require('../assets/images/menu.png')} style={{width:16,height:16}} />
            </TouchableOpacity>
            :null
        }
        
        <Text style={[styles.title,{paddingLeft:15,fontSize:20}]}>{title}</Text>
    </View>
  );
};
export default DrawerHeader;