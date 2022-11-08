import { FlatList, View, VStack } from 'native-base';
import { Header } from '../components/Header';

import Ellipsis1 from '../assets/ellipsis1.svg';
import Ellipsis2 from '../assets/ellipsis2.svg';
import Ellipsis3 from '../assets/ellipsis3.svg';

import { useNavigation } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import { data } from '../../data.json';
import { Button } from '../components/Button';
import { MovieCard } from '../components/MovieCard';

export function Catalog() {
  const [visibleItemId, setVisibleItemId] = useState<string>('');

  const { navigate } = useNavigation();

  const onViewableItemsChanged = useCallback(({ changed }) => {
    setVisibleItemId((oldState) => {
      if (oldState !== changed[0].item.id) return changed[0].item.id;
      return oldState;
    });
  }, []);

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 95 });

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
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig.current}
          renderItem={({ item }) => <MovieCard data={item} />}
        />

        <Button
          mt={5}
          handleClick={() => navigate('MovieInfo', { id: visibleItemId })}
        />
      </View>
    </VStack>
  );
}
