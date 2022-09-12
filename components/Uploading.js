import React, { useEffect, useState ,useRef} from "react";
import {TouchableHighlight, Text, View, Dimensions,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Octicons from 'react-native-vector-icons/Octicons';

import styles from '../styles/style';
import * as Animatable from 'react-native-animatable';
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Uploading = ({
  text,
  done,
  text2,
  show
}) => {


  return (
    show==true?
    <Animatable.View animation={'fadeIn'} style={styles.panelLoadingView}>
        {
            !done?
            <View style={{justifyContent:'center',height:50,margin:15}}>
                <Octicons name="check-circle" color='black' size={50}/>
            </View>
                :
            <Animatable.View animation={'bounceIn'} style={{justifyContent:'center',height:50,margin:15}}>
                <MaterialIndicator color='black' size={50}/>
            </Animatable.View>

        }
        {
            done?
            <Animatable.Text style={[styles.subtitle,{color:'black'}]} animation={'flash'} duration={2000} easing="ease-out" iterationCount="infinite">{text}</Animatable.Text>
            :
            <Text style={[styles.subtitle,{color:'black'}]}>{text2}</Text>
        }
        
    </Animatable.View>
    :
    null
    
  );
};
export default Uploading;