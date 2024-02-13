import { dbRealtime } from "../../../config/firebase";
import { ref, onValue, get, child ,update, off} from "firebase/database";
import React, {useState, createContext, useEffect, useContext} from "react";
import { DevicesContext } from "../devices.context";


export const DeviceRealTime_GarageDoor_RealTimeContext = createContext();

export const DeviceRealTime_GarageDoor_RealTimeContextProvider = ({children}) => {

    const [list_devicesRealTime_type_GarageDoor, setList_DevicesRealTime_GarageDoor] = useState([]);
    const [list_devicesRealTime_type_GarageDoor_isLoading, setList_DevicesRealTime_GarageDoor_isLoading] = useState(true);
    const {devices, devices_isLoading, deleteDevice} =  useContext(DevicesContext);

    const Type_GarageDoor_ActionEvent_Door = (device) =>{
        const DataEventDoor = ref(dbRealtime, "Devices/"+ device.Series );
        update(DataEventDoor, {
            eventTriggerDoorFirebase : true,
          });
    }

    const Type_GarageDoor_ActionEvent_StopAutomation = (device) =>{
        const DataEventDoor = ref(dbRealtime, "Devices/"+ device.Series+ "/TriggerSTOPFunctionDevice" );
        get(child(DataEventDoor)).then((snapshot) => {
            if (snapshot.exists()) {
                const objectToUpdate = list_devicesRealTime_type_GarageDoor.find(obj => obj.Series === device.Series);
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
                setList_DevicesRealTime_GarageDoor([...list_devicesRealTime_type_GarageDoor]);
            }   
        }); 
    }

    const Type_GarageDoor_Listener_DataDoorStatus_and_CreateList = (FilterList) => {
        let newListOfDevices = []
        FilterList.map((device,index)=>{
            let obj = { id: device.id, Type: device.Type, Series: device.Series, Name: device.Name, StatusDoor: false };
            const DataDoorStatus = ref(dbRealtime, "Devices/"+ device.Series);
            onValue(DataDoorStatus, (snapshot) => {
                obj.StatusDoor = snapshot.val().statusDoorFirebase;
            });
            newListOfDevices = newListOfDevices.concat(obj);
        });
        setList_DevicesRealTime_GarageDoor(newListOfDevices);
    };

    const Type_GarageDoor_DeleteDevice = (device) => {
        const DataDoorStatus = ref(dbRealtime, "Devices/" + device.Series);
        off(DataDoorStatus, device.Series);
        deleteDevice(device.Series);
    };

    useEffect(()=>{
        setList_DevicesRealTime_GarageDoor_isLoading(true);
        setList_DevicesRealTime_GarageDoor([])
        const FilterList = devices.filter((device)=> device.Type === "GarageDoor");
        Type_GarageDoor_Listener_DataDoorStatus_and_CreateList(FilterList);
        setList_DevicesRealTime_GarageDoor_isLoading(false);
    },[devices]);    

    return (
        <DeviceRealTime_GarageDoor_RealTimeContext.Provider
        value={{
            list_devicesRealTime_type_GarageDoor,
            list_devicesRealTime_type_GarageDoor_isLoading,
            Type_GarageDoor_DeleteDevice,
            Type_GarageDoor_ActionEvent_Door,
            Type_GarageDoor_ActionEvent_StopAutomation,
        }}
        >
        {children}
        </DeviceRealTime_GarageDoor_RealTimeContext.Provider>
    );
}