import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProgressBar from "@ramonak/react-progress-bar";
import ReactLoading from "react-loading";

function DetailPokemon() {
  const { pokemonId } = useParams();

  const [detailPokemon, setDetailPokemon] = useState();
  const [loading, setLoading] = useState(false);

  const getDetailPokemon = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      // console.log(response.data);
      setDetailPokemon(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetailPokemon();
  }, []);

  return (
    <>
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
      <div className="w-full bg-yellow-200 flex flex-col md:flex-row justify-center items-center min-h-screen">
        <div className="w-1/2 flex justify-center flex-col items-center order-2 md:order-1 md:gap-5">
          <h1 className="uppercase text-4xl font-bold">
            {detailPokemon && detailPokemon.name}
          </h1>
          <table>
            <tr>
              <th>Abilities:</th>
              {detailPokemon &&
                detailPokemon.abilities.map((ability) => (
                  <>
                    <td>{ability.ability.name}</td>
                    <br />
                  </>
                ))}
            </tr>
            <tr>
              <th>Height:</th>
              {detailPokemon && detailPokemon.height}
            </tr>
            <tr>
              <th>Species:</th>
              {detailPokemon && <td>{detailPokemon.species.name}</td>}
            </tr>
          </table>
          <div className="flex md:gap-10">
            <div>
              {detailPokemon &&
                detailPokemon.stats.map((stat) => (
                  <h2 className="font-bold text-xs md:text-base">
                    {stat.stat.name}
                  </h2>
                ))}
            </div>
            <div className="flex flex-col gap-1">
              {detailPokemon &&
                detailPokemon.stats.map((stat) => (
                  <ProgressBar
                    completed={`${stat.base_stat}`}
                    className="h-[18px] md:h-[21px] w-[200px]"
                    bgColor="#3b82f6"
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="w-1/2 order-1 md:order-2">
          <img
            // src={detailPokemon && detailPokemon.sprites.front_default}
            src={
              detailPokemon && detailPokemon.sprites.other.home.front_default
            }
            alt={detailPokemon && detailPokemon.name}
            className="w-full"
          />
        </div>
      </div>
    </>
  );
}

export default DetailPokemon;
