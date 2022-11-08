import { extendTheme } from 'native-base';

export const customTheme = extendTheme({
  colors: {
    gray: {
      10: '#FFF7FF',
      20: '#F6F6F6',
    },
    dark: {
      800: '#15121E',
    },
    yellow: {
      500: '#FFA30C',
    },
    blue: {
      800: '#2017b6',
    },
  },
  fonts: {
    light: 'Sora_300Light',
    regular: 'Sora_400Regular',
    heading: 'Sora_600SemiBold',
  },
});
