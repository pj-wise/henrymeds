import { create } from "zustand";

//State for Provider schedule
const useScheduleStore = create((set) => ({
  date: 0,
  setDate: () => set((state) => ({ date: state.date })),
}));
