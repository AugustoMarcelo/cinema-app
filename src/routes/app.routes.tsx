import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Catalog } from '../screens/Catalog';
import { MovieInfo } from '../screens/MovieInfo';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: true,
        statusBarColor: 'transparent',
      }}
    >
      <Screen name="Catalog" component={Catalog} />
      <Screen name="MovieInfo" component={MovieInfo} />
    </Navigator>
  );
}
