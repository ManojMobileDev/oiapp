import React, { useEffect, useState ,useRef} from "react";
import {TouchableHighlight,FlatList, Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style';
import * as Animatable from 'react-native-animatable';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Picker = ({
    data,
    onPress,
    click,
    state,
    avatar,
}) => {

    const [click2, setClick2] = useState(false);
  return (
      <View>
            {
                click2?
                <TouchableOpacity onPress={()=>setClick2(false)}>
                    <FontAwesome name='angle-up' size={25} color={'black'} style={{paddingLeft:10}}/> 
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>setClick2(true)}>
                    <FontAwesome name='angle-down' size={25} color={'black'} style={{paddingLeft:10}}/> 
                </TouchableOpacity>
                
            }
        <Animatable.View duration={100} animation={click2?'fadeIn':'fadeOut'} style={{backgroundColor:'white',padding:10,position:'absolute',top:40,zIndex:2,elevation:20}}>
          {
            data.map((item,index)=>
                <TouchableOpacity key={index} onPress={onPress} style={{margin:5}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        {avatar?
                            <Image source={state==item.title?item.image:item.dimage} style={{width:22,height:22,borderRadius:25}}  />
                                :
                            null
                        }
                        
                        <Text style={{marginLeft:10,color:state==item.title?'black':'#C4C4C4'}}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            )
            }
        </Animatable.View>
      </View>
        

  );
};
export default Picker;