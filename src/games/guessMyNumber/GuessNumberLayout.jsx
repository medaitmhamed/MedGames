import { Outlet } from "react-router-dom"
import Logo from "./components/Logo"
const GuessNumberLayout = () => {
  return (
    <div className="w-full min-h-[calc(100svh-80px)]  text-white p-1 md:p-5 md:px-10 font-knewave">
      <div className="relative w-fit mx-auto my-0 md:mt-5 mb-4 md:mb-10 z-40">
        <Logo />
      </div>
      <Outlet />
    </div>
  )
}

export default GuessNumberLayout