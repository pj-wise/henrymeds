import dayjs from 'dayjs';

export interface Slot {
  id: number;
  startTime: string;
  endTime: string;
}

export interface Provider {
  id: number;
  name: string;
}

export const providers: Provider[] = [
  {
    id: 1,
    name: 'Provider 1',
  },
];

export const generateSlotsForDate = (date: dayjs.Dayjs): Slot[] => {
  const startHour = 8;
  const endHour = 15;
  const slots: Slot[] = [];
  let idCounter = 1;

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const startTime = dayjs(date).hour(hour).minute(minute).second(0).format('HH:mm');
      const endTime = dayjs(date).hour(hour).minute(minute + 15).second(0).format('HH:mm');
      slots.push({ id: idCounter++, startTime, endTime });
    }
  }

  return slots;
};

export const getAvailableDates = (): string[] => {
  const today = dayjs();
  const dates = [];
  for (let i = 2; i <= 30; i++) { // Allow selection 24 hours in advance and up to 30 days ahead
    dates.push(today.add(i, 'day').format('YYYY-MM-DD'));
  }
  return dates;
};