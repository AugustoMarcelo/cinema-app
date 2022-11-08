import { Entypo } from '@expo/vector-icons';
import {
  Button as NativeBaseButton,
  Icon,
  StyledProps,
  Text,
  View,
} from 'native-base';
import { GestureResponderEvent } from 'react-native';
import InsetShadow from 'react-native-inset-shadow';

interface Props extends StyledProps {
  handleClick?: (event: GestureResponderEvent) => void;
}

export function Button({ handleClick, ...rest }: Props) {
  return (
    <View
      rounded="full"
      height={12}
      style={{
        shadowColor: 'rgba(151,71,255,0.9)',
        shadowRadius: 40,
        shadowOffset: {
          width: 0,
          height: 12,
        },
      }}
      shadow="9"
      {...rest}
    >
      <InsetShadow
        shadowRadius={40}
        shadowOffset={12}
        shadowColor="rgba(255, 255, 255, 0.6)"
        right={false}
        left={false}
        bottom={false}
        containerStyle={{
          borderRadius: 25,
        }}
      >
        <NativeBaseButton
          leftIcon={
            <Icon as={<Entypo name="ticket" />} color="white" size={6} />
          }
          bgColor="blue.800"
          py={3}
          px={12}
          rounded="full"
          style={{
            shadowColor: '#fff',
            shadowRadius: 40,
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 1,
          }}
          shadow="9"
          onPress={handleClick}
        >
          <Text
            color="gray.20"
            textTransform="uppercase"
            fontFamily="heading"
            fontSize="16"
            ml={3}
          >
            Comprar
          </Text>
        </NativeBaseButton>
      </InsetShadow>
    </View>
  );
}
