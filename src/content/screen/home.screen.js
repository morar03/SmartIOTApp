import { AuthenticationContext } from "../services/authentication/authentication.context";
import { DevicesContext } from "../services/devices/devices.context";
import { DevicesRealTimeContext } from "../services/devices/devicesRealTime.context";

import React, { useContext } from "react";
import { Button,TextInput  } from "react-native-paper";
import {  View } from 'react-native';

export const Test = () =>{
    const {onLogin, error, isLoading, onRegister, onLogout} = useContext(AuthenticationContext);
    const {addNewDevice, deleteDevice, devices, updateDeviceName } = useContext(DevicesContext);
    const { devicesRealTime_type_GarageDoor, ActionEvent_door_type_GarageDoor,ActionEvent_StopDoor_type_GarageDoor } = useContext(DevicesRealTimeContext);

}