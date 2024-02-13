import { AuthenticationContext } from "../services/authentication/authentication.context";
import { DevicesContext } from "../services/devices/devices.context";
import { DevicesRealTimeContext } from "../services/devices/devicesRealTime.context";

import React, { useContext } from "react";
import { Button,TextInput  } from "react-native-paper";
import {  View } from 'react-native';

export const Test = () =>{
    const {onLogin, error, isLoading, onRegister, onLogout} = useContext(AuthenticationContext);
    const {addNewDevice, deleteDevice, devices, updateDeviceName } = useContext(DevicesContext);
    const { list_devicesRealTime_type_GarageDoor, Type_GarageDoor_ActionEvent_Door,Type_GarageDoor_ActionEvent_StopAutomation } = useContext(DevicesRealTimeContext);

}