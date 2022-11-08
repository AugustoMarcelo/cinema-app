import { Entypo, Ionicons } from '@expo/vector-icons';
import { Button, FlatList, Icon, Image, Text, View, VStack } from 'native-base';
import InsetShadow from 'react-native-inset-shadow';
import { Header } from '../components/Header';

import Ellipsis1 from '../assets/ellipsis1.svg';
import Ellipsis2 from '../assets/ellipsis2.svg';
import Ellipsis3 from '../assets/ellipsis3.svg';

import { data } from '../../data.json';

export function Catalog() {
  return (
    <VStack flex={1} bgColor="dark.800" position="relative">
      <Header />

      <Ellipsis1 />

      <Ellipsis2 />

      <Ellipsis3 />

      <View
        mt={20}
        alignItems="center"
        justifyContent="center"
        position="absolute"
        zIndex={100}
      >
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          _contentContainerStyle={{
            mt: 10,
            ml: 4,
          }}
          snapToInterval={82}
          bounces={false}
          decelerationRate={0}
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View width={72} mx={5}>
              <View alignItems="center">
                <Image
                  source={{ uri: item.cover_url }}
                  rounded="2xl"
                  alt="Movie cover URL"
                  mb={10}
                  style={{
                    height: 336,
                    width: 272,
                  }}
                />
                <Text
                  color="gray.20"
                  fontSize="lg"
                  fontFamily="heading"
                  textTransform="uppercase"
                  textAlign="center"
                >
                  {item.title}
                </Text>
                <Text
                  color="#676080"
                  fontSize="sm"
                  fontFamily="regular"
                  textAlign="center"
                  mt={2}
                  mb={4}
                >
                  {item.directed_by}
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
          )}
        />

        <View
          mt={5}
          rounded="full"
          height={12}
          style={{
            shadowColor: 'rgba(151,71,255,0.5)',
            shadowRadius: 40,
            shadowOffset: {
              width: 0,
              height: 12,
            },
          }}
          shadow="9"
        >
          <InsetShadow
            shadowRadius={40}
            shadowOffset={12}
            shadowColor="rgba(255, 255, 255, 0.6)"
            right={false}
            left={false}
            bottom={false}
            containerStyle={{
              borderRadius: 25,
            }}
          >
            <Button
              leftIcon={
                <Icon as={<Entypo name="ticket" />} color="white" size={6} />
              }
              bgColor="blue.800"
              py={3}
              px={12}
              rounded="full"
              style={{
                shadowColor: '#fff',
                shadowRadius: 40,
                shadowOffset: {
                  width: 0,
                  height: 12,
                },
                shadowOpacity: 1,
              }}
              shadow="9"
            >
              <Text
                color="white"
                textTransform="uppercase"
                fontFamily="heading"
                fontSize="16"
                ml={3}
              >
                Comprar
              </Text>
            </Button>
          </InsetShadow>
        </View>
      </View>
    </VStack>
  );
}
