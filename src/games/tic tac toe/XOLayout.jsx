import { Outlet } from "react-router-dom";
import Logo from "./components/Logo";
import bg from "../../assets/images/games/tic tac toe/bg.png";

const XOLayout = () => {
  return (
    <div
      className="w-full min-h-[calc(100svh-72px)] flex flex-col bg-dark text-white p-1 md:p-5 lg:px-10 font-knewave
      "
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="relative w-fit mx-auto my-2 md:mt-5 mb-4 md:mb-16 z-40">
        <Logo />
      </div>
      <div className="flex flex-col flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default XOLayout;

