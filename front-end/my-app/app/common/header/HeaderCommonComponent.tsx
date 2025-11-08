import React from "react";
import Link from "next/link";
type Props = {};

export default function HeaderCommonComponent({}: Props) {
  return (
    <header className="bg-cyan-950 flex items-center justify-center gap-20 py-5">
      <nav className="flex items-center justify-center gap-10">
        <Link className="bg-cyan-950 text-white py-2 px-5 rounded-sm hover:scale-110 duration-300" href={"/"}>
          Your habits
        </Link>
        <Link className="bg-cyan-950 text-white py-2 px-5 rounded-sm hover:scale-110 duration-300" href={"/pages/mainPage"}>
          Main
        </Link>
      </nav>
    </header>
  );
}
