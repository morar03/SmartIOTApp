import { AuthenticationContext } from "../services/authentication/authentication.context";
import React, { useContext } from "react";
import { Button,TextInput  } from "react-native-paper";
import {  View } from 'react-native';

export const Test = () =>{
    const {onLogin, error, isLoading, onRegister} = useContext(AuthenticationContext);

    return(
        <View>
        <Button  onPress={() => onLogin("morarcristiantraian@gmail.com", "123456")}>
            LogIn
        </Button>
        <Button  onPress={() => onRegister("morarcristiantraian@gmail.com", "123456","123456", "Cristian", "Morar", "0733075930")}>
            Register
        </Button>
        </View>
    );
};