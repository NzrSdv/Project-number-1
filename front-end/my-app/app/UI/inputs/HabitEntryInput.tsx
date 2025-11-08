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
      className="w-max-full px-10 py-2 rounded-xl text-center outline-none border-solid border-2 border-black"
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
