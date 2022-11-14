import {
  IPressableProps,
  ITextProps,
  Pressable,
  StyledProps,
  Text,
  useTheme,
  View,
} from 'native-base';
import { ReactNode } from 'react';

export interface SeatProps {
  status: 'free' | 'selected' | 'occuped';
  number: number;
}

interface SeatItemProps extends IPressableProps {
  data: SeatProps;
  size?: number;
  showSeatNumber?: boolean;
}

function SeatItem({
  data,
  size = 6,
  showSeatNumber = true,
  ...rest
}: SeatItemProps) {
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

interface SeatRowProps extends StyledProps {
  children: ReactNode;
}

function SeatRow({ children, ...rest }: SeatRowProps) {
  return (
    <View flexDir="row" {...rest}>
      {children}
    </View>
  );
}

interface SeatLetterRootProps extends StyledProps {
  children: ReactNode;
}

function SeatLetterRoot({ children }: SeatLetterRootProps) {
  return (
    <View width={4} mx={4} alignItems="center" justifyContent="center">
      {children}
    </View>
  );
}

interface SeatLetterItemProps extends ITextProps {
  isSelected: boolean;
  children: ReactNode;
}

function SeatLetterItem({
  isSelected,
  children,
  ...rest
}: SeatLetterItemProps) {
  return (
    <Text
      fontSize="lg"
      fontFamily="regular"
      color={isSelected ? 'gray.20' : 'purple.100'}
      {...rest}
    >
      {children}
    </Text>
  );
}

interface SeatRootProps extends StyledProps {
  children: ReactNode;
}

function SeatRoot({ children, ...rest }: SeatRootProps) {
  return (
    <View
      alignSelf="stretch"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      mb={2}
      {...rest}
    >
      {children}
    </View>
  );
}

export const Seat = {
  Root: SeatRoot,
  Item: SeatItem,
  Row: SeatRow,
  LetterRoot: SeatLetterRoot,
  LetterItem: SeatLetterItem,
};
