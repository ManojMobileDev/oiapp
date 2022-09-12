import { View, Text, Modal, Dimensions, ActivityIndicator} from 'react-native'
import React from 'react'

import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/style';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Response = ({
    modalVisible,
    title,
    subtitle,
    state
}) => {
  return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible} 
            statusBarTranslucent        
            onRequestClose={() => {
                alert("Modal has been closed.")
              }}
            >
                <View style={{alignItems:'center',justifyContent:'center',flex:1,backgroundColor:'rgba(0,0,0,0.15)'}} >
                
                <View style={{backgroundColor:state==0?'#8F9498':state==1?'red':'green',height:10,width:windowWidth-60,borderTopRightRadius:10,borderTopLeftRadius:10,marginBottom:-25,zIndex:2,alignItems:'center',justifyContent: 'center',}} >
                </View>

                <View style={{backgroundColor:state==0?'#8F9498':state==1?'red':'green',width:50,height:50,borderRadius:50,marginBottom:-25,zIndex:2,alignItems:'center',justifyContent: 'center',}} >
            {
            state==0?
            <ActivityIndicator color={'#fff'} size={35} />
            :
            state==1?
            <Animatable.View animation={'bounceIn'}>
            <Ionicons 
                name="close-circle-outline" 
                size={40} 
                color="white" 
                style={{zIndex:2,marginLeft:1}}
                // onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
             />     
             </Animatable.View>
                          
             :
             <Animatable.View animation={'bounceIn'}>
                <Ionicons 
                    name="checkmark-circle-outline" 
                    size={40} 
                    color="white" 
                    style={{zIndex:2,marginLeft:1}}
                    // onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                />                  
             </Animatable.View>

            }
        </View>
                    <View style={{backgroundColor:'white',paddingTop:35,width:windowWidth-60,borderBottomLeftRadius:10,borderBottomRightRadius:10,padding:15,alignItems:'center'}}>
                        <Text style={styles.minititle}>{title}</Text>
                        <Text style={styles.subtitle}>{subtitle}</Text>
                    </View>                    
                </View>

        </Modal>
  )
}

export default Response;