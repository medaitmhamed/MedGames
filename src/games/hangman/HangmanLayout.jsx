import { Outlet } from "react-router-dom";
import Logo from "./components/Logo";

export default function HangmanLayout() {
  return (
    <div className="w-full min-h-[calc(100svh-80px)] bg-gray-900 text-white p-1 md:p-5 md:px-10 font-knewave">
      <div className="relative w-fit mx-auto my-0 md:mt-5 mb-4 md:mb-24 z-40">
        <Logo />
      </div>
      <Outlet />
    </div>
  );
}
