import { IPressableProps, Pressable, Text, useTheme } from 'native-base';

export interface SeatProps {
  status: 'free' | 'selected' | 'occuped';
  number: number;
}

interface Props extends IPressableProps {
  data: SeatProps;
  size?: number;
  showSeatNumber?: boolean;
}

export function Seat({
  data,
  size = 6,
  showSeatNumber = true,
  ...rest
}: Props) {
  const { colors } = useTheme();

  const getBgColor = (state: 'free' | 'occuped' | 'selected') => {
    switch (state) {
      case 'selected':
        return colors.blue[800];
      case 'occuped':
        return colors.blue[10];
      default:
        return 'transparent';
    }
  };

  return (
    <Pressable
      alignItems="center"
      justifyContent="center"
      rounded="full"
      width={size}
      height={size}
      borderWidth={1}
      borderColor={data.status === 'selected' ? 'blue.800' : 'blue.10'}
      bgColor={getBgColor(data.status)}
      {...rest}
    >
      {data.status === 'selected' && showSeatNumber && (
        <Text
          fontFamily="regular"
          fontSize="2xs"
          color="gray.20"
          lineHeight="xs"
        >
          {data.number}
        </Text>
      )}
    </Pressable>
  );
}
