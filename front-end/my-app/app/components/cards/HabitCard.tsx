'use client';
import { Habit } from "@/app/types/habitType";
import React from "react";

type Props = {
  habit: Habit;
};

export default function HabitCard({ habit }: Props) {
  return (
    <div className="w-100 h-25 border border-black rounded-md flex flex-col justify-center items-center">
      <p>{habit.habit_id}</p>
      <h1>{habit.habit_title}</h1>
      <h2>{habit.habit_frequency}</h2>
      <p>{habit.habit_description}</p>
    </div>
  );
}
