import { DevicesContext } from "../../../services/devices/devices.context";
import { DevicesRealTimeContext } from "../../../services/devices/devicesRealTime.context";
import { DeviceRealTime_GarageDoor_RealTimeContext } from "../../../services/devices/TypeOfDevices/devicesRealTime.GarageDoor.context";

import React, { useContext, useState } from "react";
import { Button, Card } from "react-native-paper";
import { View, FlatList, Text, Image, StyleSheet} from 'react-native';

import { FadeInView } from "../../utilities/fade.animation";

import { 
    SearchbarLabel,
    ViewScreen,
} from "../components/styles.devices";

import { DevicesList } from "../components/devices-list.styles";

import { GarageDoorCard } from "../components/deviceCard-GarageDoor.component";

import { MaterialIcons } from '@expo/vector-icons';


export const DevicesScreen = () =>{
    const { devicesRealTime} = useContext(DevicesRealTimeContext);

    const [search, setSearch] = useState("");
    
    const onChangeSearchBar = (searchWord) => {setSearch(searchWord)};
    const clearSearch = () => {setSearch("")};

    return(
        <View>
        <SearchbarLabel
            placeholder="Search"
            mode="bar"
            onChangeText={onChangeSearchBar}
            value={search}
            clearIcon = {({color, size}) => (
                <MaterialIcons name={"cancel"} size={24} color={"white"} />
            )}
            onClearIconPress= {clearSearch}
        />
            <ViewScreen>
                <DevicesList
                data={devicesRealTime}
                numColumns={2}
                renderItem={({item}) => {
                    return (
                            <GarageDoorCard device={item} />
                    )}}
                    keyExtractor={(item) => item.id}
                />
            </ViewScreen>
        </View>);
}
