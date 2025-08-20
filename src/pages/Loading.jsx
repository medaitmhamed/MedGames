
import { LoaderCircle } from "lucide-react";
import logo from "../assets/images/logo.png";

const Loading = ({ msg="Loading..." }) => {
  return (
    <div className="flex items-center justify-center w-full h-[calc(100svh-79px)] bg-dark">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-40 h-22">
          <img src={logo} alt="Logo" className="w-14 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce" />
          
          <LoaderCircle className="stroke-1 stroke-primary/90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 animate-spin" />
         

        </div>
        <p className="text-white mt-4">{msg}</p>
      </div>
    </div>
  );
};

export default Loading;



