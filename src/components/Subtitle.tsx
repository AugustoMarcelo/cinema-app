import { Text, View } from 'native-base';
import { Seat } from './Seat';

export function Subtitle() {
  return (
    <View
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      mx={6}
      mt={3}
    >
      <View flexDir="row" alignItems="center">
        <Seat.Item data={{ number: 0, status: 'free' }} size={4} mr={2} />
        <Text color="gray.20" fontFamily="regular" fontSize="sm">
          Livre
        </Text>
      </View>

      <View flexDir="row" alignItems="center">
        <Seat.Item data={{ number: 0, status: 'occuped' }} size={4} mr={2} />
        <Text color="gray.20" fontFamily="regular" fontSize="sm">
          Ocupado
        </Text>
      </View>

      <View flexDir="row" alignItems="center">
        <Seat.Item
          data={{ number: 0, status: 'selected' }}
          showSeatNumber={false}
          size={4}
          mr={2}
        />
        <Text color="gray.20" fontFamily="regular" fontSize="sm">
          Selecionado
        </Text>
      </View>
    </View>
  );
}
