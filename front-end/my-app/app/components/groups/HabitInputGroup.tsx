"use client";
import React from "react";
import { useState } from "react";
import { useHabit } from "@/app/store/habitStore/habitStore";

import { motion } from "motion/react";

import HabitEntryInput from "@/app/UI/inputs/HabitEntryInput";
import DefaultButton from "@/app/UI/buttons/DefaultButton";
type Props = { someFunction: Function };

export default function HabitInputGroup({ someFunction }: Props) {
  const habits = useHabit((state) => state.habits);
  const [habitName, habitNameFunction] = useState("");
  const [habitDescription, habitDescriptionFunction] = useState("");
  const [habitFrequency, habitFrequencyFunction] = useState("");

  const createHabitFunction = useHabit((state) => state.addHabits);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={"inputGroup"}
      transition={{
        type: "tween",
        duration: 0.5,
        ease: "easeInOut",
      }}
      onClick={(event) => {
        const element = event.target as HTMLElement;
        if (
          !element.classList.contains("no-click") &&
          !element.parentElement?.classList.contains("no-click")
        ) {
          someFunction(false);
        }
      }}
      className="z-30 absolute top-0 h-dvh right-0 left-0 bg-black/15 flex items-center justify-center"
    >
      <div className="no-click z-20 flex flex-col items-center justify-center gap-10 px-20 py-10 rounded-2xl text-white bg-cyan-950 shadow-4xl">
        <h2 className="text-white text-4xl font-semibold ">Your new habit</h2>
        <div className="min-w-80 no-click flex flex-col items-center justify-stretch gap-3">
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
        </div>

        <div className="w-full flex flex-row items-center justify-between gap-2">
          <DefaultButton
            text={"Add Habit"}
            onClickFunction={() => {
              const lastID = habits.length | 0;
              const habitID = lastID + 1;
              const CurrentHabitCreatedAt = new Date().toISOString();
              if (
                habitName.trim() != "" &&
                habitDescription.trim() != "" &&
                habitFrequency != ""
              ) {
                createHabitFunction({
                  habit_id: habitID,
                  habit_title: habitName,
                  habit_description: habitDescription,
                  habit_frequency: habitFrequency,
                  habit_created_at: CurrentHabitCreatedAt,
                });
                someFunction(false);
                habitNameFunction("");
                habitDescriptionFunction("");
                habitFrequencyFunction("");
              } else {
                alert("you have to fill in all inputs");
              }
            }}
            className="w-full py-3 rounded-xl hover:scale-105 duration-200  bg-white text-cyan-950"
          />
          <DefaultButton
            text={"Cancel"}
            onClickFunction={() => {
              someFunction(false);
            }}
            className="w-full py-3 rounded-xl hover:scale-105 duration-200 text-white bg-transparent border border-white"
          />
        </div>
      </div>
    </motion.div>
  );
}
