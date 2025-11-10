"use client";

import {
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  getDay,
  isToday,
  subDays,
  getMonth,
} from "date-fns";
import React from "react";
import CalendarDayComponent from "./CalendarDayComponent";

type Props = {
  created_at: string;
};
const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function CalendarComponent({ created_at }: Props) {
  const currentDate = new Date(created_at);

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const getFirstWeekDay = getDay(firstDayOfMonth);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const daysBeforeMonth = eachDayOfInterval({
    start: subDays(firstDayOfMonth, getFirstWeekDay),
    end: subDays(firstDayOfMonth, 1),
  });

  return (
    <div className="border-white border rounded-xl flex flex-col items-center justify-center gap-2 p-20">
      <div className="w-full text-center">
        <h2>{format(currentDate, "MMMM yyyy")}</h2>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {WEEKDAYS.map((weekday) => (
          <div
            className="border border-white p-5 rounded-md text-center"
            key={weekday}
          >
            {weekday}
          </div>
        ))}
        {daysBeforeMonth.map((day, index) => (
          <CalendarDayComponent
            key={`beforeDay ${index}`}
            day={day}
            currentMonth={getMonth(currentDate)}
          />
        ))}
        {daysInMonth.map((day, index) => (
          <CalendarDayComponent
            key={`day ${index}`}
            day={day}
            currentMonth={getMonth(currentDate)}
          />
        ))}
      </div>
    </div>
  );
}
