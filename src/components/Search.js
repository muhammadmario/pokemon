import React from "react";

function Search({ searchPokemon, setSearchPokemon }) {
  return (
    <div className="bg-yellow-200 w-full flex justify-end pr-8 ">
      <input
        type="text"
        className="h-10 px-2 mt-2 w-1/3"
        placeholder="Search pokemon..."
        value={searchPokemon}
        onChange={(e) => setSearchPokemon(e.target.value)}
      />
    </div>
  );
}

export default Search;
