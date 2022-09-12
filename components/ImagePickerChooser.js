import React, { useEffect, useState ,useRef} from "react";
import {TouchableHighlight, Text, View, Dimensions,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from '../styles/style';
import * as Animatable from 'react-native-animatable';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ImagePickerChooser = ({
  onpress1,
  onpress2,
  show
}) => {


  return (
    show==true?
    <Animatable.View animation={'fadeIn'} style={styles.chooser}>
         <TouchableOpacity style={styles.camera} onPress={onpress1}>
            <Ionicons 
                name="camera" 
                size={25} 
                color="white" 
                style={{zIndex:2}}/>
         </TouchableOpacity>

         <TouchableOpacity style={styles.camera} onPress={onpress2}>
            <Ionicons 
                name="image-sharp" 
                size={25} 
                color="white" 
                style={{zIndex:2}}/>
         </TouchableOpacity>
    </Animatable.View>
    :
    null
    
  );
};
export default ImagePickerChooser;