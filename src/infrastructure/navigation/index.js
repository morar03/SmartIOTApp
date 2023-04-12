import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components'
import { useContext } from "react"

import {NavigationContainer} from '@react-navigation/native';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

import { AccountNavigator } from './account.navigator';
import { Test } from '../../test';

export const Navigator = () => {
    const { isAuthenticated } = useContext(AuthenticationContext);
    
    return ( 
        <NavigationContainer>
           
            {isAuthenticated ? (
                <Texts>Test Functioneaza</Texts>
            ):(
                <AccountNavigator/>
            )}
        </NavigationContainer>
       );
  };

const Texts = styled(Text)
`
font-family: ${(props) =>props.theme.fonts.medium};
font-size: ${(props) =>props.theme.fontSizes.xlarge};
color: ${(props) =>props.theme.colors.warning};
`;