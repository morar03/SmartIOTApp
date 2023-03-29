import { AuthenticationContext } from "../services/authentication/authentication.context";
import { DevicesContext } from "../services/devices/devices.context";

import React, { useContext } from "react";
import { Button,TextInput  } from "react-native-paper";
import {  View } from 'react-native';


export const Test = () =>{
    const {onLogin, error, isLoading, onRegister} = useContext(AuthenticationContext);
    const {addNewDevice, deleteDevice, devices, updateDeviceName } = useContext(DevicesContext);
    console.log(devices);
    return(
        <View>
        <Button  onPress={() => onLogin("morarcristiantraian@gmail.com", "123456")}>
            LogIn
        </Button>
        <Button  onPress={() => onRegister("morarcristiantraian@gmail.com", "123456","123456", "Cristian", "Morar", "0733075930")}>
            Register
        </Button>
        <Button  onPress={() => addNewDevice("test")}>
            addNewDevice
        </Button>
        <Button  onPress={() => deleteDevice("test")}>
            deleteDevice
        </Button>
        <Button  onPress={() => updateDeviceName("test", "teste222")}>
            updateDevice
        </Button>


        </View>
    );
};