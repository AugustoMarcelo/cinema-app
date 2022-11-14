import { StyledProps, Text, View } from 'native-base';
import { ReactNode } from 'react';

interface TicketInfoContainerProps extends StyledProps {
  children: ReactNode;
}

function TicketInfoContainer({ children, ...rest }: TicketInfoContainerProps) {
  return (
    <View
      mt={6}
      mb={2}
      alignSelf="stretch"
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      {children}
    </View>
  );
}

interface TicketInfoBlockProps extends StyledProps {
  label: string;
  value: string;
  screen?: 'Ticket' | 'MovieInfo';
}

function TicketInfoBlock({
  label,
  value,
  screen = 'Ticket',
  ...rest
}: TicketInfoBlockProps) {
  return (
    <View {...rest}>
      <Text
        color="purple.100"
        fontSize="xs"
        fontFamily="regular"
        textAlign="center"
      >
        {label}
      </Text>
      <Text
        color="gray.20"
        fontSize={screen === 'Ticket' ? 'sm' : 'md'}
        fontFamily="heading"
        textAlign="center"
      >
        {value}
      </Text>
    </View>
  );
}

export const TicketInfo = {
  Container: TicketInfoContainer,
  Block: TicketInfoBlock,
};
