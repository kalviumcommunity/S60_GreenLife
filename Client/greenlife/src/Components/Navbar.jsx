import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Navbar() {
  const Nextpage = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const OnLogout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      alert("LogOut is successful");
      Nextpage("/login");
    } else {
      alert("Logout Failed");
    }
  };

  return (
    <div>
      <nav className="flex items-center bg-red-50 h-12 w-full fixed top-0 left-0 justify-between px-4 z-50">
        <NavLink to="/" className="flex items-center">
          <img
            src="https://i.postimg.cc/4N1Xqpyx/Capstone-Project-1-removebg-preview.png"
            alt="Logo"
            className="h-12 cursor-pointer"
          />
        </NavLink>
        <button
          className="md:hidden block bg-red-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row items-center md:gap-8 absolute md:relative top-16 md:top-auto left-0 w-full md:w-auto bg-red-50 md:bg-transparent shadow-md md:shadow-none`}
        >
          <NavLink
            to="/login"
            className="block py-2 px-4 text-xl hover:text-red-500"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </NavLink>
          <NavLink
            to="/Experience"
            className="block py-2 px-4 text-xl hover:text-red-500"
            onClick={() => setMenuOpen(false)}
          >
            Experiences
          </NavLink>
          <NavLink
            to="/about"
            className="block py-2 px-4 text-xl hover:text-red-500"
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
          <p
            className="block py-2 px-4 text-red-500 text-xl font-semibold cursor-pointer"
            onClick={() => {
              setMenuOpen(false);
              OnLogout();
            }}
          >
            LogOut
          </p>
        </div>
      </nav>
      <div className="bg-green-900 text-white fixed w-full left-0 text-center top-12 z-40">
        Create a spring in your life.
      </div>
    </div>
  );
}

export default Navbar;
