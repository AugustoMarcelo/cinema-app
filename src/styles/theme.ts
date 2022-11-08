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
      800: '#2017b6',
    },
    purple: {
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
