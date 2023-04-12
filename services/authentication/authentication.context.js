import React, {useState, createContext, useEffect } from "react";
import {loginRequest, resetPasswordRequest, registerRequest, authStateChangedRequest,logoutRequest} from "./authentication.services";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSucces, setIsSucces] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    // Check it out if user is already connected
    authStateChangedRequest((user)=>{
        if (user === null) {
            setIsLoading(false);
        }else{
            if (user.emailVerified){
                setUser(user);
                setIsLoading(false);
            }
        };
    });

    const onLogin = (email, password) => {
        setIsLoading(true);
        loginRequest(email, password).then((user)=>{
            if (!user.user.emailVerified){
                
                setError("You need to confirm your email");
                setUser(null);
                setIsLoading(false);
                return;
            }else {
                setUser(user);
                setIsLoading(false);
            }
            
                 
        }).catch((e) => {
            setIsLoading(false);
            setError("Try again Email/Password is wrong");
        })
    }

    const onPasswordReset = (email) => {
        setIsLoading(true);
        resetPasswordRequest(email).then(()=>{
            setIsSucces("The password reset link is sent by email");
            setIsLoading(false);   
        }).catch((e) => {
            setIsLoading(false);
            setError("Try again Email is wrong");
        })
    }

    const onRegister = (email, password, repeatPassword, firsName, lastName, phoneNumber) =>{
        setIsLoading(true);
        if (password !== repeatPassword){
            setError("Error: Passwords do not match");
            setIsLoading(false);
            return;
        }
        if (password.length < 6){
            setError("Error:Password should be at least 6 characters");
            setIsLoading(false);
            return;
        }
        if (phoneNumber.length < 10){
            setError("Error: Phone Number is incorect will be at least 10 Numbers");
            setIsLoading(false);
            return;
        }
        registerRequest(email, password, firsName, lastName, phoneNumber).then((user)=>{
            setError(null);
            setIsSucces("The account created with succes, check your email!");
            setIsLoading(false);
            setUser(user);
        }).catch((e)=>{
            setIsLoading(false);
            setError("Error: Email is not valid");
        })
        
        
    };

    useEffect( ()=>{
        setTimeout(() => {
            setError(null);
            setIsSucces(null);
          },6000)
    },[error, isSucces])

    const onLogout = () => {
        logoutRequest().then(()=>{
            setUser(null);
            setError(null);
            setIsLoading(false);
        });
    };

    return(
        <AuthenticationContext.Provider
        value= {{
            isAuthenticated: !!user,
            isLoading,
            user,
            error,
            isSucces,
            onLogin,
            onRegister,
            onLogout,
            onPasswordReset,
        }}>
            {children}
        </AuthenticationContext.Provider>
    );
    
}

