import { StyledProps, View } from 'native-base';

interface Props extends StyledProps {
  size: 'small' | 'large';
}

export function TicketDetach({ size, ...rest }: Props) {
  return (
    <View
      height={size === 'small' ? 2 : 7}
      width={size === 'small' ? 2 : 7}
      bgColor="dark.800"
      mr={2}
      rounded="full"
      {...rest}
    />
  );
}
