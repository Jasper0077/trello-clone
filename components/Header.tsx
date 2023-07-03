import Image from "next/image";
import Searchbar from "./Searchbar";

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex flex-col sm:flex-row max-w-full items-center justify-between p-6 lg:px-8 bg-gray-500/10"
        aria-label="Global"
      >
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
        <div>
          {/* Search Box */}
          <Searchbar />
        </div>
      </nav>
    </header>
  );
}
