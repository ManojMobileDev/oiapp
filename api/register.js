import React, { useEffect, useState ,useContext } from "react";
import firestore from '@react-native-firebase/firestore';

export function addVehicle(own,mobile) {

    return(
       firestore()
        .collection('vehicleDetails')
        .doc(mobile)
        .set({
            own: own,
            vehicle: '',
            drivingLicenseNo: '',
            drivingLicenseExp : '',
            revenueLicenseExp:'',
            revenueInsuarenceExp:'',
            licensePlateNo: '',
            make : '',
            model:'',
            manufacture:''
        })
        .then(() => {
            console.log('done')
        })
    )
    
}    

export function updateVehicle(data,mobile) {

    return(
       firestore()
        .collection('vehicleDetails')
        .doc(mobile)
        .update(data)
        .then(() => {
            console.log('updated')
        })
    )
    
}   


export function addUser (fname,lname,email,dob,mobile){
    return(
        firestore()
        .collection('users')
        .doc(mobile)
        .set({
            first_name: fname,
            last_name: lname,
            email: email,
            dob : dob,
            password:'',
            mobile:mobile
        })
        .then(() => {
            getUser(mobile);
        })
    );
  }

export function getUser (mobile){
    return(
        firestore()
        .collection('users')
        .doc(mobile)
        .get()
        .then(collectionSnapshot => {
            console.log('Total users: ', collectionSnapshot.data());
            // navigation.navigate('Password')
        })
    )

}

export function checkExist (data,mobile){
    return(
        firestore()
        .collection('docs')
        .doc(mobile)
        .get()
        .then(documentSnapshot => {
            console.log('User exists: ', documentSnapshot.exists);
        
            if (documentSnapshot.exists) {
                upateDocument(data,mobile)
            }
            else {
                addDocument(mobile)
                upateDocument(data,mobile)
            }
          })
    )

}

export function addDocument (mobile){
    return(
        firestore()
        .collection('docs')
        .doc(mobile)
        .set({
            nicFront:'',
            nicBack:'',
            drivingLicenseSide1:'',
            drivingLicenseSide2:'',
            billingProof: '',
            profilePic : '',
            revenueLicense:'',
            vehicleRegistration:'',
            vehicleInsurance:''
        })
        .then(() => {
            // getUser(mobile);
        })
    );
  }

  export function upateDocument (data,mobile){
    return(
        firestore()
        .collection('docs')
        .doc(mobile)
        .update(data)
        .then(() => {
            console.log('updated')
        })
    );
  }

