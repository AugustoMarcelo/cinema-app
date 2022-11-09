import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';
import { FlatList, Pressable, Text, useTheme, View, VStack } from 'native-base';
import { useState } from 'react';

import { Button } from '../components/Button';
import { Header } from '../components/Header';

import Ellipsis4 from '../assets/ellipsis4.svg';
// import Light from '../assets/light.svg';
import Screen1 from '../assets/screen1.svg';
import Screen2 from '../assets/screen2.svg';

interface SelectDate {
  day: string;
  shortDay: string;
  isSelected: boolean;
}

interface SelectTime {
  time: string;
  isSelected: boolean;
}

interface Seat {
  status: 'free' | 'selected' | 'occuped';
  number: number;
}

interface SeatsRow {
  leftSeats: Seat[];
  rowLetter: string;
  rightSeats: Seat[];
}

interface SelectedSeat {
  rowLetter: string;
  number: number;
}

export function Select() {
  const { colors } = useTheme();

  const [dates, setDates] = useState<SelectDate[]>(
    Array.from({ length: 10 }).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      let isSelected = false;

      if (dayjs().isSame(date, 'day')) {
        isSelected = true;
      }

      return {
        day: String(date.getDate()).padStart(2, '0'),
        shortDay: dayjs(date).locale(ptBR).format('ddd'),
        isSelected,
      };
    })
  );

  const [times, setTimes] = useState<SelectTime[]>(
    Array.from({ length: 24 - new Date().getHours() }).map((_, index) => {
      const currentHour = new Date().getHours();
      const currentHourIncremented = currentHour + index;
      let isSelected = false;

      if (currentHour === currentHourIncremented) isSelected = true;

      return {
        time: `${String(currentHourIncremented).padStart(2, '0')}:00`,
        isSelected,
      };
    })
  );

  const [seatsRows, setSeatsRows] = useState<SeatsRow[]>([
    {
      leftSeats: Array.from<Seat>({ length: 3 }).map((_, index) => ({
        number: index + 1,
        status: 'free',
      })),
      rowLetter: 'A',
      rightSeats: Array.from<Seat>({ length: 3 }).map((_, index) => ({
        number: index + 1 + 3,
        status: 'free',
      })),
    },
    {
      leftSeats: Array.from<Seat>({ length: 4 }).map((_, index) => ({
        number: index + 1,
        status: 'free',
      })),
      rowLetter: 'B',
      rightSeats: Array.from<Seat>({ length: 4 }).map((_, index) => ({
        number: index + 1 + 4,
        status: index + 1 + 4 <= 7 ? 'occuped' : 'free',
      })),
    },
    {
      leftSeats: Array.from<Seat>({ length: 4 }).map((_, index) => ({
        number: index + 1,
        status: index + 1 < 4 ? 'free' : 'occuped',
      })),
      rowLetter: 'C',
      rightSeats: Array.from<Seat>({ length: 4 }).map((_, index) => ({
        number: index + 1 + 4,
        status: index + 1 + 4 === 7 ? 'occuped' : 'free',
      })),
    },
    {
      leftSeats: Array.from<Seat>({ length: 4 }).map((_, index) => ({
        number: index + 1,
        status: index + 1 < 3 ? 'free' : 'occuped',
      })),
      rowLetter: 'D',
      rightSeats: Array.from<Seat>({ length: 4 }).map((_, index) => {
        const seats = {
          6: 'selected',
          8: 'occuped',
        };
        return {
          number: index + 1 + 4,
          status: seats[index + 1 + 4] ?? 'free',
        };
      }),
    },
    {
      leftSeats: Array.from<Seat>({ length: 4 }).map((_, index) => ({
        number: index + 1,
        status: [1, 4].includes(index + 1) ? 'occuped' : 'free',
      })),
      rowLetter: 'E',
      rightSeats: Array.from<Seat>({ length: 4 }).map((_, index) => ({
        number: index + 1 + 4,
        status: index + 1 + 4 === 7 ? 'occuped' : 'free',
      })),
    },
    {
      leftSeats: Array.from<Seat>({ length: 4 }).map((_, index) => ({
        number: index + 1,
        status: 'occuped',
      })),
      rowLetter: 'F',
      rightSeats: Array.from<Seat>({ length: 4 }).map((_, index) => ({
        number: index + 1 + 4,
        status: index + 1 + 4 < 8 ? 'occuped' : 'free',
      })),
    },
    {
      leftSeats: Array.from<Seat>({ length: 4 }).map((_, index) => ({
        number: index + 1,
        status: index + 1 > 1 ? 'occuped' : 'free',
      })),
      rowLetter: 'G',
      rightSeats: Array.from<Seat>({ length: 4 }).map((_, index) => ({
        number: index + 1 + 4,
        status: index + 1 + 4 === 5 ? 'occuped' : 'free',
      })),
    },
    {
      leftSeats: Array.from<Seat>({ length: 3 }).map((_, index) => ({
        number: index + 1,
        status: index + 1 > 1 ? 'occuped' : 'free',
      })),
      rowLetter: 'H',
      rightSeats: Array.from<Seat>({ length: 3 }).map((_, index) => ({
        number: index + 1 + 4,
        status: 'free',
      })),
    },
  ]);

  const [selectedRowsLetter, setSelectedRowsLetter] = useState<string[]>(() => {
    const lettersSet = new Set<string>();
    seatsRows.forEach((row) => {
      if (row.leftSeats.some((item) => item.status === 'selected')) {
        lettersSet.add(row.rowLetter);
      }

      if (row.rightSeats.some((item) => item.status === 'selected')) {
        lettersSet.add(row.rowLetter);
      }
    });
    return Array.from(lettersSet);
  });

  const getBgColor = (state: 'free' | 'occuped' | 'selected') => {
    switch (state) {
      case 'selected':
        return colors.blue[800];
      case 'occuped':
        return colors.blue[10];
      default:
        return 'transparent';
    }
  };

  function handleSelectDate(selected: SelectDate) {
    setDates((oldState) => {
      return oldState.map((item) => {
        if (item.day === selected.day && !item.isSelected)
          item.isSelected = true;

        if (item.day !== selected.day && item.isSelected)
          item.isSelected = false;

        return item;
      });
    });
  }

  function handleSelectTime(selected: SelectTime) {
    setTimes((oldState) => {
      return oldState.map((item) => {
        if (item.time === selected.time && !item.isSelected)
          item.isSelected = true;

        if (item.time !== selected.time && item.isSelected)
          item.isSelected = false;

        return item;
      });
    });
  }

  function handleSelectSeat({ rowLetter, number }: SelectedSeat) {
    const lettersSet = new Set<string>();

    setSeatsRows((oldState) => {
      const newState = oldState.map((row) => {
        if (row.rowLetter === rowLetter) {
          row.leftSeats.map((seat) => {
            if (seat.number === number && seat.status === 'free') {
              seat.status = 'selected';
              return seat;
            }

            if (seat.number === number && seat.status === 'selected') {
              seat.status = 'free';
              return seat;
            }

            return seat;
          });

          row.rightSeats.map((seat) => {
            if (seat.number === number && seat.status === 'free') {
              seat.status = 'selected';
              return seat;
            }

            if (seat.number === number && seat.status === 'selected') {
              seat.status = 'free';
              return seat;
            }

            return seat;
          });
        }
        return row;
      });

      newState.forEach((row) => {
        if (row.leftSeats.some((item) => item.status === 'selected')) {
          lettersSet.add(row.rowLetter);
        }

        if (row.rightSeats.some((item) => item.status === 'selected')) {
          lettersSet.add(row.rowLetter);
        }
      });

      return newState;
    });

    setSelectedRowsLetter(Array.from(lettersSet));
  }

  return (
    <VStack flex={1} alignItems="center" bgColor="dark.800">
      <Header showBackButton title="Selecionar" />

      <Ellipsis4 />
      {/* <Light /> */}

      <View
        flex={1}
        mt={16}
        alignItems="center"
        justifyContent="center"
        position="absolute"
        zIndex={100}
      >
        <FlatList
          data={dates}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => String(item.day)}
          _contentContainerStyle={{
            alignItems: 'center',
            mt: 10,
            pl: 6,
          }}
          renderItem={({ item }) => (
            <Pressable
              p={1}
              mr={8}
              rounded="3xl"
              bgColor={item.isSelected ? 'blue.700' : 'blue.100'}
              alignItems="center"
              onPress={() => handleSelectDate(item)}
            >
              <View
                bgColor={item.isSelected ? 'blue.900' : 'blue.200'}
                width={item.isSelected ? 10 : 8}
                height={item.isSelected ? 10 : 8}
                mb={2}
                rounded="full"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  color="gray.20"
                  fontFamily={item.isSelected ? 'heading' : 'regular'}
                  fontSize={item.isSelected ? 'md' : 'sm'}
                >
                  {item.day}
                </Text>
              </View>
              <Text
                color="gray.20"
                fontFamily={item.isSelected ? 'heading' : 'regular'}
                fontSize={item.isSelected ? 'md' : 'xs'}
                mb={item.isSelected ? 2 : 1}
                textTransform="capitalize"
              >
                {item.shortDay}
              </Text>
            </Pressable>
          )}
        />

        <FlatList
          data={times}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.time}
          _contentContainerStyle={{
            alignItems: 'center',
            my: 6,
            pl: 6,
          }}
          renderItem={({ item }) => (
            <Pressable
              py={1}
              px={3}
              mr={2}
              rounded="3xl"
              bgColor={item.isSelected ? 'blue.700' : 'transparent'}
              alignItems="center"
              justifyContent="center"
              borderWidth={2}
              borderColor={item.isSelected ? 'blue.700' : 'blue.50'}
              onPress={() => handleSelectTime(item)}
            >
              <Text
                color="gray.20"
                fontFamily={item.isSelected ? 'heading' : 'regular'}
                fontSize="xs"
                lineHeight="md"
              >
                {item.time}
              </Text>
            </Pressable>
          )}
        />

        <View alignSelf="stretch" mb={6} position="relative">
          <View position="absolute" left={10}>
            <Screen2 />
          </View>
          <View position="absolute" left={-5}>
            <Screen1 />
          </View>

          <View alignItems="center" ml={4} mt={12}>
            {seatsRows.map((seatsRow) => (
              <View
                alignSelf="stretch"
                key={seatsRow.rowLetter}
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <View flexDir="row" ml="auto">
                  {seatsRow.leftSeats.map((seat, index) => (
                    <Pressable
                      key={`${seatsRow.rowLetter}${seat.number}`}
                      alignItems="center"
                      justifyContent="center"
                      rounded="full"
                      width={6}
                      height={6}
                      borderWidth={1}
                      borderColor={
                        seat.status === 'selected' ? 'blue.800' : 'blue.10'
                      }
                      bgColor={getBgColor(seat.status)}
                      mr={index + 1 === seatsRow.leftSeats.length ? 0 : 3}
                      onPress={() =>
                        handleSelectSeat({
                          rowLetter: seatsRow.rowLetter,
                          number: seat.number,
                        })
                      }
                    >
                      {seat.status === 'selected' && (
                        <Text
                          fontFamily="regular"
                          fontSize="2xs"
                          color="gray.20"
                          lineHeight="xs"
                        >
                          {seat.number}
                        </Text>
                      )}
                    </Pressable>
                  ))}
                </View>
                <View
                  width={4}
                  mx={4}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text
                    fontSize="lg"
                    fontFamily="regular"
                    color={
                      selectedRowsLetter.some(
                        (letter) => letter === seatsRow.rowLetter
                      )
                        ? 'gray.20'
                        : 'purple.100'
                    }
                  >
                    {seatsRow.rowLetter}
                  </Text>
                </View>
                <View flexDir="row" mr="auto">
                  {seatsRow.rightSeats.map((seat) => (
                    <Pressable
                      key={`${seatsRow.rowLetter}${seat.number}`}
                      rounded="full"
                      width={6}
                      height={6}
                      borderWidth={1}
                      alignItems="center"
                      justifyContent="center"
                      borderColor={
                        seat.status === 'selected' ? 'blue.800' : 'blue.10'
                      }
                      bgColor={getBgColor(seat.status)}
                      mr={3}
                      onPress={() =>
                        handleSelectSeat({
                          rowLetter: seatsRow.rowLetter,
                          number: seat.number,
                        })
                      }
                    >
                      {seat.status === 'selected' && (
                        <Text
                          fontFamily="regular"
                          fontSize="2xs"
                          color="gray.20"
                          lineHeight="xs"
                        >
                          {seat.number}
                        </Text>
                      )}
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Subtitle */}
          <View
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mx={6}
            mt={3}
          >
            <View flexDir="row" alignItems="center">
              <View
                rounded="full"
                width={4}
                height={4}
                borderWidth={1}
                borderColor="blue.10"
                mr={2}
              />
              <Text color="gray.20" fontFamily="regular" fontSize="sm">
                Livre
              </Text>
            </View>

            <View flexDir="row" alignItems="center">
              <View
                rounded="full"
                bgColor="blue.10"
                width={4}
                height={4}
                borderWidth={1}
                borderColor="blue.10"
                mr={2}
              />
              <Text color="gray.20" fontFamily="regular" fontSize="sm">
                Ocupado
              </Text>
            </View>

            <View flexDir="row" alignItems="center">
              <View
                rounded="full"
                bgColor="blue.800"
                width={4}
                height={4}
                borderWidth={1}
                borderColor="blue.800"
                mr={2}
              />
              <Text color="gray.20" fontFamily="regular" fontSize="sm">
                Selecionado
              </Text>
            </View>
          </View>
        </View>

        <Button />
      </View>
    </VStack>
  );
}
