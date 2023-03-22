import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import theme from "./src/themes/index";
import { useFonts, RubikIso_400Regular } from '@expo-google-fonts/rubik-iso';
import { Righteous_400Regular } from '@expo-google-fonts/righteous';


export default function App() {

  const [fontsLoaded] = useFonts({
    RubikIso_400Regular,
    Righteous_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: theme.fonts.regular, color:theme.colors.warning, fontSize: theme.fontSizes.xxlarge }}>Smart IOT APP</Text>
      <Text style={{ fontFamily: theme.fonts.medium, color:theme.colors.secondary, fontSize: theme.fontSizes.xlarge }}>Test Functioneaza</Text>
      <Text style={{ fontFamily: theme.fonts.medium, color:theme.colors.text, fontSize: theme.fontSizes.xlarge }}>Test Functioneaza</Text>
      <Text style={{ fontFamily: theme.fonts.medium, color:theme.colors.success, fontSize: theme.fontSizes.xlarge }}>Test Functioneaza</Text>
      <Text style={{ fontFamily: theme.fonts.medium, color:theme.colors.error, fontSize: theme.fontSizes.xlarge }}>Test Functioneaza</Text>
      <Text style={{ fontFamily: theme.fonts.medium, color:theme.colors.warning, fontSize: theme.fontSizes.xlarge }}>Test Functioneaza</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
