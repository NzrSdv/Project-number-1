import useHabitFetch from '@/app/hooks/async/useHabitFetch';
import { Habit } from '@/app/types/habitType';
import { create } from 'zustand';

type State = {
    habits: Array<Habit>,
    habit_fetch_loading: Boolean,
    habit_fetch_error: Boolean | null
}
type Action = {
    fetchHabits: (signal: AbortSignal, url: URL, info: RequestInit) => Promise<Habit[]>;
    addHabits: (habit: Habit) => void;
}
export const useHabit = create<State & Action>((set) => ({
    habits: [],
    habit_fetch_loading: false,
    habit_fetch_error: false,
    fetchHabits: async (signal, url, info) => {
        set({ habit_fetch_loading: true, habit_fetch_error: null })
        try {
            const fetchedHabits = await useHabitFetch(signal, url, info)
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