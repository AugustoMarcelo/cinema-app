import { FlatList, View, VStack } from 'native-base';
import { useMemo, useState } from 'react';

import { Button } from '../components/Button';
import { Header } from '../components/Header';

import Ellipsis4 from '../assets/ellipsis4.svg';
// import Light from '../assets/light.svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import Screen1 from '../assets/screen1.svg';
import Screen2 from '../assets/screen2.svg';
import { DatePicker } from '../components/DatePicker';
import { Seat } from '../components/Seat';
import { Subtitle } from '../components/Subtitle';
import { TimePicker } from '../components/TimePicker';
import {
  getInitializedDatesData,
  getInitializedSeatsData,
  getInitializedTimesData,
  SeatsRow,
  SelectDate,
  SelectTime,
} from '../utils';

interface SelectedSeat {
  rowLetter: string;
  number: number;
}

interface RouteParams {
  movieId: string;
}

export function Select() {
  const { navigate } = useNavigation();
  const route = useRoute();
  const { movieId } = route.params as RouteParams;

  const [dates, setDates] = useState<SelectDate[]>(getInitializedDatesData());
  const [times, setTimes] = useState<SelectTime[]>(getInitializedTimesData());
  const [seatsRows, setSeatsRows] = useState<SeatsRow[]>(
    getInitializedSeatsData()
  );

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

  const seats = useMemo(() => {
    const selectedSeats = [];

    seatsRows.forEach((seatsRow) => {
      seatsRow.leftSeats.forEach((seat) => {
        if (seat.status === 'selected') selectedSeats.push(seat.number);
      });
      seatsRow.rightSeats.forEach((seat) => {
        if (seat.status === 'selected') selectedSeats.push(seat.number);
      });
    });

    return selectedSeats.join(',');
  }, [seatsRows]);

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
            <DatePicker data={item} onPress={() => handleSelectDate(item)} />
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
            <TimePicker data={item} onPress={() => handleSelectTime(item)} />
          )}
        />

        <View alignSelf="stretch" mb={6} position="relative">
          <View position="absolute" left={10}>
            <Screen2 />
          </View>
          <View position="absolute" left={-6}>
            <Screen1 />
          </View>

          <View alignItems="center" mt={12}>
            {seatsRows.map((seatsRow) => (
              <Seat.Root key={seatsRow.rowLetter}>
                <Seat.Row ml="auto">
                  {seatsRow.leftSeats.map((seat, index) => (
                    <Seat.Item
                      key={`${seatsRow.rowLetter}${seat.number}`}
                      data={seat}
                      mr={index + 1 === seatsRow.leftSeats.length ? 0 : 3}
                      onPress={() =>
                        handleSelectSeat({
                          rowLetter: seatsRow.rowLetter,
                          number: seat.number,
                        })
                      }
                    />
                  ))}
                </Seat.Row>
                <Seat.LetterRoot>
                  <Seat.LetterItem
                    isSelected={selectedRowsLetter.some(
                      (letter) => letter === seatsRow.rowLetter
                    )}
                  >
                    {seatsRow.rowLetter}
                  </Seat.LetterItem>
                </Seat.LetterRoot>
                <Seat.Row mr="auto">
                  {seatsRow.rightSeats.map((seat, index) => (
                    <Seat.Item
                      key={`${seatsRow.rowLetter}${seat.number}`}
                      data={seat}
                      mr={index + 1 === seatsRow.leftSeats.length ? 0 : 3}
                      onPress={() =>
                        handleSelectSeat({
                          rowLetter: seatsRow.rowLetter,
                          number: seat.number,
                        })
                      }
                    />
                  ))}
                </Seat.Row>
              </Seat.Root>
            ))}
          </View>

          <Subtitle />
        </View>

        <Button
          handleClick={() =>
            navigate('Ticket', {
              movieId,
              date: dates.filter((item) => item.isSelected)[0].dayMonth,
              time: times.filter((item) => item.isSelected)[0].time,
              rows: selectedRowsLetter.join(','),
              seats,
            })
          }
        />
      </View>
    </VStack>
  );
}
