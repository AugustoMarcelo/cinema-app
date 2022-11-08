import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Catalog } from '../screens/Catalog';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: true,
      }}
    >
      <Screen name="Catalog" component={Catalog} />
    </Navigator>
  );
}
