"use client";

import CalendarComponent from "@/app/components/calendar/CalendarComponent";
import { useHabit } from "@/app/store/habitStore/habitStore";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";

type Props = {};


export default function Page({}: Props) {
  const getHabitById = useHabit((state) => state.getHabitById);

  const params = useParams() || { id: 0 };
  console.log(params.id);
  const id = Number(params.id);
  const currentHabit = useMemo(() => {
    return getHabitById(id);
  }, [id, getHabitById]);

  console.log(currentHabit);

  return <div>
    <CalendarComponent created_at={(currentHabit.habit_created_at.toString())} />
  </div>;
}
