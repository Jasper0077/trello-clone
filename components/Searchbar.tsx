"use client";

import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Hotkeys from "react-hot-keys";

interface Props {}

const Searchbar: React.FC<Props> = () => {
  const ref = React.useRef<HTMLInputElement>(null);
  return (
    <Hotkeys
      keyName="cmd+k"
      onKeyUp={(_, event, handle) => {
        ref.current?.focus();
      }}
    >
      <form>
        <div className="relative mt-2 rounded-2xl shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="search"
            name="search"
            id="search"
            ref={ref}
            className="block bg-gray-200 w-full rounded-2xl border-0 py-1.5 pl-10 text-gray-900 ring-0 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search"
          />
          <span className="absolute inset-y-0 right-0 pr-3 text-sm font-bold flex items-center text-gray-400">
            ⌘ K
          </span>
        </div>
        <button type="submit" className="hidden">
          Submit
        </button>
      </form>
    </Hotkeys>
  );
};

export default Searchbar;
