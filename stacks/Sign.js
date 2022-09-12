import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import React, { useEffect, useState ,useContext } from "react";
import LanguageSelect from '../screens/LanguageSelect';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import PhoneNumber from '../screens/PhoneNumber';
import Home from '../screens/Home';
import VehicalReg1 from '../screens/VehicalReg1';
import VehicleRgistration from '../screens/VehicleRegistration'
import VehicleChoose from '../screens/VehicleChoose'
import DrivingLicense from '../screens/DrivingLicense';
import VehicleDetails from '../screens/VehicleDetails';
import UploadDocuments from '../screens/UploadDocuments';
import UploadVehicleDocuments from '../screens/uploadVehicleDocuments';
import Complete from '../screens/Complete';
import Password from '../screens/Password'
import ResetPassword from '../screens/ResetPassword';
import SignUpPhoneNumber from '../screens/SignUpPhoneNumber';
import ResetPasswordPhoneNumber from '../screens/ResetPasswordPhoneNumber';
import MainDrawer from './Drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'
import { OIContext } from '../context/Context';
import Splash from '../screens/Splash';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Splash' 
    screenOptions={({ route, navigation }) => ({
      headerShown: false,
      gestureEnabled: true,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    })}>
      <Stack.Screen name="Splash" component={Splash}/>
      <Stack.Screen name="Home" component={MainDrawer}/>
      <Stack.Screen name="LanguageSelect" component={LanguageSelect} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="VehicalReg1" component={VehicalReg1} />
      <Stack.Screen name="VehicleRgistration" component={VehicleRgistration} />
      <Stack.Screen name="VehicleChoose" component={VehicleChoose} />
      <Stack.Screen name="DrivingLicense" component={DrivingLicense} />
      <Stack.Screen name="VehicleDetails" component={VehicleDetails} />
      <Stack.Screen name="UploadDocuments" component={UploadDocuments} />
      <Stack.Screen name="UploadVehicleDocuments" component={UploadVehicleDocuments} />
      <Stack.Screen name="Complete" component={Complete} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="SignUpPhoneNumber" component={SignUpPhoneNumber} />
      <Stack.Screen name="ResetPasswordPhoneNumber" component={ResetPasswordPhoneNumber} />
    </Stack.Navigator>
  );
}
function MyStack2() {
  return (
    <Stack.Navigator initialRouteName='LanguageSelect' 
    screenOptions={({ route, navigation }) => ({
      headerShown: false,
      gestureEnabled: true,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    })}>
      <Stack.Screen name="Home" component={MainDrawer}/>
      <Stack.Screen name="LanguageSelect" component={LanguageSelect} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="VehicalReg1" component={VehicalReg1} />
      <Stack.Screen name="VehicleRgistration" component={VehicleRgistration} />
      <Stack.Screen name="VehicleChoose" component={VehicleChoose} />
      <Stack.Screen name="DrivingLicense" component={DrivingLicense} />
      <Stack.Screen name="VehicleDetails" component={VehicleDetails} />
      <Stack.Screen name="UploadDocuments" component={UploadDocuments} />
      <Stack.Screen name="UploadVehicleDocuments" component={UploadVehicleDocuments} />
      <Stack.Screen name="Complete" component={Complete} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="SignUpPhoneNumber" component={SignUpPhoneNumber} />
      <Stack.Screen name="ResetPasswordPhoneNumber" component={ResetPasswordPhoneNumber} />
    </Stack.Navigator>
  );
}

export default function App() {
  
//   const [screen, setScreen] = React.useState(<MyStack2 />);
//   const context = useContext(OIContext)

// const getData = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem('user')
//     return jsonValue != null ? 
//     [
//       // console.log(JSON.parse(jsonValue)),
//     setScreen(<MyStack />),
//     context.setUser(JSON.parse(jsonValue))
//     // SplashScreen.hide()
//     ]
//     : 
//     [console.log('no data'),
//     setScreen(<MyStack2 />),
//     ]
//     ;
//   } 
//   catch(e) {
//     // error reading value
//   }
//   finally{
//     setTimeout(() => {
//     SplashScreen.hide()
      
//     }, 1000);
//   }
// }

// React.useEffect(() => {
//   getData()  
// },[]);

    return (
      
    <MyStack />
        
    );
  }