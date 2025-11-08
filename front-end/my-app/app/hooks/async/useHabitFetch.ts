import { Habit } from "@/app/types/habitType";
export default async function useHabitFetch(url: URL, info: RequestInit): Promise<Habit[]> {
    const fetchOptions: RequestInit =
    {
        ...info,
        headers: {
            'Content-Type': "application/json"
        }
    }
    const response = fetch(url, fetchOptions);
    const Habits = (await response).json();
    const data: Array<Habit> = await Habits;
    return data;

}