"use client";
import React from "react";
import { useState } from "react";
import { useHabit } from "@/app/store/habitStore/habitStore";

import HabitEntryInput from "@/app/UI/inputs/HabitEntryInput";
import DefaultButton from "@/app/UI/buttons/DefaultButton";
type Props = {};

export default function HabitInputGroup({}: Props) {
  const habits = useHabit((state) => state.habits);
  const [habitName, habitNameFunction] = useState("");
  const [habitDescription, habitDescriptionFunction] = useState("");
  const [habitFrequency, habitFrequencyFunction] = useState("");

  const createHabitFunction = useHabit((state) => state.addHabits);

  return (
    <div className="flex flex-col items-center justify-center gap-2 border border-solid border-blue-950 px-20 py-10 rounded-xl">
      <HabitEntryInput
        habitPlaceHolder={"Your desired habit"}
        habitValue={habitName}
        habitValueType="text"
        habitValueChangeFunction={habitNameFunction}
      />
      <HabitEntryInput
        habitPlaceHolder={"habit description"}
        habitValue={habitDescription}
        habitValueType="text"
        habitValueChangeFunction={habitDescriptionFunction}
      />
      <HabitEntryInput
        habitPlaceHolder={"habit frequency"}
        habitValue={habitFrequency}
        habitValueType="text"
        habitValueChangeFunction={habitFrequencyFunction}
      />

      <DefaultButton
        text={"Add new Habit"}
        onClickFunction={() => {
          const lastID = habits.length | 0;
          const habitID = lastID + 1;
          createHabitFunction({
            habit_id: habitID,
            habit_title: habitName,
            habit_description: habitDescription,
            habit_frequency: habitFrequency,
          });
          habitNameFunction("");
          habitDescriptionFunction("");
          habitFrequencyFunction("");
        }}
        className="max-width-100 px-10 py-2 rounded-xl hover:scale-110 duration-200 text-white bg-green-700"
      />
    </div>
  );
}
