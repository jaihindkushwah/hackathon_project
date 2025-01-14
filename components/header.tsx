import React from "react";
// import Navbar from "./navbar";
import Hamburger from "./hamburger";
import Navbar from "./navbar";

function Header() {
  return (
    <header>
      <div className="max-[640px]:hidden">
        <Navbar />
      </div>
      <div className="min-[640px]:hidden h-full">
        <Hamburger />
      </div>
    </header>
  );
}

export default Header;
