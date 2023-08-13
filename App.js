
import { StatusBar } from 'react-native';


import {theme} from "./src/themes/index";
import { ThemeProvider } from 'styled-components/native';

import { useFonts, RubikIso_400Regular } from '@expo-google-fonts/rubik-iso';
import { Righteous_400Regular } from '@expo-google-fonts/righteous';
import { Roboto_700Bold } from '@expo-google-fonts/roboto';


import { AuthenticationContextProvider } from './services/authentication/authentication.context';


import { Navigator } from './src/infrastructure/navigation';

export default function App() {

  const [fontsLoaded] = useFonts({
    RubikIso_400Regular,
    Righteous_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  };

  
  return (
    <>
    <StatusBar barStyle="default" />
    <ThemeProvider theme={theme}>
    <AuthenticationContextProvider>
      <Navigator />
    </AuthenticationContextProvider>
    </ThemeProvider>
    
    </>
  );
};

