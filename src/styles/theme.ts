import { extendTheme } from 'native-base';

export const customTheme = extendTheme({
  colors: {
    gray: {
      10: '#FFF7FF',
      20: '#F6F6F6',
    },
    dark: {
      800: '#15121E',
      900: '#12101B',
    },
    yellow: {
      500: '#FFA30C',
    },
    blue: {
      10: '#676080',
      50: '#362e53',
      100: '#312c44',
      200: '#272238',
      700: '#2c19f2',
      800: '#2017b6',
      900: '#0c0164',
    },
    purple: {
      100: '#A871F3',
      200: '#CC77FD',
    },
  },
  sizes: {
    17: 72,
  },
  fonts: {
    light: 'Sora_300Light',
    regular: 'Sora_400Regular',
    heading: 'Sora_600SemiBold',
  },
});
