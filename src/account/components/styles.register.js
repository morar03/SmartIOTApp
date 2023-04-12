import styled from "styled-components/native";
import {View} from 'react-native';


export const AnimationWrapper = styled(View)
`
  width: 100%;
  height:30%;
  top: 10px;
  position: absolute;
`;

export const SpacerTitleAndAnimation = styled(View)
`
    padding-top:${(props)=>props.theme.spacing.xxlarge};
`;
