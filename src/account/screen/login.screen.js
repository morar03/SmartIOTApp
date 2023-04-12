import * as React from 'react';
import { useContext, useState, useEffect,  } from "react"
import { TextInput } from 'react-native-paper';
import {TouchableOpacity, Keyboard } from 'react-native';
import LottieView from 'lottie-react-native';
import { theme } from "../../themes";
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { 
  TextInputLabel,
  AccountBackground,
  Spacer,
  ForgotPasswordContainer,
  ForgotPasswordText,
  ButtonLogin,
  SignUpText,
  SingUpContainer,
  LoginFormContainer,
  SignUpButton,
  TitleContainer,
  TitleText,
  AnimationWrapper,
  ErrorContainer,
} from '../components/styles.login';


export const LoginScreen = ({navigation}) =>{
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [animationVisible, setAnimationVisible] = useState(true);
  const {onLogin, error, isSucces } = useContext(AuthenticationContext);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setAnimationVisible(false);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setAnimationVisible(true);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <AccountBackground>
      {animationVisible && (
      <AnimationWrapper >
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../assets/data.json")}
      />
      </AnimationWrapper>)}
      <TitleContainer>  
        <TitleText>Smart CUP</TitleText>
      </TitleContainer>
      <LoginFormContainer>
        <TextInputLabel
          label="Email"
          value={Email}
          returnKeyType="next"
          mode="flat"
          onChangeText={Email => setEmail(Email)}
        />
        <Spacer/>
        <TextInputLabel
          label="Password"
          value={Password}
          returnKeyType="done"
          mode="flat"
          right={<TextInput.Icon icon={hidePassword ? "eye-off" : "eye"}  onPress={() => setHidePassword(!hidePassword)}/>}
          secureTextEntry={hidePassword}
          onChangeText={Password => setPassword(Password)}
        />
        <Spacer/>
        <ForgotPasswordContainer>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <ForgotPasswordText>Forgot your password?</ForgotPasswordText>
          </TouchableOpacity>
        </ForgotPasswordContainer>
        <Spacer/>
        <ButtonLogin onPress={() => onLogin(Email,Password)}>LogIn</ButtonLogin>
        <Spacer/>
        {error && (
          <ErrorContainer style={{color: "red"}}>
            {error}
          </ErrorContainer>
          )}
        {isSucces && (
          <ErrorContainer style={{color: theme.colors.primary}}>
            {isSucces}
          </ErrorContainer>
          )}
        <Spacer/>
        <SingUpContainer>
          <SignUpText>Don't have an account? </SignUpText>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <SignUpButton> SignUp</SignUpButton>
          </TouchableOpacity>
        </SingUpContainer>
      </LoginFormContainer>
    </AccountBackground>
  );
};





