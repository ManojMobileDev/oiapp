import React, { createContext, useState , useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n from 'i18n-js';

import en from '../translations/en.json';
import si from '../translations/zh.json';
import tm from '../translations/tm.json';

export const OIContext = createContext();

export const OIProvider = ({ children }) => {

  const [state, setState] = useState("Home");
  const [language, setLanguage] = useState("en");
  const [mobile, setMobile] = useState();
  const [user, setUser] = useState([]);
  const [id, setId] = useState('1');



  const getLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem('language')
      if(value !== null) {
        setLanguage(value)
        i18n.locale = value;
        i18n.fallbacks = true;
        i18n.translations = { en, si, tm };
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }

  const getId = async () => {
    try {
      const value = await AsyncStorage.getItem('mobile')
      if(value !== null) {
        setMobile(value)
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() => {
    getLanguage()
    getId()
  },[]);

  return (
    <OIContext.Provider
      value={{
        state,
        setState,
        language,
        setLanguage,
        id,
        setId,
        mobile,
        setMobile,
        user,
        setUser,

        getLanguage
      }}
    >
      {children}
    </OIContext.Provider>
  );
};