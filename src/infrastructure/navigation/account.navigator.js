import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LoginScreen } from '../../account/screen/login.screen';
import { RegisterScreen } from '../../account/screen/register.screen';
import { ResetPasswordScreen } from '../../account/screen/resetPassword';

const Stack = createNativeStackNavigator();

export const AccountNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{
            headerShown:false,
        }}> 
            <Stack.Screen  name="Login" component={LoginScreen} />
            <Stack.Screen  name="Register" component={RegisterScreen} />
            <Stack.Screen  name="ForgotPassword" component={ResetPasswordScreen} />
        </Stack.Navigator>
    );
};