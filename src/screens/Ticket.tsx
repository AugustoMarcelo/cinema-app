import { Image, Text, View, VStack } from 'native-base';
import QRCode from 'react-native-qrcode-svg';
import { Header } from '../components/Header';

import { data } from '../../data.json';
import { ActionButton } from '../components/ActionButton';

export function Ticket() {
  return (
    <VStack flex={1} alignItems="center" bgColor="dark.800">
      <Header showBackButton title="Ticket" />

      <View
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
          source={{ uri: data[0].cover_url }}
          resizeMode="cover"
          height={48}
          width={72}
          alt={data[0].title}
        />

        <Text
          mt={1}
          mb={2}
          color="gray.20"
          fontSize="sm"
          fontFamily="heading"
          textTransform="uppercase"
          textAlign="center"
        >
          {data[0].title}
        </Text>

        <Text
          color="purple.100"
          fontSize="xs"
          fontFamily="regular"
          textAlign="center"
        >
          {data[0].directed_by}
        </Text>

        <View
          alignSelf="stretch"
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          mx={8}
        >
          <View
            mt={6}
            mb={2}
            alignSelf="stretch"
            alignItems="center"
            justifyContent="space-between"
          >
            <View mb={2}>
              <Text
                color="purple.100"
                fontSize="xs"
                fontFamily="regular"
                textAlign="center"
              >
                Data
              </Text>
              <Text
                color="gray.20"
                fontSize="sm"
                fontFamily="heading"
                textAlign="center"
              >
                24 Jun
              </Text>
            </View>
            <View>
              <Text
                color="purple.100"
                fontSize="xs"
                fontFamily="regular"
                textAlign="center"
              >
                Sala
              </Text>
              <Text
                color="gray.20"
                fontSize="sm"
                fontFamily="heading"
                textAlign="center"
              >
                3
              </Text>
            </View>
          </View>

          <View
            mt={6}
            mb={2}
            alignSelf="stretch"
            alignItems="center"
            justifyContent="space-between"
          >
            <View mb={2}>
              <Text
                color="purple.100"
                fontSize="xs"
                fontFamily="regular"
                textAlign="center"
              >
                Horário
              </Text>
              <Text
                color="gray.20"
                fontSize="sm"
                fontFamily="heading"
                textAlign="center"
              >
                20:00
              </Text>
            </View>
            <View>
              <Text
                color="purple.100"
                fontSize="xs"
                fontFamily="regular"
                textAlign="center"
              >
                Fileira
              </Text>
              <Text
                color="gray.20"
                fontSize="sm"
                fontFamily="heading"
                textAlign="center"
              >
                H
              </Text>
            </View>
          </View>

          <View
            mt={6}
            mb={2}
            alignSelf="stretch"
            alignItems="center"
            justifyContent="space-between"
          >
            <View mb={2}>
              <Text
                color="purple.100"
                fontSize="xs"
                fontFamily="regular"
                textAlign="center"
              >
                Visual
              </Text>
              <Text
                color="gray.20"
                fontSize="sm"
                fontFamily="heading"
                textAlign="center"
              >
                3D
              </Text>
            </View>
            <View>
              <Text
                color="purple.100"
                fontSize="xs"
                fontFamily="regular"
                textAlign="center"
              >
                Assento
              </Text>
              <Text
                color="gray.20"
                fontSize="sm"
                fontFamily="heading"
                textAlign="center"
              >
                6
              </Text>
            </View>
          </View>
        </View>

        <View mt={4}>
          <Text
            color="purple.100"
            fontSize="xs"
            fontFamily="regular"
            textAlign="center"
          >
            Endereço
          </Text>
          <Text
            color="gray.20"
            fontSize="sm"
            fontFamily="heading"
            textAlign="center"
          >
            Av. Camilo Calazans
          </Text>
        </View>

        <View
          position="absolute"
          bottom={112}
          left={-13}
          flexDir="row"
          alignItems="center"
        >
          <View height={7} width={7} bgColor="dark.800" mr={2} rounded="full" />

          <View height={2} width={2} bgColor="dark.800" mr={2} rounded="full" />
          <View height={2} width={2} bgColor="dark.800" mr={2} rounded="full" />
          <View height={2} width={2} bgColor="dark.800" mr={2} rounded="full" />
          <View height={2} width={2} bgColor="dark.800" mr={2} rounded="full" />
          <View height={2} width={2} bgColor="dark.800" mr={2} rounded="full" />
          <View height={2} width={2} bgColor="dark.800" mr={2} rounded="full" />
          <View height={2} width={2} bgColor="dark.800" mr={2} rounded="full" />
          <View height={2} width={2} bgColor="dark.800" mr={2} rounded="full" />
          <View height={2} width={2} bgColor="dark.800" mr={2} rounded="full" />
          <View height={2} width={2} bgColor="dark.800" mr={2} rounded="full" />
          <View height={2} width={2} bgColor="dark.800" mr={2} rounded="full" />
          <View height={2} width={2} bgColor="dark.800" mr={2} rounded="full" />
          <View height={2} width={2} bgColor="dark.800" mr={2} rounded="full" />
          <View height={2} width={2} bgColor="dark.800" mr={2} rounded="full" />
          <View height={2} width={2} bgColor="dark.800" mr={2} rounded="full" />

          <View height={7} width={7} bgColor="dark.800" rounded="full" />
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
              Código da Reserva
            </Text>
            <Text
              color="gray.20"
              fontSize="md"
              fontFamily="regular"
              textAlign="center"
            >
              166973
            </Text>
          </View>

          <View
            height={17}
            width={17}
            alignItems="center"
            justifyContent="center"
            bgColor="gray.200"
          >
            <QRCode value="166973" size={64} backgroundColor="transparent" />
          </View>
        </View>
      </View>

      <View
        alignSelf="stretch"
        flexDir="row"
        mt={8}
        mx={10}
        alignItems="center"
        justifyContent="space-between"
      >
        <ActionButton iconName="trash" />
        <ActionButton iconName="download" />
        <ActionButton iconName="share-2" />
      </View>
    </VStack>
  );
}
