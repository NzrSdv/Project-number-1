import useHabitFetch from '@/app/hooks/async/useHabitFetch';
import { Habit } from '@/app/types/habitType';
import { create } from 'zustand';

type State = {
    habits: Array<Habit>,
    habit_fetch_loading: Boolean,
    habit_fetch_error: Boolean | null
}
type Action = {
    fetchHabits: (url: URL, info: RequestInit) => Promise<Habit[]>;
    deleteHabit: (url: URL, info: RequestInit, body: any) => Promise<Habit[]>;
    addHabits: (habit: Habit) => void;
}
export const useHabit = create<State & Action>((set, get) => ({
    habits: [],
    habit_fetch_loading: false,
    habit_fetch_error: false,
    fetchHabits: async (url, info) => {
        set({ habit_fetch_loading: true, habit_fetch_error: null })
        try {
            const fetchedHabits = await useHabitFetch(url, info)
            console.log(fetchedHabits);
            set({ habits: [...fetchedHabits] })
            set({ habit_fetch_loading: false })
            return fetchedHabits;
        } catch (error) {
            console.error(error)
            set({ habit_fetch_error: true, habit_fetch_loading: false })
        }
        return [];
    },
    deleteHabit: async (url, info, body) => {
        set({ habit_fetch_loading: true, habit_fetch_error: null })
        try {
            const fetchedHabits = await useHabitFetch(url, info)
            console.log(fetchedHabits);
            set({ habits: [...get().habits].filter(value => { if (value.habit_id != body.id) return value }) })
            set({ habit_fetch_loading: false })
        } catch (error) {
            console.error(error)
            set({ habit_fetch_error: true, habit_fetch_loading: false })
        }
        return get().habits;
    },
    addHabits: async (habit: Habit) => {
        set({ habit_fetch_loading: true });
        try {
            const response = fetch("http://localhost:5000/createhabit", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ ...habit })
            })
            const data = (await response).json();
            console.log(data);
            set((state) => ({ habits: [...state.habits, habit] }))

        } catch (error) {
            console.error("Failed to add new habit", error);
        }
        finally {
            set({ habit_fetch_loading: false })
        }
    }
}))