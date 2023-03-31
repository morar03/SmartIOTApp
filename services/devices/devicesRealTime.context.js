import { dbRealtime } from "../../config/firebase";
import { ref, onValue, get} from "firebase/database";
import React, {useState, createContext, useEffect, useContext} from "react";
import { DevicesContext } from "./devices.context";
import { AuthenticationContext } from "../authentication/authentication.context";

export const DevicesRealTimeContext = createContext();

export const DevicesRealTimeContextProvider = ({children}) => {

    const [devicesRealTime_type_GarageDoor, setDevicesRealTime] = useState([]);
    const { devices } = useContext(DevicesContext);

    const Listener_DataDoorStatus_Type_GarageDoor_Request = (device) => {
        const index =devicesRealTime_type_GarageDoor.findIndex((newObject) => device.Series === newObject.Series);
        if (index != -1) {
            const DataDoorStatus = ref(dbRealtime, device.Series +"/statusDoorFirebase");
            onValue(DataDoorStatus, (snapshot) => {
                let data =  snapshot.val();
                const updatedList = devicesRealTime_type_GarageDoor.map((element, i) =>
                    i === index ? { ...element, StatusDoor: data } : element
                    );
                setDevicesRealTime(updatedList);
            });
         };
    };

    const Add_device_type_garagedoor_inList = (device) =>{
        const obj = {Series: device.Series, StatusDoor: false};
        const index = devicesRealTime_type_GarageDoor.findIndex((newObject) => device.Series === newObject.Series);
        if (index == -1) {
        setDevicesRealTime(devicesRealTime_type_GarageDoor => devicesRealTime_type_GarageDoor.concat(obj));
        };
        Listener_DataDoorStatus_Type_GarageDoor_Request(device);
       
    }

    const UpdatingListWithActiveDevices = (devices) =>{
        devices.map((device,i)=>{
            if (device.Type === "GarageDoor"){
                Add_device_type_garagedoor_inList(device);
            }
        });
    }


    useEffect(()=>{
        if (devices.length) {
            UpdatingListWithActiveDevices(devices); 
        }else{
            setDevicesRealTime([]);
        }
    }, [devices]);


    
    return (
        <DevicesRealTimeContext.Provider
        value={{
            devicesRealTime_type_GarageDoor,
        }}
        >
        {children}
        </DevicesRealTimeContext.Provider>
    );
};