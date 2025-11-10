"use client";
import { useHabit } from "@/app/store/habitStore/habitStore";
import { Habit } from "@/app/types/habitType";
import DefaultButton from "@/app/UI/buttons/DefaultButton";
import React from "react";

import { motion } from "motion/react";
import Link from "next/link";

type Props = {
  habit: Habit;
  index: number;
};

export default function HabitCard({ habit, index }: Props) {
  const {
    habits,
    habit_fetch_loading,
    habit_fetch_error,
    addHabits,
    deleteHabit,
    fetchHabits,
  } = useHabit();



  return (
    <Link href={`/pages/cardPage/${habit.habit_id}`}>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "tween", delay: (index + 1) * 0.2 }}
        whileHover={{ scale: 1.05, transition: { delay: 0, duration: 0.2 } }}
        className="w-full bg-transparent rounded-md px-10 py-5 flex flex-row justify-between items-center border border-white"
      >
        <div className="w-full py-5 flex flex-row items-center justify-center gap-80 text-white">
          <div className="flex flex-col items-start justify-center ">
            <h1 className="text-2xl font-bold">{habit.habit_title}</h1>
            <p className="italic">{habit.habit_description}</p>
          </div>
          <DefaultButton
            className=" px-15 py-3 rounded-xl hover:scale-110 duration-200 bg-transparent border-white border "
            text={"Remove"}
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
      </motion.div>
    </Link>
  );
}
