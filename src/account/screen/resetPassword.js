import * as React from 'react';
import { useContext, useState, useEffect, } from "react"
import {TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import { theme } from "../../themes";
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { 
  TextInputLabel,
  AccountBackground,
  Spacer,
  ButtonLogin,
  SignUpText,
  SingUpContainer,
  LoginFormContainer,
  SignUpButton,
  TitleContainer,
  TitleText,
  ErrorContainer,
} from '../components/styles.login';

import { 
    AnimationWrapper,
    SpacerTitleAndAnimation,
} from '../components/styles.resetpassword';



export const ResetPasswordScreen = ({navigation}) =>{
  const [Email, setEmail] = useState("");
  const [animationVisible, setAnimationVisible] = useState(true);
  const {onPasswordReset, error, isSucces, isLoading } = useContext(AuthenticationContext);

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

  useEffect(() => {
    if (isSucces) {
      handleSuccess();
    }
  }, [isSucces]);
  
  const handleSuccess = () => {
    navigation.replace('Login');
  };

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
        
        <Spacer/>
        <Spacer/>
        {!isLoading ? (<ButtonLogin onPress={ () => {
            onPasswordReset(Email);
        }}
        >Reset Password</ButtonLogin>):(
            <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
        )}
        <Spacer/>
        {error && (
          <ErrorContainer style={{color: "red"}}>
            {error}
          </ErrorContainer>
          )}
        <Spacer/>
        <SingUpContainer>
          <SignUpText>You have already an account? </SignUpText>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <SignUpButton> SignIn</SignUpButton>
          </TouchableOpacity>
        </SingUpContainer>
      </LoginFormContainer>
    </AccountBackground>
  );
};





