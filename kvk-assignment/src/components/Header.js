import React from "react";
import Logo from "./icons/Logo";
const Header = () => {
  return (
    <header className="header bg-sky-200 mb-10 sticky top-0 z-10">
      <div className="logo w-24 h-24">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
