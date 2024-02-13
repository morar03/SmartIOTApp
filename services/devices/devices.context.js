import React, {useState, createContext, useEffect, useContext} from "react";
import { AuthenticationContext } from "../authentication/authentication.context";
import { addNewDeviceRequest, getAllDevicesUser, UpdateNameDeviceRequest , deleteDeviceRequest} from "./devices.services";

export const DevicesContext = createContext();

export const DevicesContextProvider = ({children}) => {
    
    const [devices, setDevices] = useState([]);
    const [devices_isLoading, set_devices_IsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthenticationContext);
 
    const retrieveDevices = (user) =>{
        set_devices_IsLoading(true);
        setDevices([]);
        setTimeout( () => {
            getAllDevicesUser(user.email).then((results)=>{
                setDevices(results);
                set_devices_IsLoading(false);
            })
            .catch((err)=>{
                set_devices_IsLoading(false);
                setError(err);
            });
        }, 2000 );
    };

    const addNewDevice =(series) => {
        addNewDeviceRequest(user.email, series).then(()=>{
            retrieveDevices(user);
        })
        .catch((err) => {
            setError("Wrong device serie");
            set_devices_IsLoading(false);
        });
            
    };

    const deleteDevice = (series) => {
        deleteDeviceRequest(user.email, series).then(()=>{
            retrieveDevices(user);
        })
        .catch((err) => {
            setError("Wrong device serie");
            set_devices_IsLoading(false);
        });
    };

    const updateDeviceName = (series, newName) => {
        UpdateNameDeviceRequest(user.email, series, newName).then(()=>{
            retrieveDevices(user);
        })
        .catch((err) => {
            setError("Wrong New Name ");
            set_devices_IsLoading(false);
        });
    };

    useEffect(() =>{
        setDevices([]);
        if (user && user.email){
            retrieveDevices(user); 
        }
        console.log(devices);
    },[user]);    

    return (
        <DevicesContext.Provider
        value={{
            devices,
            devices_isLoading,
            error,
            addNewDevice,
            deleteDevice,
            updateDeviceName,
        }}
        >
        {children}
        </DevicesContext.Provider>
    );
};