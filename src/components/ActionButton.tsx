import { Feather } from '@expo/vector-icons';
import {
  Button as NativeBaseButton,
  Icon,
  StyledProps,
  View,
} from 'native-base';
import { GestureResponderEvent } from 'react-native';
import InsetShadow from 'react-native-inset-shadow';

interface Props extends StyledProps {
  iconName: any;
  handleClick?: (event: GestureResponderEvent) => void;
}

export function ActionButton({ handleClick, iconName, ...rest }: Props) {
  return (
    <View
      rounded="full"
      height={10}
      width={10}
      style={{
        shadowColor: 'rgba(151,71,255,0.9)',
      }}
      shadow="5"
      alignItems="center"
      justifyContent="center"
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
            <Icon as={<Feather name={iconName} />} color="white" size={5} />
          }
          bgColor="blue.800"
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
          onPress={handleClick}
        />
      </InsetShadow>
    </View>
  );
}
