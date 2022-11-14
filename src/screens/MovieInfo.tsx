import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon, Image, Text, useTheme, View, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

import { data } from '../../data.json';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { MovieCardProps } from '../components/MovieCard';
import { TicketInfo } from '../components/TicketInfo';

interface RouteParams {
  id: string;
}

export function MovieInfo() {
  const [movie, setMovie] = useState<MovieCardProps>({} as MovieCardProps);

  const { navigate } = useNavigation();
  const { sizes } = useTheme();
  const route = useRoute();
  const { id } = route.params as RouteParams;
  const { width } = Dimensions.get(`screen`);
  const movieHours = Math.floor(movie.duration / 60);
  const movieMinutes = movie.duration % 60;

  useEffect(() => {
    setMovie(data.filter((item) => String(item.id) === String(id))[0]);
  }, [id]);

  if (!movie) return null;

  return (
    <VStack
      flex={1}
      alignItems="center"
      justifyContent="flex-end"
      bgColor="dark.800"
    >
      <Header showBackButton />

      <Image
        source={{ uri: movie.cover_url }}
        alt={movie.title || 'Movie cover'}
        resizeMode="cover"
        style={[StyleSheet.absoluteFill]}
      />

      <View
        position="relative"
        bgColor="dark.900"
        px={6}
        pb={6}
        pt={12}
        mb={6}
        rounded="2xl"
        width={width - sizes[12]}
      >
        <View
          position="absolute"
          top={-35}
          left={3}
          bgColor="purple.200"
          rounded="full"
          height={17}
          width={17}
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={<Ionicons name="play" />} color="gray.20" size={6} />
        </View>
        <Text
          color="gray.20"
          fontSize="lg"
          fontFamily="heading"
          textTransform="uppercase"
          textAlign="center"
        >
          {movie.title}
        </Text>
        <Text
          color="purple.100"
          fontSize="sm"
          fontFamily="regular"
          textAlign="center"
          mt={2}
          mb={4}
        >
          {movie.directed_by}
        </Text>

        <View
          mt={6}
          mb={8}
          flexDir="row"
          alignItems="center"
          justifyContent="space-around"
        >
          <TicketInfo.Container mt={0} mb={0}>
            <TicketInfo.Block
              screen="MovieInfo"
              label="Gênero"
              value="Fantasia"
            />
          </TicketInfo.Container>

          <TicketInfo.Container mt={0} mb={0}>
            <TicketInfo.Block
              screen="MovieInfo"
              label="Duração"
              value={`${movieHours}h${movieMinutes}m`}
            />
          </TicketInfo.Container>

          <TicketInfo.Container mt={0} mb={0}>
            <TicketInfo.Block screen="MovieInfo" label="IMBd" value="4.9" />
          </TicketInfo.Container>
        </View>

        <Text
          fontFamily="light"
          fontSize="sm"
          color="gray.20"
          lineHeight="lg"
          textAlign="justify"
          numberOfLines={8}
          isTruncated
        >
          {movie.overview}
        </Text>
      </View>
      <Button mb={6} handleClick={() => navigate('Select', { movieId: id })} />
    </VStack>
  );
}
