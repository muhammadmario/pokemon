import React from "react";
import { Link } from "react-router-dom";

function CardPokemon({ pokemon }) {
  return (
    <Link
      to={`pokemon/${pokemon.id}`}
      className="border-8 border-white bg-gradient-to-br from-slate-100 via-emerald-300 to-orange-200 max-w-fit flex flex-col justify-center items-center px-3 py-2 max-h-fit hover:scale-105 transition"
    >
      <img src={pokemon.sprites.front_default} alt="pokemon" className="h-52" />
      <div className="flex flex-col gap-2 justify-center items-center w-full">
        <h1 className="font-bold uppercase">{pokemon.name}</h1>
        <Link
          to={`pokemon/${pokemon.id}`}
          className="bg-blue-400  py-2 text-white w-full flex justify-center cursor-pointer hover:bg-blue-500  transition"
        >
          Detail
        </Link>
      </div>
    </Link>
  );
}

export default CardPokemon;
