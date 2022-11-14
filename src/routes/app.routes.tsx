import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Catalog } from '../screens/Catalog';
import { MovieInfo } from '../screens/MovieInfo';
import { Select } from '../screens/Select';
import { Ticket } from '../screens/Ticket';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: true,
        statusBarColor: 'transparent',
        statusBarStyle: 'dark',
      }}
    >
      <Screen name="Catalog" component={Catalog} />
      <Screen name="MovieInfo" component={MovieInfo} />
      <Screen name="Select" component={Select} />
      <Screen name="Ticket" component={Ticket} />
    </Navigator>
  );
}
