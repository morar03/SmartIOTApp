import { authFirebase, dbFirestore } from "../../config/firebase";
import { createUserWithEmailAndPassword,sendPasswordResetEmail, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendEmailVerification } from 'firebase/auth';
import {collection, doc, setDoc, getDocs} from "firebase/firestore";

export const loginRequest = (email, password) => signInWithEmailAndPassword(authFirebase, email, password);

export const resetPasswordRequest = (email) => sendPasswordResetEmail(authFirebase, email);

export const registerRequest = (email, password, firstName, lastName, phoneNumber) => createUserWithEmailAndPassword(authFirebase, email, password)
.then((user) => {
  const CollectionUsersRef = collection(dbFirestore, 'Users');
  const DocumentUserRef = doc(CollectionUsersRef, user.user.email);
  const DataUser = {
    FirstName: firstName,
    LastName: lastName,
    email: user.user.email,
    phoneNumber: phoneNumber,
  };
  const SetUserData = setDoc(DocumentUserRef, DataUser);
  const CollectionDevicesRef = collection(DocumentUserRef,"Devices");
  const Devicedata = {Type:"default", Name:"default", Series:"none"};
  getDocs(CollectionDevicesRef).then((querySnapshot) => {
    const sizeCollectionDevices = 0;
    const DocumentDevicesRef = doc(CollectionDevicesRef, sizeCollectionDevices.toString());
    const SetDeviceDefault = setDoc(DocumentDevicesRef, Devicedata);
  });
  sendEmailVerification(authFirebase.currentUser);
});
 
export const authStateChangedRequest = (user) => onAuthStateChanged(authFirebase, user);

export const logoutRequest = () => signOut(authFirebase);

