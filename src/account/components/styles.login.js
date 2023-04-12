
import styled from "styled-components/native";
import {View, Text} from 'react-native';
import { Button, TextInput} from "react-native-paper";
import { theme } from "../../themes";


export const AnimationWrapper = styled(View)
`
  width: 100%;
  height:30%;
  top: 30px;
  position: absolute
`;

export const TitleContainer = styled(View)
`
    padding-bottom: ${(props)=>props.theme.spacing.xlarge};
`;

export const TitleText = styled(Text)
`
    font-family: ${(props)=>props.theme.fonts.regular};
    color:${(props)=>props.theme.colors.secondary};
    font-size: ${(props)=>props.theme.fontSizes.xxlarge};
`;


export const LoginFormContainer = styled(View)
`
    width: 70%;
`;

export const TextInputLabel = styled(TextInput).attrs({
    activeUnderlineColor: theme.colors.primary,
    textColor: theme.colors.primary,
    selectionColor: theme.colors.background,
})
`
    background-color: ${(props)=>props.theme.colors.secondary};
`;

export const Spacer = styled(View)
`
    padding-top:${(props)=>props.theme.spacing.medium};
`;

export const ForgotPasswordContainer = styled(View)
`
    align-items: flex-end;
`;

export const SingUpContainer = styled(View)
`
    flexDirection: row;
    justify-content: center;
`;

export const SignUpText = styled(Text)
`
    font-family: ${(props)=>props.theme.fonts.bold};
    color:${(props)=>props.theme.colors.secondary};
`;
export const SignUpButton = styled(Text)
`
    font-family: ${(props)=>props.theme.fonts.bold};
    color:${(props)=>props.theme.colors.primary};
`;

export const ForgotPasswordText = styled(Text)
`
    font-family: ${(props)=>props.theme.fonts.bold};
    color:${(props)=>props.theme.colors.secondary};
`;

export const ButtonLogin = styled(Button).attrs({
    buttonColor: theme.colors.primary,
    mode:"contained", 
    textColor:theme.colors.secondary,
    accessibilityHint:"#18314F",
})
`
    padding: 5px;
    border-radius: 5px;
`;

export const AccountBackground = styled.ImageBackground.attrs({
  source: require( "../../../assets/background.png"),
  imageStyle: {opacity:0.5},
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props)=>props.theme.colors.background};
`;

export const ErrorContainer = styled(Text)`
  font-family: ${(props)=>props.theme.fonts.bold};
  align-items: center;
  align-self: center;
`;