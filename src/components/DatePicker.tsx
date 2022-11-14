import { IPressableProps, Pressable, Text, View } from 'native-base';
import { SelectDate } from '../utils';

interface DatePickerProps extends IPressableProps {
  data: SelectDate;
}

export function DatePicker({ data, ...rest }: DatePickerProps) {
  return (
    <Pressable
      p={1}
      mr={8}
      rounded="3xl"
      bgColor={data.isSelected ? 'blue.700' : 'blue.100'}
      alignItems="center"
      {...rest}
    >
      <View
        bgColor={data.isSelected ? 'blue.900' : 'blue.200'}
        width={data.isSelected ? 10 : 8}
        height={data.isSelected ? 10 : 8}
        mb={2}
        rounded="full"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          color="gray.20"
          fontFamily={data.isSelected ? 'heading' : 'regular'}
          fontSize={data.isSelected ? 'md' : 'sm'}
        >
          {data.day}
        </Text>
      </View>
      <Text
        color="gray.20"
        fontFamily={data.isSelected ? 'heading' : 'regular'}
        fontSize={data.isSelected ? 'md' : 'xs'}
        mb={data.isSelected ? 2 : 1}
        textTransform="capitalize"
      >
        {data.shortDay}
      </Text>
    </Pressable>
  );
}
