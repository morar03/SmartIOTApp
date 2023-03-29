import { dbFirestore, dbRealtime } from "../../config/firebase";
import {collection, doc, setDoc, getDocs, getDoc, deleteDoc, updateDoc} from "firebase/firestore";
import { ref, onValue} from "firebase/database";



export const addNewDeviceRequest = async(email, series) =>
{
    if ( await CheckDeviceExists(series)){
        const querySnapshot = await getDoc(getRefDeviceDocumentsFromDevicesDB(series)).then((snapShot) =>{
            const Devicedata = {Type:snapShot.data().Type, Name: snapShot.data().Name, Series:series};
            const SetDeviceDefault = setDoc(getRefDeviceDocumentFromUser(email,series), Devicedata);
        }); 
    }else{
        throw new Error('Wrong device serie');
    }
      
};

export const deleteDeviceRequest = async (email, series) =>
{
    await deleteDoc(getRefDeviceDocumentFromUser(email, series));
};

export const getAllDevicesUser = async (email) =>{  
    const listDevices = [];
    if (email) {
        await getDocs(getRefDevicesCollectionFromUser(email)).then((response)=>{
            response.forEach((doc) => {
                listDevices.push({id: doc.id, ...doc.data()});
            });
        });  
    };
    return listDevices; 
};

export const getAllDevices = async() =>{ 
    await getDocs(getRefDeviceCollectionFromDevicesDB()).then((response)=>{
        return response;
    });
};

export const UpdateNameDeviceRequest = async(email, series, newName) =>{
    const documentSnapshot = await updateDoc(getRefDeviceDocumentFromUser(email, series), {
        Name : newName
    }) ;
};

export const getDataDoorStatus_Type_GarageDoor = async (series) => {
    const DataDoorStatus = ref(dbRealtime, series+"/statusDoorFirebase");
    onValue(DataDoorStatus, (snapshot) => {
        const data =  snapshot.val();
        // return data;
    });
    
};

const CheckDeviceExists = async (series) => {
    const documentSnapshot = await getDoc(getRefDeviceDocumentsFromDevicesDB(series));
    if (documentSnapshot.exists()) {
        return true;
    } else {
        return false;
    }
};

const getRefDeviceCollectionFromDevicesDB = () => { 
    const CollectionDevicesDBRef = collection(dbFirestore, 'devicesDB');
    return CollectionDevicesDBRef;
};

const getRefDeviceDocumentsFromDevicesDB = (series) => { 
    const DocumentDeviceRef = doc(getRefDeviceCollectionFromDevicesDB(), series);
    return DocumentDeviceRef;
};

const getRefDeviceDocumentFromUser = (email, series) =>{
    const DocumentDeviceRef = doc(getRefDevicesCollectionFromUser(email), series);
    return DocumentDeviceRef;
};

const getRefDevicesCollectionFromUser = (email) =>{
    const CollectionUsersRef = collection(dbFirestore, 'Users');
    const DocumentUserRef = doc(CollectionUsersRef, email);
    const CollectionDevicesRef = collection(DocumentUserRef,"Devices");
    return CollectionDevicesRef;
};




