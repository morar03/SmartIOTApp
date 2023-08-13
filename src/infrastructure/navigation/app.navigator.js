import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator, useBottomTabBarHeight,  } from '@react-navigation/bottom-tabs';
import { Test } from '../../test';
import { theme } from "../../themes";
import { DevicesContextProvider } from '../../../services/devices/devices.context';
import { DevicesRealTimeContextProvider } from '../../../services/devices/devicesRealTime.context';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
    
    return (
        <DevicesContextProvider>
        <DevicesRealTimeContextProvider>
        <Tab.Navigator
            screenOptions={createScreenOptions}
            initialRouteName="Home"
            backBehavior= 'history'
        >
            <Tab.Screen name="Devices" component={Test}/>    
            <Tab.Screen name="Home" component={Test}/>
            <Tab.Screen name="Settings" component={Test}/>
        </Tab.Navigator>
        </DevicesRealTimeContextProvider>
        </DevicesContextProvider>
    );
};

const createScreenOptions = ({route}) =>{
    const iconName = TabIcon[route.name];
    return{
        tabBarIcon: ({color, size}) => (
            <FontAwesome5 name={iconName} size={size} color={color} />
        ),
        tabBarActiveTintColor : "#0FA3B1",
        tabBarInactiveTintColor : '#FFFFFF',
        tabBarActiveBackgroundColor:"#003D43",
        tabBarInactiveBackgroundColor: "#003D43",
        headerShown: true,

    }
};

const TabIcon = {
    Home : "home",
    Devices : 'dice-d20',
    Settings : 'users-cog'
  }
  