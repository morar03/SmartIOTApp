import styled from "styled-components/native";
import { FlatList } from "react-native";


import {View, Text} from 'react-native';
import { Button, TextInput, Searchbar, Card} from "react-native-paper";
import { SearchBar } from '@rneui/themed';

import { theme } from "../../themes";



export const DevicesList = styled(FlatList).attrs({
    contentContainerStyle: {
      padding: 16,
    },
  })``;

export const CardLabel_Background_GarageDoor = styled.ImageBackground.attrs({
    source: require( "../../../assets/garageDoorBG.png"),
    imageStyle: {opacity:0.1},
  })`
    align-items: center;
    justify-content: center;
    margin: ${"10px"};
    border-radius: ${"25px"};
    width: ${"150px"};
    height: ${"150px"};
    background-color: ${(props)=>props.theme.colors.secondary};
  `;

export const CardLabel_GarageDoor = styled(View).attrs({
    
  })`
    overflow: hidden;
    align-items: center;
    justify-content: center;
    width: ${"150px"};
    height: ${"150px"};
    margin: ${"10px"};
    border-radius: ${"25px"};
    box-shadow: 20px 25px 25px rgba(0, 0, 0, 1);
    background-color: ${(props)=>props.theme.colors.secondary};
  `;


export const StatusDevice = styled(Button).attrs({
    mode: "outlined",
    Color: theme.colors.primary,
    textColor: theme.colors.primary,
    })
    `
    border-radius: ${"100px"};
    margin: ${(props)=>props.theme.spacing.small};
    margin-top: ${(props)=>props.theme.spacing.xxlarge};
    justify-content: ${"center"};
    align-items: ${'center'};
    `;

export const TitleDevice = styled(Text).attrs({

})
`
    font-size: ${(props)=>props.theme.fontSizes.medium};
    color:  ${(props)=>props.theme.colors.primary};
    font-family: ${(props)=>props.theme.fonts.bold};  
`
export const TitleCard = styled(View).attrs({

})
`
    width:100%;
    padding:10px;
    margin-bottom:25px;
    align-items:center;
    elevation: 5;
    box-shadow: 20px 25px 25px rgba(255, 255, 255, 0.5);
    background-color: rgba(255, 255, 255, 0.7);
`
