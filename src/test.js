import { AuthenticationContext } from "../services/authentication/authentication.context";
import { DevicesContext } from "../services/devices/devices.context";
import { DevicesRealTimeContext } from "../services/devices/devicesRealTime.context";
import { DeviceRealTime_GarageDoor_RealTimeContext } from "../services/devices/TypeOfDevices/devicesRealTime.GarageDoor.context";

import React, { useContext } from "react";
import { Button,TextInput  } from "react-native-paper";
import {  View } from 'react-native';


export const Test = () =>{
    const device = {"Name": "test3", "Series": "199700125CM1903", "Type": "GarageDoor", "id": 1}


    const {onLogin, error, isLoading, onRegister, onLogout} = useContext(AuthenticationContext);
    const {addNewDevice, deleteDevice, devices, updateDeviceName } = useContext(DevicesContext);
    const {devicesRealTime,Type_GarageDoor_ActionEvent_StopAutomation } = useContext(DevicesRealTimeContext);
    const {Type_GarageDoor_ActionEvent_Door,list_devicesRealTime_type_GarageDoor, Type_GarageDoor_DeleteDevice} = useContext(DeviceRealTime_GarageDoor_RealTimeContext);
    return(
        <View>
        <Button  onPress={() => onLogin("phcristianmorar@gmail.com", "123456")}>
            LogIn
        </Button>
        <Button  onPress={() => onRegister("phcristianmorar@gmail.com", "123456","123456", "Cristian", "Morar", "0733075930")}>
            Register
        </Button>
        <Button  onPress={() => addNewDevice("199700125CM1903")}>
            addNewDevice
        </Button>
        <Button  onPress={() => Type_GarageDoor_DeleteDevice(device)}>
            deleteDevice
        </Button>
        <Button  onPress={() => updateDeviceName("test", "teste222")}>
            updateDevice
        </Button>
        <Button  onPress={() => {console.log(list_devicesRealTime_type_GarageDoor)} }>
            getValue
        </Button>
        <Button  onPress={() => {console.log(devices)} }>
            getValueLISTDEVICE
        </Button>
        <Button  onPress={() => {console.log(list_devicesRealTime_type_GarageDoor)} }>
            getValueLIistDEVICERealiTime
        </Button>
        <Button  onPress={() => Type_GarageDoor_ActionEvent_Door(list_devicesRealTime_type_GarageDoor[0]) }>
            ActionDoor
        </Button>
        <Button  onPress={() => Type_GarageDoor_ActionEvent_StopAutomation(list_devicesRealTime_type_GarageDoor[0]) }>
            STOPActionDoor
        </Button>
        <Button  onPress={() => onLogout() }>
        SignOut
        </Button>


        </View>
    );
};