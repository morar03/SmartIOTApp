import { dbRealtime } from "../../config/firebase";
import { ref, onValue, get, child ,update} from "firebase/database";
import React, {useState, createContext, useEffect, useContext} from "react";
import { DevicesContext } from "./devices.context";

export const DevicesRealTimeContext = createContext();

export const DevicesRealTimeContextProvider = ({children}) => {

    const [devicesRealTime_type_GarageDoor, setDevicesRealTime] = useState([]);
    const { devices } = useContext(DevicesContext);

    const ActionEvent_door_type_GarageDoor = (device) =>{
        const DataEventDoor = ref(dbRealtime, device.Series );
        update(DataEventDoor, {
            eventTriggerDoorFirebase : true,
          });
    }

    const ActionEvent_StopDoor_type_GarageDoor = (device) =>{
        const DataEventDoor = ref(dbRealtime, device.Series );
        get(child(ref(dbRealtime), device.Series + "/TriggerSTOPFunctionDevice")).then((snapshot) => {
            if (snapshot.exists()) {
                const objectToUpdate = devicesRealTime_type_GarageDoor.find(obj => obj.Series === device.Series);
                if (objectToUpdate){
                    if (snapshot.val()){
                        update(DataEventDoor, {
                            TriggerSTOPFunctionDevice : false,
                        });
                        
                    }else{
                        update(DataEventDoor, {
                            TriggerSTOPFunctionDevice : true,
                        });
                    }
                    objectToUpdate.TriggerSTOPFunctionDevice = !snapshot.val();
                }
                setDevicesRealTime([...devicesRealTime_type_GarageDoor]);
            }   
        }); 
    }

    const Listener_DataDoorStatus_Type_GarageDoor_Request = (device) => {
        const DataDoorStatus = ref(dbRealtime, device.Series +"/statusDoorFirebase");
        onValue(DataDoorStatus, (snapshot) => {
        const objectToUpdate = devicesRealTime_type_GarageDoor.find(obj => obj.Series === device.Series);
        if (objectToUpdate){
            objectToUpdate.StatusDoor = snapshot.val();
        }
        setDevicesRealTime([...devicesRealTime_type_GarageDoor]);
        });
    };
    
    const Add_device_type_GarageDoor_inList = (device) =>{
        const obj = { Series: device.Series, StatusDoor:false};
        setDevicesRealTime(devicesRealTime_type_GarageDoor => devicesRealTime_type_GarageDoor.concat(obj));
        get(child(ref(dbRealtime), device.Series + "/statusDoorFirebase")).then((snapshot) => {
            if (snapshot.exists()) {
            const objectToUpdate = devicesRealTime_type_GarageDoor.find(obj => obj.Series === device.Series);
            if (objectToUpdate){
                objectToUpdate.StatusDoor = snapshot.val();
            }
            setDevicesRealTime([...devicesRealTime_type_GarageDoor]);
            }
        }); 
        Listener_DataDoorStatus_Type_GarageDoor_Request(device);
    };

    const UpdatingListWithActiveDevices = (devices) =>{
        devices.map((device,i)=>{
            if (device.Type === "GarageDoor"){
                Add_device_type_GarageDoor_inList(device);
            }
        });
    };

    useEffect(()=>{
        if (devices) {
            setDevicesRealTime([]);
            UpdatingListWithActiveDevices(devices); 
        }else{
            setDevicesRealTime([]);
        }
    }, [devices]);


    
    return (
        <DevicesRealTimeContext.Provider
        value={{
            devicesRealTime_type_GarageDoor,
            ActionEvent_door_type_GarageDoor,
            ActionEvent_StopDoor_type_GarageDoor,
        }}
        >
        {children}
        </DevicesRealTimeContext.Provider>
    );
};