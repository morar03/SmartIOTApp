import React, {useState, createContext } from "react";
import {loginRequest, registerRequest, authStateChangedRequest,logoutRequest} from "./authentication.services";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    // Check it out if user is already connected
    authStateChangedRequest((user)=>{
        
        if (user) {
            setUser(user);
            setIsLoading(false);
        }else{
            setIsLoading(false);
        };
    });

    const onLogin = (email, password) => {
        setIsLoading(true);
        loginRequest(email, password).then((user)=>{
            setIsLoading(true);
            if (!user.user.emailVerified){
            setError("You need to confirm your email");
            return;
            }
            setUser(user);
            setIsLoading(false);     
        }).catch((e) => {
            setIsLoading(false);
            setError("Try again Emai/Password is wrong");
        })
    }

    const onRegister = (email, password, repeatPassword, firsName, lastName, phoneNumber) =>{
        setIsLoading(true);
        if (password !== repeatPassword){
            setError("Error: Passwords do not match");
            return;
        }
        registerRequest(email, password, firsName, lastName, phoneNumber).then((user)=>{
            setUser(user);
            setIsLoading(false);
        }).catch((e)=>{
            setIsLoading(false);
            setError(e.toString());
        })
    };

    const onLogout = () => {
        logoutRequest().then(()=>{
            setUser(null);
            setError(null);
        });
    };

    return(
        <AuthenticationContext.Provider
        value= {{
            isAuthenticated: !!user,
            user,
            isLoading,
            error,
            onLogin,
            onRegister,
            onLogout,
        }}>
            {children}
        </AuthenticationContext.Provider>
    );
    
}

