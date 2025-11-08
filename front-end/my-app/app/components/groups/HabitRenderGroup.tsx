"use client";
import { useHabit } from "@/app/store/habitStore/habitStore";
import React, { useEffect, useState } from "react";
import HabitCard from "../cards/HabitCard";

type Props = {};

export default function HabitRenderGroup({}: Props) {
  const {
    habits,
    habit_fetch_loading,
    habit_fetch_error,
    fetchHabits,
    addHabits,
  } = useHabit();

  const [data, setData] = useState();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const url = new URL("http://localhost:5000/habits");
    const method = "GET";
    const fetched_data = fetchHabits(signal, url, { method: method });

    return () => {
      abortController.abort();
    };
  }, [fetchHabits]);
  if (habit_fetch_loading) {
    return <p>Loading habits</p>;
  }
  if (habit_fetch_error) {
    return <h1>habit fetch error</h1>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      {!habits?.length && <h2>No habits Yet</h2>}
      {habits?.length > 0 && (<>
      <h2>Your habit list</h2>
        <div className="flex flex-row flex-wrap items-center justify-center gap-4 scroll-auto">
          {habits?.map((habit, index) => (
            <HabitCard habit={habit} key={index} />
          ))}
        </div></>
      )}
    </div>
  );
}
