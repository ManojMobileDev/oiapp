import React, { useEffect, useState ,useRef} from "react";
import {TouchableHighlight, Text, View, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from '../styles/style';
import * as Animatable from 'react-native-animatable';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WhiteCircle = ({
  icon,
}) => {


  return (
    <Animatable.View animation={'fadeIn'} style={[styles.circleOut,{backgroundColor:'rgba(255,255,255,0.17)'}]}>
        <Animatable.View delay={300} animation={'bounceIn'}  style={[styles.circle,{backgroundColor:'rgba(255,255,255,0.17)'}]}>
        <LinearGradient start={{x: 0.5, y: 0}} end={{x: 0.7, y: 1}} colors={['#fff', '#fff']} style={[styles.circle,{backgroundColor:'#fff'}]}>
            <Animatable.View delay={600} animation={'zoomIn'}>
                {icon} 
            </Animatable.View> 
        </LinearGradient>      
        </Animatable.View> 
    </Animatable.View>

  );
};
export default WhiteCircle;