import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components'
import { useContext } from "react"

import {NavigationContainer} from '@react-navigation/native';
import { AppNavigator } from './app.navigator';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

import { AccountNavigator } from './account.navigator';


export const Navigator = () => {
    const { isAuthenticated } = useContext(AuthenticationContext);
    
    return ( 
        <NavigationContainer>
           
            {isAuthenticated ? (
                <AppNavigator/>
            ):(
                <AccountNavigator/>
            )}
        </NavigationContainer>
       );
  };