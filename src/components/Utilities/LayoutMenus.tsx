import React, { ReactNode } from "react";
import useScreenMedia from "../hooks/useScreenMedia";

interface LayoutMenusProps {
  menuOpen: boolean;
  children: ReactNode;
  closeMenuHandler: () => void;
  className?: string;
}

const LayoutMenus: React.FC<LayoutMenusProps> = ({
  menuOpen,
  children,
  closeMenuHandler,
  className = "", // Defaulting to an empty string if className is not provided
}) => {
  const mediaQueries = useScreenMedia();

  return (
    <>
      <div
        className={`bg-slate-100 h-screen w-60 xl:w-2/12 fixed dark:bg-slate-800 z-20 ${className} ${
          menuOpen || mediaQueries.xl ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
      {menuOpen && !mediaQueries.xl && (
        <div
          className="fixed bg-slate-600/[.2] w-full h-full z-10 top-0 left-0"
          onClick={closeMenuHandler}
        ></div>
      )}
    </>
  );
};

export default LayoutMenus;
