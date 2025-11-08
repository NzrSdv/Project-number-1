"use client";
import React, { useState } from "react";

type Props = {
  habitPlaceHolder: String;
  habitValue: any;
  habitValueType: string;
  habitValueChangeFunction: Function;
};

export default function HabitEntryInput({
  habitPlaceHolder,
  habitValue = "",
  habitValueType = "text",
  habitValueChangeFunction,
}: Props) {
  return (
    <input
      className="w-full pl-3 py-3 rounded-xl placeholder:text-center focus:outline-cyan-800  bg-cyan-950 placeholder:text-white focus:scale-110 duration-150"
      type={habitValueType}
      value={habitValue}
      placeholder={`${habitPlaceHolder}`}
      onInput={(event) => {
        if (event.currentTarget.value != " ")
          habitValueChangeFunction(event.currentTarget.value);
      }}
    />
  );
}
