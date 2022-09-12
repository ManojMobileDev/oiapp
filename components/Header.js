import React, { useEffect, useState ,useRef} from "react";
import {TouchableHighlight, Text, View, Dimensions, TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Header = ({
  title,
  subTitle,
  headerColor,
  back,
  menu
}) => {

        
  const navigation = useNavigation();

  return (
    <View style={[styles.menubar,{backgroundColor:headerColor}]}>
        {
            back?
            <TouchableOpacity  onPress={()=>navigation.goBack()} style={{zIndex:999,backgroundColor:'white'}} >
              <AntDesign name="arrowleft" size={25} color="#000"/>
            </TouchableOpacity>
            :null
        }
        {
            menu?
            
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{zIndex:999}}>
            <Foundation name="align-right" size={25} color="#000" />
          </TouchableOpacity>
            :null
        }
        
        <Text style={styles.title}>{title}</Text>
    </View>
  );
};
export default Header;