import React, {useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LogIn, Menu, X } from "lucide-react";
import logo from "../assets/images/logo.png";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Call on mount
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, isMobile]);

  const navItems = [
    { name: "home", to: "/" },
    { name: "new game", to: "newest" },
    { name: "best game", to: "best-game" },
    { name: "categories", to: "categories" },
    
    // { name: "login", href: "login" }, TO DO NEXT
  ];
  const listVariants = {
    show: {
      transition: {
        staggerChildren: 0.1, // Stagger each nav item
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80 } },
  };

  const dividerVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    show: {
      opacity: 1,
      scaleX: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const show = {
    opacity: 1,
    display: "block",
  };

  const hide = {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  };
  return (
    <header
      className="w-full text-white  p-4 bg-dark flex justify-between items-center shadow-md shadow-sky-200/10 z-[9999] sticky top-0 left-0
    md:shadow-none
    lg:px-20
    xl:pl-32"
    >
      <div className="flex items-center gap-x-2 md:gap-x-4">
        <img src={logo} alt="Logo" className="h-6 md:h-8" />
        <span
          className="whitespace-nowrap text-2xl pt-2 bg-gradient-to-l from-gray-950 to-primary text-transparent bg-clip-text text-stroke font-bold font-luckiest capitalize
        md:text-4xl md:pt-0 md:stroke-2"
        >
          med games
        </span>
      </div>

      <motion.button
        whileTap={{ scale: 1.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden"
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </motion.button>
      <motion.div
        className="absolute top-18 left-0 w-full h-[calc(100svh-72px)] bg-neutral-800 z-10 pt-20 overflow-hidden
        md:static md:w-auto md:h-auto md:bg-transparent md:pt-0 md:overflow-visible"
        animate={
          isMobile ? (isOpen ? show : hide) : { opacity: 1, display: "block" }
        }
      >
        <AnimatePresence>
          {(!isMobile || isOpen) && (
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full z-50 "
            >
              <motion.ul
                key={isOpen} // Re-triggers animation when state changes
                variants={listVariants}
                initial="hidden"
                animate="show"
                className="w-full h-full px-5 flex flex-col items-center text-2xl capitalize gap-y-8
                md:flex-row md:gap-x-2 md:items-center md:justify-center md:text-base
                lg:gap-x-6 lg:text-lg lg:justify-end lg:items-center
                xl:gap-x-8"
              >
                {navItems.map((item, index) => (
                  <React.Fragment key={item.name}>
                    <motion.li
                        className="nav-item text-white  transition-colors duration-300
                       md:hover:text-shadow-sm md:hover:text-shadow-sky-500/50"
                        variants={itemVariants}
                        whileHover={{ x: 5 }} // hover animation
                      >
                        <NavLink to={item.to} onClick={()=>setIsOpen(false)} className="block py-2 px-4 text-white md:hover:text-active">
                          {item.name}
                        </NavLink>
                      </motion.li>

                      {/* TO DO NEXT : Login button */}

                    {/* {item.name === "login" ? (
                      <motion.button
                        className="capitalize w-full flex items-center justify-center gap-x-2 text-white  bg-primary rounded-full pl-4 pr-2 py-2 transition-colors duration-300 cursor-pointer
                        md:w-fit md:pl-6 md:pr-4 md:gap-x-4 md:py-1 md:rounded-md md:border-2 md:border-active md:bg-transparent md:hover:bg-active md:hover:text-shadow-sm md:hover:text-shadow-sky-500/50"
                        variants={itemVariants}
                        whileHover={{
                          scale: 1,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 10,
                          },
                        }}
                        whileTap={{ scale: 0.7 }}
                      >
                        {item.name}
                        <LogIn />
                      </motion.button>
                    ) : (
                      <motion.li
                        className="nav-item text-white  transition-colors duration-300
                       md:hover:text-shadow-sm md:hover:text-shadow-sky-500/50"
                        variants={itemVariants}
                        whileHover={{ x: 5 }} // hover animation
                      >
                        <NavLink to={item.href} className="block py-2 px-4 text-white md:hover:text-active">
                          {item.name}
                        </NavLink>
                      </motion.li>
                    )} */}
                    {/* Divider between items */}

                    {index < navItems.length - 1 && (
                      <motion.li
                        className="w-full flex justify-center
                        md:hidden"
                        variants={dividerVariants}
                      >
                        <div className="relative w-48 h-px">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-active to-transparent h-px"></div>
                          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-active rounded-full shadow-lg shadow-blue-500/50"></div>
                          <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full"></div>
                          <div className="absolute right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full"></div>
                        </div>
                      </motion.li>
                    )}
                  </React.Fragment>
                ))}
              </motion.ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Header;
