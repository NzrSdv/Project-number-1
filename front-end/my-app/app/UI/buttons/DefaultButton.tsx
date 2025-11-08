import React from "react";

type Props = {
  text: String;
  onClickFunction: Function;
} & React.ComponentPropsWithoutRef<"button">;

export default function DefaultButton({
  text,
  onClickFunction,
  ...rest
}: Props) {
  return (
    <button onClick={() => onClickFunction()} {...rest}>
      {text}
    </button>
  );
}
