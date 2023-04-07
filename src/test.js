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
    
    return(
        <View>
        <Button  onPress={() => onLogin("morarcristiantraian@gmail.com", "123456")}>
            LogIn
        </Button>
        <Button  onPress={() => onRegister("morarcristiantraian@gmail.com", "123456","123456", "Cristian", "Morar", "0733075930")}>
            Register
        </Button>
        <Button  onPress={() => addNewDevice("199700125CM1902")}>
            addNewDevice
        </Button>
        <Button  onPress={() => deleteDevice("test")}>
            deleteDevice
        </Button>
        <Button  onPress={() => updateDeviceName("test", "teste222")}>
            updateDevice
        </Button>
        <Button  onPress={() => {console.log(devicesRealTime_type_GarageDoor)} }>
            getValue
        </Button>
        <Button  onPress={() => {console.log(devices)} }>
            getValueLISTDEVICE
        </Button>
        <Button  onPress={() => ActionEvent_door_type_GarageDoor(devicesRealTime_type_GarageDoor[0]) }>
            ActionDoor
        </Button>
        <Button  onPress={() => ActionEvent_StopDoor_type_GarageDoor(devicesRealTime_type_GarageDoor[0]) }>
            STOPActionDoor
        </Button>
        <Button  onPress={() => onLogout() }>
        SignOut
        </Button>


        </View>
    );
};