import React, { useContext, useState } from "react";

import { 
    StatusDevice,
    TitleDevice,
    CardLabel_GarageDoor,
    TitleCard,
    CardLabel_Background_GarageDoor,

    
} from "../components/styles.devices";


export const GarageDoorCard = ( {device={}} ) => {

    const {
        Name = "GarageDoor Default",
        Series = "0000",
        Type = "GarageDoor",
        StatusDoor = true,
        id,
        } = device;

    return (
        <CardLabel_GarageDoor onTouchStart={() => alert('TAPPED')}>
            <CardLabel_Background_GarageDoor >
                <StatusDevice>
                {StatusDoor == true ? "23°C" : "Close" }
                </StatusDevice>
                <TitleCard>
                    <TitleDevice>{Name}</TitleDevice>
                </TitleCard>
            </CardLabel_Background_GarageDoor>
        </CardLabel_GarageDoor>
    )
}