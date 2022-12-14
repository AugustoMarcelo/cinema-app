import { useRoute } from '@react-navigation/native';
import * as Share from 'expo-sharing';
import { Image, Text, useToast, View, VStack } from 'native-base';
import { useEffect, useRef, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { captureRef, captureScreen } from 'react-native-view-shot';

import { data } from '../../data.json';

import { ActionButton } from '../components/ActionButton';
import { Header } from '../components/Header';
import { MovieCardProps } from '../components/MovieCard';
import { TicketDetach } from '../components/TicketDetach';
import { TicketInfo } from '../components/TicketInfo';
import { generateHashCodeFrom } from '../utils';

interface RouteParams {
  movieId: string;
  date: string;
  time: string;
  rows: string;
  seats: string;
}

export function Ticket() {
  const screenshotAreaRef = useRef(null);
  const toast = useToast();
  const route = useRoute();
  const { movieId, date, time, rows, seats } = route.params as RouteParams;

  const [movie, setMovie] = useState<MovieCardProps>({} as MovieCardProps);
  const [room] = useState(Math.ceil(Math.random() * 10));
  const reservationCode = generateHashCodeFrom(
    String(`${movieId}${room}${date}${time}${rows}${seats}`)
  );

  useEffect(() => {
    setMovie(data.filter((item) => String(item.id) === String(movieId))[0]);
  }, [movieId]);

  async function shareScreenshot() {
    const screenshot = await captureRef(screenshotAreaRef);

    await Share.shareAsync(`file://${screenshot}`);
  }

  async function saveScreenshot() {
    const uri = await captureScreen({ format: 'jpg' });

    if (uri) {
      toast.show({
        title: 'Ticket salvo em: ',
        description: uri,
        bgColor: 'green.500',
        placement: 'top',
      });
    }
  }

  return (
    <VStack flex={1} alignItems="center" bgColor="dark.800">
      <Header showBackButton title="Ticket" />

      <View
        ref={screenshotAreaRef}
        position="relative"
        alignItems="center"
        rounded="2xl"
        overflow="hidden"
        mt={20}
        mx={10}
        pb={6}
        style={{
          backgroundColor: 'rgba(32, 23, 182, 0.2)',
        }}
      >
        <Image
          source={{ uri: movie.cover_url }}
          resizeMode="cover"
          height={48}
          width={72}
          alt={movie.title || 'Movie cover'}
        />

        <Text
          mt={1}
          mb={2}
          mx={8}
          color="gray.20"
          fontSize="sm"
          fontFamily="heading"
          textTransform="uppercase"
          textAlign="center"
        >
          {movie.title}
        </Text>

        <Text
          color="purple.100"
          fontSize="xs"
          fontFamily="regular"
          textAlign="center"
        >
          {movie.directed_by}
        </Text>

        <View
          alignSelf="stretch"
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          mx={8}
        >
          <TicketInfo.Container>
            <TicketInfo.Block label="Data" value={date} mb={2} />
            <TicketInfo.Block label="Sala" value={String(room)} />
          </TicketInfo.Container>

          <TicketInfo.Container>
            <TicketInfo.Block label="Hor??rio" value={time} />
            <TicketInfo.Block label="Fileira" value={rows} />
          </TicketInfo.Container>

          <TicketInfo.Container>
            <TicketInfo.Block label="Visual" value="3D" />
            <TicketInfo.Block label="Assento" value={seats} />
          </TicketInfo.Container>
        </View>

        <TicketInfo.Container mb={0} mt={4}>
          <TicketInfo.Block
            label="Endere??o"
            value="Av. Serid??, 659 - 3?? piso"
          />
        </TicketInfo.Container>

        <View
          position="absolute"
          bottom={112}
          left={-13}
          flexDir="row"
          alignItems="center"
        >
          {Array.from({ length: 17 }).map((_, index, thisArray) => {
            if (index === 0) return <TicketDetach key={index} size="large" />;
            if (index === thisArray.length - 1)
              return <TicketDetach key={index} size="large" mr={0} />;
            return <TicketDetach key={index} size="small" />;
          })}
        </View>

        <View
          alignSelf="stretch"
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          mt={12}
          mx={6}
        >
          <View alignItems="flex-start">
            <Text
              color="purple.100"
              fontSize="xs"
              fontFamily="regular"
              textAlign="center"
            >
              C??digo da Reserva
            </Text>
            <Text
              color="gray.20"
              fontSize="md"
              fontFamily="regular"
              textAlign="center"
            >
              {reservationCode}
            </Text>
          </View>

          <View
            height={17}
            width={17}
            alignItems="center"
            justifyContent="center"
            bgColor="gray.200"
          >
            <QRCode
              value={String(reservationCode)}
              size={64}
              backgroundColor="transparent"
            />
          </View>
        </View>
      </View>

      <View
        alignSelf="stretch"
        flexDir="row"
        mt={6}
        mx={10}
        alignItems="center"
        justifyContent="space-between"
      >
        <ActionButton iconName="trash" />
        <ActionButton iconName="download" onPress={saveScreenshot} />
        <ActionButton iconName="share-2" onPress={shareScreenshot} />
      </View>
    </VStack>
  );
}
