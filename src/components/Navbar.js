import React from "react";
import pokemonlogo from "../assets/img/pokemonlogo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="h-16 bg-blue-500 px-3 fixed top-0 w-full z-20">
      <Link to="/">
        <img src={pokemonlogo} alt="pokemon-logo" className="h-14" />
      </Link>
    </nav>
  );
}

export default Navbar;
