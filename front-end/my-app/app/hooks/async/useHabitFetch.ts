import { Habit } from "@/app/types/habitType";
import { Url } from "next/dist/shared/lib/router/router";

export default async function useHabitFetch(signal: AbortSignal, url: URL, info: RequestInit): Promise<Habit[]> {
    const fetchOptions: RequestInit =
    {
        ...info,
        signal,
        headers: {
            'Content-Type': "application/json"
        }
    }
    const response = fetch(url, fetchOptions);
    const Habits = (await response).json();
    const data: Array<Habit> = await Habits;
    return data;

}