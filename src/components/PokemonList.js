import React, { useState, useEffect } from "react";
import CardPokemon from "./CardPokemon";
import axios from "axios";
import Pagination from "./Pagination";
import Search from "./Search";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [searchPokemon, setSearchPokemon] = useState();
  const [resultSearchPokemon, setResultSearchPokemon] = useState();
  const [loading, setLoading] = useState(false);

  const getPokemons = async () => {
    setLoading(true);
    const response = await axios.get(url);
    // console.log(response);
    getPokemon(response.data.results);
    setNextPage(response.data.next);
    setPrevPage(response.data.previous);
    setLoading(false);
  };

  const getPokemon = async (res) => {
    res.map(async (item) => {
      const response = await axios.get(item.url);
      // console.log(response.data);
      setPokemons((state) => {
        state = [...state, response.data];
        return state;
      });
    });
  };

  const handleSearchPokemon = async (e, searchPokemon) => {
    e.preventDefault();
    if (searchPokemon.length) {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${searchPokemon}`
        );
        console.log(response.data);
        setResultSearchPokemon(response.data);
      } catch (error) {
        toast.error("🦄Pokemon not found", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setLoading(false);
      }
    } else {
      console.log("jalan");
      setResultSearchPokemon("");
    }
  };

  useEffect(() => {
    setPokemons([]);
    getPokemons();
  }, [url]);

  return (
    <>
      <form
        className="bg-yellow-200 w-full flex justify-center md:justify-end md:pr-8 items-center mt-16"
        onSubmit={(e) => handleSearchPokemon(e, searchPokemon)}
      >
        <input
          type="text"
          className="h-10 px-2 mt-2 md:w-1/3"
          placeholder="Search pokemon..."
          value={searchPokemon}
          onChange={(e) => setSearchPokemon(e.target.value)}
        />
        <button
          className="bg-blue-400 h-10 px-3 mt-2 border-l-2 text-white hover:bg-blue-500 "
          type="submit"
        >
          Search
        </button>
      </form>

      {loading && (
        <div className="w-full bg-yellow-200 min-h-screen flex justify-center items-start">
          <ReactLoading
            type={"cylon"}
            color={"#000000"}
            height={667}
            width={375}
          />
        </div>
      )}

      {resultSearchPokemon && (
        <div className="w-full bg-yellow-200 min-h-screen flex justify-center items-start">
          <CardPokemon pokemon={resultSearchPokemon} />
        </div>
      )}

      {!resultSearchPokemon && pokemons && (
        <>
          <section className="bg-yellow-200 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5  justify-items-center gap-2 px-3 py-3 min-h-screen">
            {pokemons.map((pokemon) => (
              <CardPokemon pokemon={pokemon} />
            ))}
          </section>
          <Pagination prevPage={prevPage} nextPage={nextPage} setUrl={setUrl} />
        </>
      )}
      <ToastContainer />
    </>
  );
}

export default PokemonList;
