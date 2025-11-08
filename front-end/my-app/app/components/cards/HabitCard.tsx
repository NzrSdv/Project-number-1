"use client";
import { useHabit } from "@/app/store/habitStore/habitStore";
import { Habit } from "@/app/types/habitType";
import DefaultButton from "@/app/UI/buttons/DefaultButton";
import React from "react";

type Props = {
  habit: Habit;
};

export default function HabitCard({ habit }: Props) {
  const {
    habits,
    habit_fetch_loading,
    habit_fetch_error,
    addHabits,
    deleteHabit,
    fetchHabits,
  } = useHabit();

  return (
    <div className="w-100 h-100 border border-black rounded-md flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <p>Habit Id:{habit.habit_id}</p>
        <h1>Habit title:{habit.habit_title}</h1>
        <h2>Habit frequency :{habit.habit_frequency}</h2>
        <p>habit Description: {habit.habit_description}</p>
      </div>
      <DefaultButton
        className="max-width-100 px-10 py-2 rounded-xl hover:scale-110 duration-200 bg-red-900 text-white"
        text={"Delete"}
        onClickFunction={() => {
          const url = new URL("http://localhost:5000/deletebyid");
          deleteHabit(
            url,
            {
              method: "DELETE",
              body: JSON.stringify({ id: habit.habit_id }),
            },
            { id: habit.habit_id }
          );
          console.log("deleted");
        }}
      />
    </div>
  );
}
