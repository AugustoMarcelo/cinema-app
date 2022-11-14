import { Ionicons } from '@expo/vector-icons';
import { Icon, Image, Text, View } from 'native-base';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface MovieCardProps {
  id: number;
  title: string;
  cover_url: string;
  directed_by: string;
  overview: string;
  duration: number;
}

interface Props extends TouchableOpacityProps {
  data: MovieCardProps;
}

export function MovieCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <View width={72} mx={5}>
        <View alignItems="center">
          <Image
            source={{ uri: data.cover_url }}
            rounded="2xl"
            alt="Movie cover URL"
            mb={10}
            style={{
              height: 336,
              width: 272,
            }}
            resizeMode="cover"
          />
          <Text
            color="gray.20"
            fontSize="lg"
            fontFamily="heading"
            textTransform="uppercase"
            textAlign="center"
          >
            {data.title}
          </Text>
          <Text
            color="purple.100"
            fontSize="sm"
            fontFamily="regular"
            textAlign="center"
            mt={2}
            mb={4}
          >
            {data.directed_by}
          </Text>
          <View flexDirection="row">
            {Array.from({ length: 5 }).map((_, index: number) => (
              <Icon
                key={index}
                as={<Ionicons name="star" />}
                color="yellow.500"
                size="lg"
                mr={2}
              />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
