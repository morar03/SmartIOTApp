import { dbRealtime } from "../../config/firebase";
import { ref, onValue, get, child ,update} from "firebase/database";
import React, {useState, createContext, useEffect, useContext} from "react";
import { DevicesContext } from "./devices.context";
import { AuthenticationContext } from "../authentication/authentication.context";
import { DeviceRealTime_GarageDoor_RealTimeContext } from "./TypeOfDevices/devicesRealTime.GarageDoor.context";



export const DevicesRealTimeContext = createContext();

export const DevicesRealTimeContextProvider = ({children}) => {

    const [devicesRealTime, setDevicesRealTime] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    const { user } = useContext(AuthenticationContext);
    const { devices } = useContext(DevicesContext);
    const { list_devicesRealTime_type_GarageDoor,
        Type_GarageDoor_Add_device_type_inList,
        } = useContext(DeviceRealTime_GarageDoor_RealTimeContext);

    
    const UpdatingListWithActiveDevices = (devices) =>{
        setIsLoading(true);
        devices.map((device,i)=>{
            console.log("intra "+i);
            console.log(device);
            if (device.Type === "GarageDoor"){
                Type_GarageDoor_Add_device_type_inList(device);
                
            }
        });
        setIsLoading(false);
    };

    // useEffect(()=>{
    //         console.log("Devices:");
    //         console.log(devices);
    //         UpdatingListWithActiveDevices(devices); 
    // }, [devices, user]);

    // useEffect(()=>{
    //     setDevicesRealTime([]);
    //     list_devicesRealTime_type_GarageDoor.map((device,i)=>{
    //     setDevicesRealTime(devicesRealTime => devicesRealTime.concat(device));
    //     });

    // },[list_devicesRealTime_type_GarageDoor]);


    
    return (
        <DevicesRealTimeContext.Provider
        value={{
            devicesRealTime,
            isLoading,
        }}
        >
        {children}
        </DevicesRealTimeContext.Provider>
    );
};