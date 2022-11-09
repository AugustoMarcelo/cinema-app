import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';

import { SeatProps } from '../components/Seat';

export interface SeatsRow {
  leftSeats: SeatProps[];
  rowLetter: string;
  rightSeats: SeatProps[];
}

export interface SelectDate {
  day: string;
  shortDay: string;
  isSelected: boolean;
}

export interface SelectTime {
  time: string;
  isSelected: boolean;
}

export const getInitializedSeatsData = (): SeatsRow[] => {
  return [
    {
      leftSeats: Array.from<SeatProps>({ length: 3 }).map((_, index) => ({
        number: index + 1,
        status: 'free',
      })),
      rowLetter: 'A',
      rightSeats: Array.from<SeatProps>({ length: 3 }).map((_, index) => ({
        number: index + 1 + 3,
        status: 'free',
      })),
    },
    {
      leftSeats: Array.from<SeatProps>({ length: 4 }).map((_, index) => ({
        number: index + 1,
        status: 'free',
      })),
      rowLetter: 'B',
      rightSeats: Array.from<SeatProps>({ length: 4 }).map((_, index) => ({
        number: index + 1 + 4,
        status: index + 1 + 4 <= 7 ? 'occuped' : 'free',
      })),
    },
    {
      leftSeats: Array.from<SeatProps>({ length: 4 }).map((_, index) => ({
        number: index + 1,
        status: index + 1 < 4 ? 'free' : 'occuped',
      })),
      rowLetter: 'C',
      rightSeats: Array.from<SeatProps>({ length: 4 }).map((_, index) => ({
        number: index + 1 + 4,
        status: index + 1 + 4 === 7 ? 'occuped' : 'free',
      })),
    },
    {
      leftSeats: Array.from<SeatProps>({ length: 4 }).map((_, index) => ({
        number: index + 1,
        status: index + 1 < 3 ? 'free' : 'occuped',
      })),
      rowLetter: 'D',
      rightSeats: Array.from<SeatProps>({ length: 4 }).map((_, index) => {
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
      leftSeats: Array.from<SeatProps>({ length: 4 }).map((_, index) => ({
        number: index + 1,
        status: [1, 4].includes(index + 1) ? 'occuped' : 'free',
      })),
      rowLetter: 'E',
      rightSeats: Array.from<SeatProps>({ length: 4 }).map((_, index) => ({
        number: index + 1 + 4,
        status: index + 1 + 4 === 7 ? 'occuped' : 'free',
      })),
    },
    {
      leftSeats: Array.from<SeatProps>({ length: 4 }).map((_, index) => ({
        number: index + 1,
        status: 'occuped',
      })),
      rowLetter: 'F',
      rightSeats: Array.from<SeatProps>({ length: 4 }).map((_, index) => ({
        number: index + 1 + 4,
        status: index + 1 + 4 < 8 ? 'occuped' : 'free',
      })),
    },
    {
      leftSeats: Array.from<SeatProps>({ length: 4 }).map((_, index) => ({
        number: index + 1,
        status: index + 1 > 1 ? 'occuped' : 'free',
      })),
      rowLetter: 'G',
      rightSeats: Array.from<SeatProps>({ length: 4 }).map((_, index) => ({
        number: index + 1 + 4,
        status: index + 1 + 4 === 5 ? 'occuped' : 'free',
      })),
    },
    {
      leftSeats: Array.from<SeatProps>({ length: 3 }).map((_, index) => ({
        number: index + 1,
        status: index + 1 > 1 ? 'occuped' : 'free',
      })),
      rowLetter: 'H',
      rightSeats: Array.from<SeatProps>({ length: 3 }).map((_, index) => ({
        number: index + 1 + 4,
        status: 'free',
      })),
    },
  ];
};

export const getInitializedDatesData = (): SelectDate[] => {
  return Array.from({ length: 10 }).map((_, index) => {
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
  });
};

export const getInitializedTimesData = (): SelectTime[] => {
  return Array.from({ length: 24 - new Date().getHours() }).map((_, index) => {
    const currentHour = new Date().getHours();
    const currentHourIncremented = currentHour + index;
    let isSelected = false;

    if (currentHour === currentHourIncremented) isSelected = true;

    return {
      time: `${String(currentHourIncremented).padStart(2, '0')}:00`,
      isSelected,
    };
  });
};