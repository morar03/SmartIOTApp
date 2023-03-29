import React, {useState, createContext, useEffect, useContext} from "react";
import { AuthenticationContext } from "../authentication/authentication.context";
import { addNewDeviceRequest, getAllDevicesUser, UpdateNameDeviceRequest , deleteDeviceRequest, getDataDoorStatus_Type_GarageDoor} from "./devices.services";

export const DevicesContext = createContext();

export const DevicesContextProvider = ({children}) => {
    
    const [devices, setDevices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthenticationContext)

    // const test = getDataDoorStatus_Type_GarageDoor("199700125CM1901").then((r)=>{
    //     console.log(r);
    // });
    
    
    const retrieveDevices = (user) =>{
        setIsLoading(true);
        setDevices([]);
        setTimeout( () => {
            getAllDevicesUser(user.email).then((results)=>{
                setIsLoading(false);
                setDevices(results);
            })
            .catch((err)=>{
                setIsLoading(false);
                setError(err);
            });
        }, 2000 );
    };

    const addNewDevice =(series) => {
        setIsLoading(true);
        setIsLoading(false);
        addNewDeviceRequest(user.email, series).then(()=>{
            retrieveDevices(user);
            setIsLoading(false);
        })
        .catch((err) => {
            setError("Wrong device serie");
        });
            
    };

    const deleteDevice = (series) => {
            setIsLoading(true); 
            deleteDeviceRequest(user.email, series).then(()=>{
                retrieveDevices(user);
                setIsLoading(false);
            })
            .catch((err) => {
                setError("Wrong device serie");
            });
    };

    const updateDeviceName = (series, newName) => {
        setIsLoading(true); 
        UpdateNameDeviceRequest(user.email, series, newName).then(()=>{
            retrieveDevices(user);
            setIsLoading(false);
        })
        .catch((err) => {
            setError("Wrong New Name ");
            console.log(err);
        });
    };

    useEffect(() =>{
        if (user){
            retrieveDevices(user);
        }
        
    },[user]);    

    return (
        <DevicesContext.Provider
        value={{
            devices,
            isLoading,
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