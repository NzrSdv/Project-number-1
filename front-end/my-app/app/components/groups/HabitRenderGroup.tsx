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
    const url = new URL("http://localhost:5000/habits");
    const method = "GET";
    if (habits.length == 0) {
      fetchHabits(url, { method: method });
    }
  }, []);
  if (habit_fetch_loading) {
    return <p>Loading habits</p>;
  }
  if (habit_fetch_error) {
    return <h1>habit fetch error</h1>;
  }

  return (
    <div className="flex flex-col items-start justify-center gap-1">
      <div className="min-w-[90dvw] flex flex-col items-center justify-center gap-5 ">
        {!habits?.length && (
          <h2 className="text-start text-4xl font-bold mt-40">You have no habits</h2>
        )}
        {habits?.length > 0 && (
          <>
            <h2 className="text-2xl font-bold">Your habits: </h2>
            <div className="w-full flex flex-row flex-wrap items-center justify-center gap-4">
              {habits?.map((habit, index) => (
                <HabitCard habit={habit} index={index} key={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
