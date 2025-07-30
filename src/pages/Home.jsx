import { motion, AnimatePresence } from "motion/react";
import { ArrowUpZA, ChevronDown } from "lucide-react";
import GameList from "../components/GameList";
import { useState } from "react";

const Home = ({filterType="all games"}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="px-2 py-4 antialiased sm:py-8 md:py-12">
      <div
        className="mx-auto mb-4 flex flex-col gap-y-4 max-w-screen-xl px-4 2xl:px-0
      md:mb-10 md:flex-row md:justify-between"
      >
        <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl capitalize">
          {filterType}
        </h2>
        <div className="relative inline-block text-left">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="flex w-full items-center justify-center rounded-lg border border-gray-600 px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-100 bg-gray-800 text-gray-400 sm:w-auto"
          >
            <ArrowUpZA className="-ms-0.5 me-2 h-4 w-4" />
            Sort
            <ChevronDown className="ms-2 h-4 w-4" />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="z-10 mt-2 p-2 w-full  rounded-lg bg-neutral-900 overflow-hidden
                md:absolute md:left-1/2 md:-translate-x-1/2 md:w-48"
              >
                <li>
                  <button
                    type="button"
                    className="block w-full px-4 py-2 text-sm text-white md:text-gray-400 rounded-md hover:bg-gray-100/10 hover:text-white"
                  >
                    Most popular
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="block w-full px-4 py-2 text-sm text-white md:text-gray-400 rounded-md hover:bg-gray-100/10 hover:text-white"
                  >
                    Newest
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="block w-full px-4 py-2 text-sm text-white md:text-gray-400 rounded-md hover:bg-gray-100/10 hover:text-white"
                  >
                    Top reviews
                  </button>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
      <GameList />
    </section>
  );
};

export default Home;
