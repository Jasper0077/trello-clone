"use client";

import Image from "next/image";
import Searchbar from "./Searchbar";
import Avatar from "react-avatar";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useBoardStore } from "@/store/BoardStore";

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  return (
    <header>
      <nav
        className="mx-auto flex flex-col sm:flex-row max-w-full items-center sm:items-end sm:justify-center p-6 lg:px-8 bg-gray-500/10 gap-4"
        aria-label="Global"
      >
        <div
          className="
          absolute
          top-0
          left-0
          w-full
          h-96
          bg-gradient-to-br
          from-pink-400
          to-[#0055D1]
          rounded-md
          filter
          blur-3xl
          opacity-50
          -z-50
        "
        />
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Trello Clone</span>
            <Image
              className="h-8 w-auto"
              width={300}
              height={100}
              src="https://links.papareact.com/c2cdd5"
              alt="Trello Logo"
            />
          </a>
        </div>
        <div className="flex flex-row items-end justify-between gap-4">
          <Searchbar />
          <Avatar
            className=""
            name="Jasper Hwong"
            round
            size="36"
            color="#0055D1"
          />
        </div>
      </nav>
      <div className="flex items-center justify-center px-5 md:py-5">
        <p className="flex items-center text-sm font-light pr-5 shadow-xl rounded-2xl w-fit bg-white max-w-3xl text-[#0055D1]">
          <UserCircleIcon className="inline-block h-10 w-10 tex-[#0055D1] mr-1" />
          GPT is summarising your task for the day...
        </p>
      </div>
    </header>
  );
}
