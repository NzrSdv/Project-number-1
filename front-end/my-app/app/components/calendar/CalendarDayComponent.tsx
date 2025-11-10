import { DateArg, getMonth } from "date-fns";
import { format, isToday } from "date-fns";

import React from "react";

type Props = {
  day: Date;
  currentMonth: number;
};

export default function CalendarDayComponent({ day, currentMonth }: Props) {
  const thisDateMonth = getMonth(day);
  const isItThisMonth = currentMonth == thisDateMonth;
  return (
    <div
      className={`p-5 border border-white  rounded-md text-center ${
        isToday(day)
          ? "bg-white text-cyan-950"
          : !isItThisMonth
          ? "bg-gray-700"
          : "text-gray-400"
      }`}
    >
      {format(day, "d")}
    </div>
  );
}
