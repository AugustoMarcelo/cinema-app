import { IPressableProps, Pressable, Text } from 'native-base';
import { SelectTime } from '../utils';

interface TimePickerProps extends IPressableProps {
  data: SelectTime;
}

export function TimePicker({ data, ...rest }: TimePickerProps) {
  return (
    <Pressable
      py={1}
      px={3}
      mr={2}
      rounded="3xl"
      bgColor={data.isSelected ? 'blue.700' : 'transparent'}
      alignItems="center"
      justifyContent="center"
      borderWidth={2}
      borderColor={data.isSelected ? 'blue.700' : 'blue.50'}
      {...rest}
    >
      <Text
        color="gray.20"
        fontFamily={data.isSelected ? 'heading' : 'regular'}
        fontSize="xs"
        lineHeight="md"
      >
        {data.time}
      </Text>
    </Pressable>
  );
}
