
import { Link } from "react-router-dom";
import bg_hangman from "../../../assets/images/hangman-bg.png";
const PlayModes = () => {
  return (
    <div className="w-full min-h-[70svh] md:min-h-auto flex flex-col font-[poppins]">
    <div className="absolute top-0 left-0 w-full h-svh z-0 bg-gray-800">
      <div className="absolute top-0 left-0 w-full h-full  bg-gradient-to-b from-gray-950/97 to-gray-900/80"></div>
      <img src={bg_hangman} alt="" className="w-full h-full object-cover"/>
    </div>
    <div className="relative w-full flex-1 flex flex-col items-center justify-center z-40">
     
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-20 mt-10 md:mt-32">
        <Link to="/hangman/beginner">
          <button className="w-48 border-2 border-white hover:border-black hover:bg-gray-50 hover:text-gray-950 md:text-xl tracking-wider text-white font-bold py-2 px-4 md:py-4 rounded capitalize cursor-pointer duration-300 ease-in-out">
            easy
          </button>
        </Link>
        <Link to="/hangman/explorer">
          <button className="w-48 border-2 border-white hover:border-black hover:bg-gray-50 hover:text-gray-950 md:text-xl tracking-wider text-white font-bold py-2 px-4 md:py-4 rounded capitalize cursor-pointer duration-300 ease-in-out">
            explorer
          </button>
        </Link>
        <Link to="/hangman/master">
          <button className="w-48 border-2 border-white hover:border-black hover:bg-gray-50 hover:text-gray-950 md:text-xl tracking-wider text-white font-bold py-2 px-4 md:py-4 rounded capitalize cursor-pointer duration-300 ease-in-out">
            master
          </button>
        </Link>
      </div>
      <p className="text-lg text-gray-300 my-6 md:my-20">
        Only the right word can save life!
      </p>
    </div>
    </div>
  )
}

export default PlayModes;