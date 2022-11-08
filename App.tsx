import {
  Sora_300Light,
  Sora_400Regular,
  Sora_600SemiBold,
  useFonts,
} from '@expo-google-fonts/sora';
import { NativeBaseProvider } from 'native-base';
import { Routes } from './src/routes';
import { customTheme } from './src/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Sora_300Light,
    Sora_400Regular,
    Sora_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <NativeBaseProvider theme={customTheme}>
      <Routes />
    </NativeBaseProvider>
  );
}
